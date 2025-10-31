from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import Group
from .models import Product, Cart

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Basic user serializer for displaying user info."""
    class Meta:
        model = User
        fields = ["id", "username", "role"]


class RegisterSerializer(serializers.ModelSerializer):
    """Handles user registration and password validation."""
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ["username", "password", "role"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        role = validated_data.get("role", "farmer")

        user = User.objects.create_user(**validated_data, password=password)

        # Automatically assign user to their role group
        group, _ = Group.objects.get_or_create(name=role)
        user.groups.add(group)
        return user


class ProductSerializer(serializers.ModelSerializer):
    """Handles serialization for product objects."""
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ["id", "name", "price", "quantity", "owner", "image", "created_at"]

class CartSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'product', 'quantity', 'total_price']