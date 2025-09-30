
from django.apps import AppConfig
from django.db.models.signals import post_migrate
from django.contrib.auth.models import Group

class YourAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'eshamba'

    def ready(self):
        post_migrate.connect(create_default_groups, sender=self)

def create_default_groups(sender, **kwargs):
    for group_name in ["Farmer", "Vendor", "Admin"]:
        Group.objects.get_or_create(name=group_name)