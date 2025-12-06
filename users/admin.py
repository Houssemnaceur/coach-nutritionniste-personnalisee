from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    list_display = ('email', 'name', 'age', 'weight', 'goal', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'goal')
    search_fields = ('email', 'name')
    ordering = ('email',)

    fieldsets = BaseUserAdmin.fieldsets + (
        ('Informations Fit+', {
            'fields': ('name', 'age', 'gender', 'height', 'weight', 'goal', 'activity_level', 'calorie_goal', 'dark_mode', 'notifications')
        }),
    )

    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Informations Fit+', {
            'fields': ('name', 'age', 'gender', 'height', 'weight', 'goal', 'activity_level')
        }),
    )