from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import Group
from .models import Product, Cart

User = get_user_model()


# -------------------------------
# USER SERIALIZER (for display)
# -------------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "role"]


# -------------------------------
# REGISTER SERIALIZER
# -------------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )

    class Meta:
        model = User
        fields = ["username", "email", "password", "role"]

    def create(self, validated_data):
        # Extract password and role
        password = validated_data.pop("password")
        role = validated_data.pop("role", "farmer")  # default role

        # Create user instance
        user = User(**validated_data)
        user.set_password(password)
        user.role = role
        user.save()

        # Get OR create the role group correctly
        group, _ = Group.objects.get_or_create(name=role)
        user.groups.add(group)

        return user


# -------------------------------
# PRODUCT SERIALIZER
# -------------------------------
class ProductSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ["id", "name", "price", "quantity", "owner", "image", "created_at"]


# -------------------------------
# CART SERIALIZER
# -------------------------------
class CartSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ["id", "user", "product", "quantity", "total_price"]