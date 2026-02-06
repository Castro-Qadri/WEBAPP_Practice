from django.contrib import admin
from .models import Product, Contact, Newsletter

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "model_code",
        "category",
        "price_pkr",
        "is_featured",
        "is_active",
        "stock",
        "rating",
    )
    list_filter = ("category", "is_featured", "is_active", "created_at")
    search_fields = ("name", "model_code")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (
            "Basic Info",
            {"fields": ("name", "model_code", "category", "tagline")},
        ),
        (
            "Content",
            {"fields": ("description", "image_url", "image_local")},
        ),
        (
            "Pricing",
            {"fields": ("price_pkr", "price_usd")},
        ),
        (
            "Details",
            {"fields": ("specifications", "features")},
        ),
        (
            "Reviews",
            {"fields": ("rating", "review_count")},
        ),
        (
            "Status",
            {"fields": ("is_active", "is_featured", "stock")},
        ),
        (
            "Timestamps",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "created_at")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "subject")
    readonly_fields = ("created_at",)


@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ("email", "subscribed_at", "is_active")
    list_filter = ("is_active", "subscribed_at")
    search_fields = ("email",)
    readonly_fields = ("subscribed_at",)
