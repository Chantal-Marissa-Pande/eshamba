from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from django.contrib.auth import get_user_model, authenticate
from django.shortcuts import render
from django.http import HttpResponse

from .models import Product
from .serializers import UserSerializer, ProductSerializer, RegisterSerializer

User = get_user_model()

# List users
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Product CRUD
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# User Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)


# User login
class LoginView(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username,
                "email": user.email,
                "role": user.role,
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# Landing page function
def landing_page(request):
    return HttpResponse("<h1>Welcome to EShamba</h1>")
