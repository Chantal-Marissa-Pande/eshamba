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
    owner = serializers.SerializerMethodField(read_only = True)
    image_base64 = serializers.CharField(required = False, allow_blank = True, allow_null = True)

    class Meta:
        model = Product
        fields = ["id", "name", "price", "quantity", "owner", "image_base64", "created_at", "updated_at"]
        read_only_fields = ["owner", "created_at", "updated_at"]

    def create(self, validated_data):
        request = self.context.get("request")
        user = getattr(request, "user", None)
        if user and user.is_authenticated:
            validated_data["owner"] = user
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


# -------------------------------
# CART SERIALIZER
# -------------------------------
class CartSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ["id", "user", "product", "quantity", "total_price"]