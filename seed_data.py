import os
import django

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from core.models import Category, Product, Mart

def seed():
    print("Starting seeding...")
    
    # Create Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("Superuser created (admin/admin123)")
    else:
        print("Superuser already exists")

    # Create Marts
    if not Mart.objects.exists():
        Mart.objects.create(name="행복마트 (Happy Mart)", region="서울시 마포구", phone="02-123-4567")
        Mart.objects.create(name="우리동네 슈퍼", region="서울시 서대문구", phone="02-987-6543")
        print("Marts created")
    else:
        print("Marts already exist")

    # Create Products
    if not Category.objects.exists():
        c_veg = Category.objects.create(name="신선식품 (Fresh)")
        c_snack = Category.objects.create(name="과자/간식 (Snack)")
        c_drink = Category.objects.create(name="음료 (Drink)")
        
        Product.objects.create(category=c_veg, name="양파 1망", price=3000, description="햇양파")
        Product.objects.create(category=c_veg, name="대파 1단", price=2500, description="대파")
        Product.objects.create(category=c_veg, name="감자 1kg", price=4000, description="감자")
        
        Product.objects.create(category=c_snack, name="감자칩", price=1500, description="감자칩")
        Product.objects.create(category=c_snack, name="초코비", price=2000, description="초코비")
        
        Product.objects.create(category=c_drink, name="콜라 1.5L", price=2200, description="콜라")
        Product.objects.create(category=c_drink, name="생수 2L", price=1000, description="생수")
        
        print("Products & Categories created")
    else:
        print("Products already exist")

if __name__ == '__main__':
    seed()
