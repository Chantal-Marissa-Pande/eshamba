from rest_framework import serializers

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from .models import Product

User = get_user_model()

# Serializer for User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

# Serializer for Product model
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# Serializer for User Registration
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    password2 = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ["username", "password", "password2", "email", "role"]

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("Password fields didn't match.")
        return data

    def create(self, validated_data):
        validate_password.pop("password2")
        user = User.objects.create_user(**validated_data)
        return user