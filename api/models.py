from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
    Custom user model that supports 'farmer' and 'vendor' roles.
    """
    ROLE_CHOICES = [
        ('farmer', 'Farmer'),
        ('vendor', 'Vendor'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='farmer')

    def __str__(self):
        return f"{self.username} ({self.role})"


class Product(models.Model):
    """
    Represents a product created by a farmer.
    Vendors can view or purchase products.
    """
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='products'
    )

    def __str__(self):
        return f"{self.name} - {self.owner.username}"