# Django Import
from django.core import paginator
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework import status
# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated  
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.serializers import Serializer


# Local Import
# from api.products import products
from api.models import *
from api.serializers import CarSerializer



# Get all the products with query
@api_view(['GET'])
def getCars(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    cars = Car.objects.filter(Brand__icontains=query).order_by('-_id')
    page = request.query_params.get('page')
    if page is None or page.strip() == '':
        page = 1
    else:
        try:
            page = int(page)
        except ValueError:
            page = 1
    paginator = Paginator(cars, 8)
       
    try:
        cars = paginator.page(page)
    except PageNotAnInteger:
        cars = paginator.page(1)
    except EmptyPage:
        cars = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)

    serializer = CarSerializer(cars, many=True)
    return Response({'cars': serializer.data, 'page': page, 'pages': paginator.num_pages})


# Get single products
@api_view(['GET'])
def getCar(request, pk):
    car = Car.objects.get(_id=pk)
    serializer = CarSerializer(car, many=False)
    return Response(serializer.data)


class CarListView(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CarDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]