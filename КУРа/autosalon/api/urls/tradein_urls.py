from django.urls import path
from api.views import tradein_views as views

urlpatterns = [
    path('', views.getMyTradeIns, name='tradein-list'),
    path('<str:car_id>/', views.TradeInCreateView, name='tradein-create'),
    path('<str:tradein_id>/delete/', views.deleteTradeIn, name='delete_tradein'),
]
