from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product
from .serializers import UserSerializer, RegisterSerializer, ProductSerializer
from django.http import JsonResponse

User = get_user_model()


# 🌱 User Registration
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            print("❌ Registration error details:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "User registered successfully",
            "username": user.username,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "role": user.role
        }, status=status.HTTP_201_CREATED)


# 🔐 Login View (JWT)
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        from django.contrib.auth import authenticate

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username,
                "role": user.role
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# 👤 Admin-only User List
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


# 🛒 Product Create/List
class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'farmer':
            return Product.objects.filter(owner=user)
        elif user.role == 'vendor':
            return Product.objects.all()
        return Product.objects.none()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# ✏️ Product Detail (View/Update/Delete)
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]


# 🌍 Landing Page
def landing_page(request):
    return JsonResponse({"message": "Welcome to the E-Shamba API!"})