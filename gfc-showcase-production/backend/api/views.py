from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Contact, Newsletter
from .serializers import (
    ProductSerializer,
    ProductDetailSerializer,
    ContactSerializer,
    NewsletterSerializer,
)

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["category", "is_featured"]
    search_fields = ["name", "model_code", "description"]
    ordering_fields = ["price_pkr", "rating", "created_at"]
    ordering = ["-is_featured", "-created_at"]
    
    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductDetailSerializer
        return ProductSerializer
    
    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Get featured products only"""
        featured_products = self.get_queryset().filter(is_featured=True)[:6]
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"])
    def by_category(self, request):
        """Get products grouped by category"""
        categories = Product.CATEGORY_CHOICES
        result = {}
        for category_key, category_name in categories:
            products = Product.objects.filter(
                category=category_key, 
                is_active=True
            )[:3]
            if products.exists():
                result[category_key] = ProductSerializer(products, many=True).data
        return Response(result)
    
    @action(detail=False, methods=["get"])
    def categories(self, request):
        """Get all available categories"""
        categories = [
            {"id": k, "name": v} 
            for k, v in Product.CATEGORY_CHOICES
        ]
        return Response(categories)
    
    @action(detail=True, methods=["get"])
    def related(self, request, pk=None):
        """Get related products from same category"""
        product = self.get_object()
        related = Product.objects.filter(
            category=product.category,
            is_active=True
        ).exclude(id=product.id)[:4]
        serializer = self.get_serializer(related, many=True)
        return Response(serializer.data)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    http_method_names = ["post", "get"]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"detail": "Message sent successfully"},
            status=status.HTTP_201_CREATED
        )


class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.filter(is_active=True)
    serializer_class = NewsletterSerializer
    http_method_names = ["post"]
    
    def create(self, request, *args, **kwargs):
        email = request.data.get("email")
        if not email:
            return Response(
                {"error": "Email is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        newsletter, created = Newsletter.objects.get_or_create(email=email)
        if not created:
            return Response(
                {"detail": "Already subscribed"},
                status=status.HTTP_200_OK
            )
        
        return Response(
            {"detail": "Subscribed successfully"},
            status=status.HTTP_201_CREATED
        )
