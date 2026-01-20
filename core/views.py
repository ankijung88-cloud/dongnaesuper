from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, DetailView, View, TemplateView
from .models import Category, Product, Mart, Order, OrderItem
from django.http import JsonResponse
from django.conf import settings
import json

class MartListView(ListView):
    model = Mart
    template_name = 'core/mart_list.html'
    context_object_name = 'marts'

class SetMartView(View):
    def post(self, request):
        mart_id = request.POST.get('mart_id')
        request.session['mart_id'] = mart_id
        return redirect('core:store_home')

class StoreHomeView(TemplateView):
    template_name = 'core/store_home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        cart = self.request.session.get('cart', {})
        
        # Get selected mart from session
        mart_id = self.request.session.get('mart_id')
        if mart_id:
            try:
                context['mart'] = Mart.objects.get(id=mart_id)
            except Mart.DoesNotExist:
                context['mart'] = None
        else:
            context['mart'] = None
            
        categories = Category.objects.all().prefetch_related('products')
        context['categories'] = categories
        context['cart_count'] = sum(cart.values())
        context['cart_ids'] = list(cart.keys()) # For checking checkboxes
        return context

class CartActionView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            product_id = str(data.get('product_id'))
            action = data.get('action') # 'add', 'remove', 'toggle'
            qty = int(data.get('quantity', 1))
        except:
             # Fallback for form data if not JSON
            product_id = str(request.POST.get('product_id'))
            action = request.POST.get('action')
            qty = int(request.POST.get('quantity', 1))

        cart = request.session.get('cart', {})
        
        if action == 'add':
            current_qty = cart.get(product_id, 0)
            cart[product_id] = current_qty + qty
        elif action == 'toggle':
            if product_id in cart:
                del cart[product_id]
            else:
                cart[product_id] = 1
        elif action == 'remove':
            if product_id in cart:
                del cart[product_id]
        elif action == 'update':
             if qty > 0:
                 cart[product_id] = qty
             else:
                 if product_id in cart: del cart[product_id]
        
        request.session['cart'] = cart
        return JsonResponse({'status': 'ok', 'cart_count': sum(cart.values()), 'action': action, 'product_id': product_id})

class CartView(TemplateView):
    template_name = 'core/cart.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        cart = self.request.session.get('cart', {})
        mart_id = self.request.session.get('mart_id')
        
        if mart_id:
             context['mart'] = Mart.objects.filter(id=mart_id).first()

        # Convert keys to int for query, but keep str for mapping
        product_ids = [int(k) for k in cart.keys()]
        products = Product.objects.filter(id__in=product_ids)
        
        cart_items = []
        total = 0
        
        for p in products:
            qty = cart.get(str(p.id), 0)
            subtotal = p.price * qty
            total += subtotal
            cart_items.append({
                'product': p,
                'quantity': qty,
                'subtotal': subtotal
            })
            
        context['cart_items'] = cart_items
        context['total'] = total
        # PortOne Config for rendering in template (if needed here, or in checkout)
        context['portone_merchant_id'] = settings.PORTONE_MERCHANT_ID
        return context

class CheckoutView(TemplateView):
    template_name = 'core/checkout.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        # Re-calculate total
        cart = self.request.session.get('cart', {})
        product_ids = [int(k) for k in cart.keys()]
        products = Product.objects.filter(id__in=product_ids)
        total = 0
        for p in products:
            qty = cart.get(str(p.id), 0)
            total += p.price * qty
            
        context['total'] = total
        context['user'] = self.request.user
        context['portone_merchant_id'] = getattr(settings, 'PORTONE_MERCHANT_ID', '')
        
        # Mart info
        mart_id = self.request.session.get('mart_id')
        if mart_id:
             context['mart'] = Mart.objects.filter(id=mart_id).first()
             
        return context

class PaymentCompleteView(View):
    def post(self, request):
        data = json.loads(request.body)
        imp_uid = data.get('imp_uid')
        merchant_uid = data.get('merchant_uid')
        # In a real app, verify with PortOne API here using requests
        
        # Create Order
        cart = request.session.get('cart', {})
        product_ids = [int(k) for k in cart.keys()]
        products = Product.objects.filter(id__in=product_ids)
        
        mart_id = request.session.get('mart_id')
        mart = Mart.objects.get(id=mart_id) if mart_id else None
        
        # Calculate total again for security
        total = 0
        stock_map = {p.id: p for p in products}
        
        for pid_str, qty in cart.items():
            p = stock_map.get(int(pid_str))
            if p:
                total += p.price * qty

        if not request.user.is_authenticated:
            # Handle guest? For now assume logged in or create dummy
            # The prompt implies "User inputs API key", but user auth wasn't explicitly strictly detailed as 'Sign Up' flow. 
            # I'll Assume user is logged in or I assign to a generic user if None.
            # Ideally: require login. For MVP, I might default to first user or Fail.
            # I'll return error if not logged in.
            return JsonResponse({'status': 'fail', 'message': 'Login required'})

        order = Order.objects.create(
            user=request.user,
            mart=mart,
            status='PAID',
            total_amount=total,
            merchant_uid=merchant_uid,
            imp_uid=imp_uid
        )
        
        for pid_str, qty in cart.items():
            p = stock_map.get(int(pid_str))
            if p:
                OrderItem.objects.create(
                    order=order,
                    product=p,
                    quantity=qty,
                    price_at_time=p.price
                )
                
        # Clear cart
        request.session['cart'] = {}
        
        return JsonResponse({'status': 'success', 'order_id': order.id})

class OrderHistoryView(ListView):
    model = Order
    template_name = 'core/order_list.html'
    context_object_name = 'orders'
    ordering = ['-created_at']

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')
