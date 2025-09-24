from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def landing_page(request):
    return JsonResponse({"message": "Welcome to Eshamba API. Use /api/ for endpoints"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', landing_page, name="root"),
    path('api/', include('api.urls')), 
]
