from django.contrib import admin
from .models import Category, Product, Mart, Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'mart', 'total_amount', 'status', 'created_at']
    list_filter = ['status', 'created_at', 'mart']
    inlines = [OrderItemInline]

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'is_available']
    list_filter = ['category', 'is_available']
    search_fields = ['name']

@admin.register(Mart)
class MartAdmin(admin.ModelAdmin):
    list_display = ['name', 'region', 'phone']
    search_fields = ['name', 'region']

admin.site.register(Category)
