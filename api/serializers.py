from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import Group
from .models import Product, Cart

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "role"]

    def get_role(self, obj):
        role = getattr(obj, "role", "") or ""
        if role.lower() in ("administrator", "admin"):
            return "administrator"
        return role.lower()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ["username", "email", "password", "role"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        role = validated_data.pop("role", "farmer")

        user = User(**validated_data)
        user.set_password(password)
        user.role = role
        user.save()

        group, _ = Group.objects.get_or_create(name=role)
        user.groups.add(group)

        return user


class ProductSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField(read_only=True)
    image_base64 = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    description = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Product
        fields = ["id", "name", "price", "quantity", "description", "owner", "image_base64", "created_at", "updated_at"]
        read_only_fields = ["owner", "created_at", "updated_at"]

    def get_owner(self, obj):
        return obj.owner.username if obj.owner else None

    def create(self, validated_data):
        request = self.context.get("request", None)
        user = getattr(request, "user", None)
        if user and user.is_authenticated and "owner" not in validated_data:
            validated_data["owner"] = user
        return super().create(validated_data)


class CartSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.id")
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "user", "product", "quantity", "total_price"]
        read_only_fields = ["user", "total_price"]

    def get_total_price(self, obj):
        try:
            return obj.product.price * obj.quantity
        except Exception:
            return 0