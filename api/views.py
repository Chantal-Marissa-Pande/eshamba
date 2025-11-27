from django.http import JsonResponse
from django.contrib.auth import authenticate, get_user_model
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import JSONParser

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Product, Cart
from .serializers import LoginSerializer, UserSerializer, RegisterSerializer, ProductSerializer, CartSerializer

User = get_user_model()


def normalize_role(role_value):
    if not role_value:
        return ""
    if role_value.lower() in ("administrator", "admin"):
        return "administrator"
    return role_value.lower()


# -----------------------------
# Authentication
# -----------------------------
@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = serializer.save()
        except Exception:
            return Response({"error": "User with those details already exists."}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "User registered successfully",
            "user": {
                "username": user.username,
                "email": user.email,
                "role": normalize_role(user.role),
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if not email or not password:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

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
            "role": normalize_role(user.role),
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })


# -----------------------------
# User Lists
# -----------------------------
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class FarmerListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(role__iexact="farmer").order_by("username")


class VendorListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(role__iexact="vendor").order_by("username")


# -----------------------------
# Products
# -----------------------------
class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    parser_classes = [JSONParser]  # Accept JSON POST
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        role = normalize_role(getattr(user, "role", "")) if user.is_authenticated else ""

        if role == "administrator":
            return Product.objects.all().order_by('-created_at')
        elif role == "farmer":
            return Product.objects.filter(owner=user).order_by('-created_at')
        # public / vendor
        return Product.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


# -----------------------------
# Cart
# -----------------------------
class CartListCreateView(generics.ListCreateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user = self.request.user)


# -----------------------------
# Landing Page
# -----------------------------
def landing_page(request):
    return JsonResponse({"message": "Welcome to the E-Shamba API!"})