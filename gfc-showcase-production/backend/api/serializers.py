from rest_framework import serializers
from .models import Product, Contact, Newsletter

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "model_code",
            "category",
            "tagline",
            "description",
            "image_url",
            "price_pkr",
            "price_usd",
            "specifications",
            "features",
            "rating",
            "review_count",
            "is_featured",
            "stock",
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "subject",
            "message",
            "product",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ["email", "subscribed_at"]
        read_only_fields = ["subscribed_at"]
