from django.contrib import admin
from .models import MealPlan, WorkoutSession

@admin.register(MealPlan)
class MealPlanAdmin(admin.ModelAdmin):
    list_display = ('user', 'updated_at')
    search_fields = ('user__email',)
    readonly_fields = ('updated_at',)

@admin.register(WorkoutSession)
class WorkoutSessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'workout_title', 'duration')
    list_filter = ('date', 'workout_title')
    search_fields = ('user__email', 'workout_title')