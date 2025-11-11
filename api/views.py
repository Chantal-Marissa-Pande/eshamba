from django.http import JsonResponse
from django.contrib.auth import authenticate, get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Product, Cart
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    ProductSerializer,
    CartSerializer
)

User = get_user_model()


# -----------------------------
# User Registration
# -----------------------------
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            print("❌ Registration error details:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "User registered successfully",
            "user":{
                "username": user.username,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "role": user.role,
                "email": user.email
            }
        }, status=status.HTTP_201_CREATED)


# -----------------------------
# Login (JWT)
# -----------------------------
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, password=password, email=email)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username,
                "role": user.role,
                "email": user.email
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# -----------------------------
# User List (open for now)
# -----------------------------
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# -----------------------------
# Product Create/List
# -----------------------------
class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_permissions(self):
        # Allow anyone to view, but only authenticated users to add
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        # If unauthenticated → show all products
        if not user.is_authenticated:
            return Product.objects.all()

        if user.role == 'farmer':
            return Product.objects.filter(owner=user)
        elif user.role == 'vendor':
            return Product.objects.all()
        return Product.objects.none()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# -----------------------------
# Product Detail
# -----------------------------
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


# -----------------------------
# Cart Views
# -----------------------------
class CartListCreateView(generics.ListCreateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# -----------------------------
# Landing Page
# -----------------------------
def landing_page(request):
    return JsonResponse({"message": "Welcome to the E-Shamba API!"})