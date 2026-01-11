from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import MealPlan, WorkoutSession

class MealPlanView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        plan, _ = MealPlan.objects.get_or_create(user=request.user)
        return Response({
            "breakfast": plan.breakfast,
            "lunch": plan.lunch,
            "dinner": plan.dinner,
            "snacks": plan.snacks,
        })

    def post(self, request):
        plan, _ = MealPlan.objects.get_or_create(user=request.user)
        plan.breakfast = request.data.get("breakfast", plan.breakfast)
        plan.lunch = request.data.get("lunch", plan.lunch)
        plan.dinner = request.data.get("dinner", plan.dinner)
        plan.snacks = request.data.get("snacks", plan.snacks)
        plan.save()
        return Response({"status": "ok"})

class WorkoutSessionView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        WorkoutSession.objects.create(
            user=request.user,
            date=request.data['date'],
            workout_title=request.data.get('workout_title', 'Workout'),
            duration=request.data['duration']
        )
        return Response({"status": "logged"})