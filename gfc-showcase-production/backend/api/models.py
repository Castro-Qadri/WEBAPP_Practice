from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Product(models.Model):
    CATEGORY_CHOICES = [
        ("ceiling_fan", "Ceiling Fan"),
        ("pedestal_fan", "Pedestal Fan"),
        ("bracket_fan", "Bracket Fan"),
        ("exhaust_fan", "Exhaust Fan"),
        ("air_cooler", "Air Cooler"),
        ("washing_machine", "Washing Machine"),
        ("dryer", "Dryer"),
        ("air_purifier", "Air Purifier"),
        ("geyser", "Geyser"),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    model_code = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    tagline = models.CharField(max_length=200)
    description = models.TextField()
    image_url = models.URLField()
    image_local = models.ImageField(upload_to="products/", null=True, blank=True)
    price_pkr = models.DecimalField(max_digits=10, decimal_places=2)
    price_usd = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Specifications JSON
    specifications = models.JSONField(default=dict)
    features = models.JSONField(default=list)
    
    # Rating & Reviews
    rating = models.FloatField(
        default=0, 
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    review_count = models.IntegerField(default=0)
    
    # Status
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    stock = models.IntegerField(default=0)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ["-is_featured", "-created_at"]
        indexes = [
            models.Index(fields=["category"]),
            models.Index(fields=["is_active"]),
            models.Index(fields=["is_featured"]),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.model_code})"


class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    product = models.ForeignKey(
        Product, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["-created_at"]
    
    def __str__(self):
        return f"{self.name} - {self.subject}"


class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.email
