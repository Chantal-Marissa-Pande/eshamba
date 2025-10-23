from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import Group

from .models import Product

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "role"]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
   
    class Meta:
        model = User
        fields = ["username", "password", "role"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        role = validated_data.get("role", "farmer")

        # Create user
        user = User.objects.create_user(
            **validated_data,
            password=password
        )

        # Assign role to group (optional)
        group, _ = Group.objects.get_or_create(name=role)
        user.groups.add(group)

        return user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"