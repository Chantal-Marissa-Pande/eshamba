from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static

def landing_page(request):
    return JsonResponse({"message": "Welcome to Eshamba API. Use /api/ for endpoints"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', landing_page, name="root"),
    path('api/', include('api.urls')),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)