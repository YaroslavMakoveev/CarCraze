from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status

# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import Serializer

# Rest Framework JWT
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Local Import
from ..models import *
from ..serializers import UserSerializer, UserSerializerWithToken, UserCarSerializer
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
# Create your views here.

# JWT Views
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['message'] = "Hello Autosalon"
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# SHOP API
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/cars/',
        '/api/cars/<id>',
        '/api/users',
        '/api/users/register',
        '/api/users/login',
        '/api/users/profile',
    ]
    return Response(routes)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['name'],
            email=data['email'],
            password=make_password(data['password']),
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except:
        message = {"detail": "User with this email is already registered"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.first_name = data['name']
    user.username = data['name']
    user.email = data['email']
    if data['password'] != "":
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response("User was deleted")


from ..serializers import UserCarSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserCars(request):
    user = request.user
    cars = user.usercar_set.all()
    serializer = UserCarSerializer(cars, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createUserCar(request):
    user = request.user
    data = request.data
    car = UserCar.objects.create(
        user=user,
        brand=data['brand'],
        model=data['model'],
        year=data['year'],
        mileage=data['mileage'],
        image=data['image']
    )
    serializer = UserCarSerializer(car, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserCar(request, pk):
    user = request.user
    car = UserCar.objects.get(_id=pk)
    if car.user != user:
        return Response({'detail': 'You are not authorized to update this car'}, status=status.HTTP_401_UNAUTHORIZED)
    data = request.data
    car.brand = data['brand']
    car.model = data['model']
    car.year = data['year']
    car.mileage = data['mileage']
    car.image = data['image']
    car.save()
    serializer = UserCarSerializer(car, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUserCar(request, pk):
    user = request.user
    car = UserCar.objects.get(_id=pk)
    if car.user != user:
        return Response({'detail': 'You are not authorized to delete this car'}, status=status.HTTP_401_UNAUTHORIZED)
    car.delete()
    return Response({'detail': 'Car deleted successfully'})

# изображение
from django.shortcuts import render, redirect
from ..forms import UserCarForm

def upload_car(request):
    if request.method == 'POST':
        form = UserCarForm(request.POST, request.FILES)
        if form.is_valid():
            user_car = form.save(commit=False)
            user_car.user = request.user  # Присваиваем текущего пользователя
            user_car.save()
            return redirect('profile')  # Перенаправляем пользователя на профиль после успешной загрузки
    else:
        form = UserCarForm()
    return render(request, 'upload_car.html', {'form': form})