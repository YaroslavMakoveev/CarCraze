from django.contrib import admin
from .models import UserCar, TradeIn, TestDrive, Car, Order, OrderItem

admin.site.register(UserCar)

admin.site.register(TradeIn)

admin.site.register(TestDrive)

admin.site.register(Car)

admin.site.register(Order)

admin.site.register(OrderItem)
