from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

# Nos vues API
import users.views as users_views
import core.views as core_views

urlpatterns = [
    # Admin Django (IMPORTANT !)
    path('admin/', admin.site.urls),

    # Auth
    path('api/auth/register/', users_views.RegisterView.as_view(), name='register'),
    path('api/auth/login/', users_views.LoginView.as_view(), name='login'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/logout/', users_views.LogoutView.as_view(), name='logout'),

    # Profil et données
    path('api/profile/', users_views.ProfileView.as_view(), name='profile'),
    path('api/meal-plan/', core_views.MealPlanView.as_view(), name='meal-plan'),
    path('api/workout-session/', core_views.WorkoutSessionView.as_view(), name='workout-session'),
]