# Django Import
from django.core.exceptions import RequestDataTooBig
from django.shortcuts import render
from datetime import datetime

from rest_framework import status

# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.serializers import Serializer


# Local Import
# from base.products import products
from api.models import *
from api.serializers import CarSerializer, OrderSerializer
from django.core.mail import send_mail


# def send_order_confirmation_email(email, username):
#     subject = 'Подтверждение заказа'
#     message = f'{username}, ваш заказ успешно размещен! Наши менеджеры скоро свяжутся с вами для уточнения деталей. С уважением, команда CarCreze'
#     from_email = 'carcraze282@gmail.com'
#     recipient_list = [email]
#     send_mail(subject, message, from_email, recipient_list)

# views start from here

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    print(data)
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items', "status": status.HTTP_400_BAD_REQUEST})
    else:
        # (1) Create Order
        order = Order.objects.create(
            user=user,
            totalPrice=data['totalPrice'],
        )

        # (3) Create order items

        for i in orderItems:
            car = Car.objects.get(_id=i['_id'])

            item = OrderItem.objects.create(
                car=car,
                order=order,
                name=car.Brand + ' ' + car.Model,
                qty=i['qty'],
                price=i['Price'],
                image=car.image.url,
            )

            # (4) Update Stock

            car.save()
        # send_order_confirmation_email(user.email, user.username)
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not Authorized  to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)