from django.db import models
from django.conf import settings

class MealPlan(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    breakfast = models.JSONField(default=list)
    lunch = models.JSONField(default=list)
    dinner = models.JSONField(default=list)
    snacks = models.JSONField(default=list)
    updated_at = models.DateTimeField(auto_now=True)  # AJOUTÉ ICI

    def __str__(self):
        return f"Repas de {self.user.email}"

class WorkoutSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    workout_title = models.CharField(max_length=200)
    duration = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)