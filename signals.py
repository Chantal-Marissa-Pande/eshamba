from django.contrib.auth.models import Group
from django.db.models.signals import post_migrate
from django.dispatch import receiver

@receiver(post_migrate)
def create_user_groups(sender, **kwargs):
    groups = ["Farmers", "Vendors", "Admin"]
    for group in groups:
        Group.objects.get_or_create(name=group)
