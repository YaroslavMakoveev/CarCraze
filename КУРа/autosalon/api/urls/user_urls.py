from django.urls import path
from api.views import user_views as views

from ..views.user_views import upload_car


urlpatterns = [
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name="user_profile"),
    path('profile/update/', views.updateUserProfile, name="user_profile_update"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('delete/<str:pk>/', views.deleteUser, name="deleteUser"),
    path('cars/', views.getUserCars, name='user_cars'),
    path('cars/create/', views.createUserCar, name='create_user_car'),
    path('cars/<int:pk>/update/', views.updateUserCar, name='update_user_car'),
    path('cars/<int:pk>/delete/', views.deleteUserCar, name='delete_user_car'),
#image
    path('upload_car/', upload_car, name='upload_car'),
]


