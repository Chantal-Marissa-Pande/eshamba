from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserListView,
    ProductListCreateView,
    ProductDetailView,
    FarmerListView,
    VendorListView,
    RegisterView,
    LoginView,
    CartListCreateView,
    CartDetailView,
    landing_page
)

urlpatterns = [
    path('', landing_page, name='landing'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('users/', UserListView.as_view(), name='user_list'),
    path('products/', ProductListCreateView.as_view(), name='product_list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product_detail'),

    path('farmers/', FarmerListView.as_view(), name='farmer_list'),
    path('vendors/', VendorListView.as_view(), name='vendor_list'),

    path('cart/', CartListCreateView.as_view(), name='cart'),
    path('cart/<int:pk>/', CartDetailView.as_view(), name = 'cart_detail'),
]