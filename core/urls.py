from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.MartListView.as_view(), name='mart_list'),
    path('set-mart/', views.SetMartView.as_view(), name='set_mart'),
    path('store/', views.StoreHomeView.as_view(), name='store_home'),
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/action/', views.CartActionView.as_view(), name='cart_action'),
    path('checkout/', views.CheckoutView.as_view(), name='checkout'),
    path('payment/complete/', views.PaymentCompleteView.as_view(), name='payment_complete'),
    path('orders/', views.OrderHistoryView.as_view(), name='order_list'),
]
