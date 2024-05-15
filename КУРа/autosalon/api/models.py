from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models.fields import BLANK_CHOICE_DASH


class UserCar(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    brand = models.CharField(max_length=50, null=True, blank=True)
    model = models.CharField(max_length=50, null=True, blank=True)
    year = models.IntegerField(null=True, blank=True)
    mileage = models.IntegerField(null=True, blank=True, default=0)
    image = models.ImageField(null=True, blank=True, default="/images/placeholder.png", upload_to="images/")

    def __str__(self):
        return f"{self.brand} | {self.model} | {self.year} | {self.user}"


class Car(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    Brand = models.CharField(max_length=50, null=True, blank=True)
    Model = models.CharField(max_length=50, null=True, blank=True)
    Year = models.IntegerField(null=True, blank=True)
    Price = models.IntegerField(null=True, blank=True, default=0)
    Description = models.CharField(max_length=400)
    image = models.ImageField(null=True, blank=True, default="/images/placeholder.png",upload_to="images/")
    Trade_in = models.BooleanField(default=False)

    def __str__(self):
        return self.Brand + "  " + self.Model + "  " + str(self.Year)


class TestDrive(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=True)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)

    def __str__(self):
        return f"{self.car} | {self.date}"

class TradeIn(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    userCar = models.ForeignKey(UserCar, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self._id} | {self.user} | {self.car}"


class Order(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    # TradeIn = models.ForeignKey(TradeIn, on_delete=models.CASCADE)
    DateTime = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    totalPrice = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return str(self._id)


class OrderItem(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.IntegerField(null=True, blank=True, default=0)
    image = models.CharField(max_length=200, null=True,blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)
