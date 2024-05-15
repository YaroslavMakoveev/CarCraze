from django.db.models import fields
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)



class UserCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCar
        fields = ['_id', 'brand', 'model', 'year', 'mileage', 'image']



class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class TestDriveSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestDrive
        fields = '__all__'


class TradeInSerializer(serializers.ModelSerializer):
    class Meta:
        model = TradeIn
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    User = serializers.SerializerMethodField(read_only=True)
    dateTime = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self,obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items,many=True)
        return serializer.data

    def get_User(self,obj):
        items = obj.user
        serializer = UserSerializer(items,many=False)
        return serializer.data

    def get__id(self, obj):
        return obj._id

    def get_dateTime(self, obj):
        return obj.DateTime

class OrderItemSerializer(serializers.ModelSerializer):

        class Meta:
            model = OrderItem
            fields = '__all__'
