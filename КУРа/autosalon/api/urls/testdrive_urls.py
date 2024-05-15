from django.urls import path
from api.views import testdrive_views as views

urlpatterns = [
    path('', views.getMyTestDrives, name='testdrive-list'),
    path('<str:car_id>/', views.TestDriveCreateView.as_view(), name='testdrive-create'),
    path('<str:testdrive_id>/delete/', views.deleteTestDrive, name='delete_testdrive'),
]
