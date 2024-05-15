# forms.py
from django import forms
from .models import UserCar

class UserCarForm(forms.ModelForm):
    class Meta:
        model = UserCar
        fields = ['brand', 'model', 'year', 'mileage', 'image']
