from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ContactViewSet, NewsletterViewSet

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
router.register(r"contact", ContactViewSet, basename="contact")
router.register(r"newsletter", NewsletterViewSet, basename="newsletter")

urlpatterns = [
    path("", include(router.urls)),
]
