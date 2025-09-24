from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Models

class CustomerUser(AbstractUser):
    ROLE_CHOICES = [
        ('farmer', 'Farmer'),
        ('vendor', 'Vendor'),
    ]
    role = models.CharField(max_length=10, choices = ROLE_CHOICES, default='farmer')
    
    def _str_(self):
        return self.username
    
class Product(models.Model):
    name = models.CharField(max_length = 200)
    description = models.TextField(blank = True, null = True)
    price = models.DecimalField(max_digits = 10, decimal_places = 2)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE,
        related_name = "products"
    )

    def __str__(self):
        return self.name
    