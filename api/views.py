from django.http import JsonResponse
from django.contrib.auth import authenticate, get_user_model

from rest_framework import generics, status
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


# ------------------------------------
# USER REGISTRATION (Public)
# ------------------------------------
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = serializer.save()
        except Exception as e:
            # Covers duplicate username/email and other DB errors
            return Response(
                {"error": "User with those details already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "User registered successfully",
            "user": {
                "username": user.username,
                "email": user.email,
                "role": user.role,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


# ------------------------------------
# LOGIN (JWT) via EMAIL (Public)
# ------------------------------------
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if user exists by email
        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=401)

        # Use username for Django authenticate()
        user = authenticate(request, username=user_obj.username, password=password)

        if user is None:
            return Response({"error": "Invalid credentials"}, status=401)

        refresh = RefreshToken.for_user(user)

        return Response({
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })


# ------------------------------------
# PUBLIC USER LIST (for testing)
# ------------------------------------
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# ------------------------------------
# PRODUCT CREATE / LIST
# Farmers → see their own
# Vendors → see all
# Guests → see all
# ------------------------------------
class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            return Product.objects.all()

        if user.role == "farmer":
            return Product.objects.filter(owner=user)

        if user.role == "vendor":
            return Product.objects.all()

        return Product.objects.none()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# ------------------------------------
# PRODUCT DETAIL (Auth required)
# ------------------------------------
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


# ------------------------------------
# CART (Auth required)
# ------------------------------------
class CartListCreateView(generics.ListCreateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ------------------------------------
# LANDING PAGE
# ------------------------------------
def landing_page(request):
    return JsonResponse({"message": "Welcome to the E-Shamba API!"})