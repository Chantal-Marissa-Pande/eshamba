from django.http import JsonResponse
from django.contrib.auth import authenticate, get_user_model
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

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


# -----------------------------
# USER REGISTRATION (Public)
# -----------------------------
@method_decorator(csrf_exempt, name='dispatch')
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


# -----------------------------
# LOGIN (JWT) via EMAIL (Public)
# -----------------------------
@method_decorator(csrf_exempt, name='dispatch')
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

        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=401)

        user = authenticate(request, username=user_obj.email, password=password)
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


# -----------------------------
# PUBLIC USER LIST
# -----------------------------
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# -----------------------------
# FARMERS / VENDORS LIST (ADMIN)
# -----------------------------
class FarmerListView(generics.ListAPIView):
    queryset = User.objects.filter(role='farmer')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
class VendorListView(generics.ListAPIView):
    queryset = User.objects.filter(role='vendor')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

# -----------------------------
# PRODUCT CREATE / LIST
# -----------------------------
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


# -----------------------------
# PRODUCT DETAIL
# -----------------------------
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


# -----------------------------
# CART
# -----------------------------
class CartListCreateView(generics.ListCreateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# -----------------------------
# LANDING PAGE
# -----------------------------
def landing_page(request):
    return JsonResponse({"message": "Welcome to the E-Shamba API!"})