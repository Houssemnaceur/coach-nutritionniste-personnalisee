from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    
    # Ces champs sont ceux que ton React envoie
    name = models.CharField(max_length=100, blank=True, default='')
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, blank=True)
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    goal = models.CharField(max_length=20, blank=True)
    activity_level = models.CharField(max_length=20, blank=True)
    dark_mode = models.BooleanField(default=False)
    notifications = models.BooleanField(default=True)
    calorie_goal = models.IntegerField(default=2000)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # plus besoin de username

    def __str__(self):
        return self.email