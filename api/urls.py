from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserListView,
    ProductListCreateView,
    ProductDetailView,
    RegisterView,
    LoginView,
    landing_page
)

urlpatterns = [
    # Authentication
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Users & Products
    path('users/', UserListView.as_view(), name='user_list'),
    path('products/', ProductListCreateView.as_view(), name='product_list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product_detail'),

    # Landing
    path('', landing_page, name='landing'),
]