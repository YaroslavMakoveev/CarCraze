from django.urls import path
from api.views import car_views as views


urlpatterns = [
    path('',views.getCars,name="cars"),
    path('<str:pk>/',views.getCar,name="car"),
]