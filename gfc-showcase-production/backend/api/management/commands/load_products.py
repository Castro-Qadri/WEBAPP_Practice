from django.core.management.base import BaseCommand
from api.models import Product

class Command(BaseCommand):
    help = "Load GFC products from gfcfans.com"

    def handle(self, *args, **options):
        products_data = [
            # Ceiling Fans
            {
                "name": "Future",
                "model_code": "GFC-FUTURE",
                "category": "ceiling_fan",
                "tagline": "Modern Design with Premium Finish",
                "description": "Advanced ceiling fan with modern design and silent operation. Perfect for contemporary living spaces.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/future.jpg",
                "price_pkr": 15880,
                "price_usd": 57,
                "features": ["High Air Throw", "Silent Operation", "Durable Motor", "Modern Design"],
                "specifications": {
                    "RPM": "1400",
                    "Power": "65W",
                    "Diameter": "48 inches",
                    "Warranty": "3 Years",
                    "Material": "Aluminum"
                },
                "is_featured": True,
                "stock": 50
            },
            {
                "name": "Spring",
                "model_code": "GFC-SPRING",
                "category": "ceiling_fan",
                "tagline": "Classic Design with Powerful Performance",
                "description": "Traditional ceiling fan combining classic aesthetics with modern technology and energy efficiency.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/SPRING_3.jpg",
                "price_pkr": 15400,
                "price_usd": 55,
                "features": ["Energy Efficient", "Quiet Motor", "Classic Design", "Easy Installation"],
                "specifications": {
                    "RPM": "1380",
                    "Power": "60W",
                    "Diameter": "48 inches",
                    "Warranty": "2 Years",
                    "Material": "Steel"
                },
                "is_featured": True,
                "stock": 45
            },
            {
                "name": "Apex",
                "model_code": "GFC-APEX",
                "category": "ceiling_fan",
                "tagline": "Premium Quality Ceiling Fan",
                "description": "Superior ceiling fan with enhanced air circulation and noise reduction technology for maximum comfort.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/5_20250812_112018_0000-ezgif.com-webp-to-jpg-converter.jpg",
                "price_pkr": 10460,
                "price_usd": 38,
                "features": ["Premium Construction", "Noise Reduction", "Efficient Cooling", "Durable Finish"],
                "specifications": {
                    "RPM": "1420",
                    "Power": "70W",
                    "Diameter": "48 inches",
                    "Warranty": "1 Year",
                    "Material": "Aluminum Alloy"
                },
                "is_featured": True,
                "stock": 60
            },
            {
                "name": "Aeromax",
                "model_code": "GFC-AEROMAX",
                "category": "ceiling_fan",
                "tagline": "Maximum Air Throw Performance",
                "description": "High-performance ceiling fan engineered for maximum air throw and efficiency in large spaces.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/ezgif-13eaf7ff57e59d.jpg",
                "price_pkr": 10460,
                "price_usd": 38,
                "features": ["Max Air Throw", "Energy Star Certified", "Low Vibration", "Turbo Speed"],
                "specifications": {
                    "RPM": "1450",
                    "Power": "75W",
                    "Diameter": "48 inches",
                    "Warranty": "1 Year",
                    "Material": "Aluminum"
                },
                "is_featured": True,
                "stock": 55
            },
            {
                "name": "Brave",
                "model_code": "GFC-BRAVE",
                "category": "ceiling_fan",
                "tagline": "Inverter Technology Ceiling Fan",
                "description": "Inverter-based ceiling fan with variable speed control and energy-saving technology.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/brave1.jpg",
                "price_pkr": 14400,
                "price_usd": 52,
                "features": ["Inverter Technology", "Variable Speed", "Energy Saving", "Smart Control"],
                "specifications": {
                    "RPM": "1400",
                    "Power": "55W",
                    "Diameter": "48 inches",
                    "Warranty": "2 Years",
                    "Material": "Aluminum"
                },
                "is_featured": False,
                "stock": 35
            },
            
            # Pedestal/Bracket Fans
            {
                "name": "Designer With Cross Base",
                "model_code": "GFC-DESIGNER-CROSS",
                "category": "pedestal_fan",
                "tagline": "Elegant Pedestal Fan with Cross Base",
                "description": "Premium pedestal fan with decorative cross base design. Perfect for living rooms and bedrooms.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/pedestaldesignercross.jpg",
                "price_pkr": 11915,
                "price_usd": 43,
                "features": ["Decorative Design", "Stable Base", "Adjustable Height", "Powerful Motor"],
                "specifications": {
                    "RPM": "1380",
                    "Power": "60W",
                    "Diameter": "48 inches",
                    "Height": "Adjustable",
                    "Warranty": "1 Year"
                },
                "is_featured": False,
                "stock": 30
            },
            {
                "name": "Deluxe Bracket Fan",
                "model_code": "GFC-DELUXE-BRACKET",
                "category": "bracket_fan",
                "tagline": "Wall-Mounted Bracket Fan",
                "description": "Space-saving bracket fan perfect for offices and shops. Sturdy wall mount with smooth operation.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/deluxe_cf3c09ec-2004-4f7c-aaa9-ffb85b3bfd93.jpg",
                "price_pkr": 7850,
                "price_usd": 28,
                "features": ["Wall-Mounted", "Space Saving", "Durable Mount", "Efficient Cooling"],
                "specifications": {
                    "RPM": "1400",
                    "Power": "50W",
                    "Diameter": "48 inches",
                    "Mount Type": "Wall Bracket",
                    "Warranty": "1 Year"
                },
                "is_featured": False,
                "stock": 40
            },
            
            # Exhaust/Louver Fans
            {
                "name": "Louver TCP",
                "model_code": "GFC-LOUVER-TCP",
                "category": "exhaust_fan",
                "tagline": "Industrial Exhaust Fan",
                "description": "Heavy-duty exhaust fan with louver design for commercial and industrial use. Strong air extraction.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/louverTCP.jpg",
                "price_pkr": 8285,
                "price_usd": 30,
                "features": ["Industrial Grade", "Louver Design", "High CFM", "Metal Construction"],
                "specifications": {
                    "RPM": "1450",
                    "Power": "80W",
                    "Diameter": "48 inches",
                    "Air Flow": "5000 CFM",
                    "Warranty": "1 Year"
                },
                "is_featured": False,
                "stock": 25
            },
            {
                "name": "Plastic Exhaust",
                "model_code": "GFC-PLASTIC-EXHAUST",
                "category": "exhaust_fan",
                "tagline": "Lightweight Plastic Exhaust Fan",
                "description": "Lightweight yet durable plastic exhaust fan for bathrooms and kitchens. Affordable and efficient.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/ExhaustFans-01_d283c68a-bdac-4242-89cd-5883513aace0.jpg",
                "price_pkr": 4690,
                "price_usd": 17,
                "features": ["Lightweight", "Durable Plastic", "Quiet Operation", "Easy Installation"],
                "specifications": {
                    "RPM": "1400",
                    "Power": "40W",
                    "Diameter": "25 inches",
                    "Air Flow": "2000 CFM",
                    "Warranty": "6 Months"
                },
                "is_featured": False,
                "stock": 80
            },

            # Air Coolers
            {
                "name": "GF-7800 Turbo Cool - AC",
                "model_code": "GFC-7800-AC",
                "category": "air_cooler",
                "tagline": "Turbo Cooling Performance",
                "description": "High-capacity air cooler built for powerful airflow and fast room cooling with durable body and efficient motor.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/7800cooler_b20acda9-459b-4758-b966-27ea5e575a5f.jpg?v=1767702443",
                "price_pkr": 32900,
                "price_usd": 118,
                "features": ["Turbo Air Throw", "High Capacity", "Durable Body", "Efficient Cooling"],
                "specifications": {
                    "Power": "200W",
                    "Type": "AC",
                    "Capacity": "Large Room",
                    "Warranty": "1 Year",
                    "Body": "Heavy Duty Plastic"
                },
                "is_featured": True,
                "stock": 18
            },
            {
                "name": "GF-6700 Supreme AC",
                "model_code": "GFC-6700-AC",
                "category": "air_cooler",
                "tagline": "Supreme Cooling for Large Spaces",
                "description": "Supreme series air cooler with strong airflow, long runtime, and efficient cooling pads.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/gf6700_6e7a86c7-90c6-4e97-acfa-a3a9c1186be0.jpg?v=1744795354",
                "price_pkr": 29500,
                "price_usd": 105,
                "features": ["Strong Airflow", "Honeycomb Pads", "Low Noise", "Energy Efficient"],
                "specifications": {
                    "Power": "180W",
                    "Type": "AC",
                    "Capacity": "Large Room",
                    "Warranty": "1 Year",
                    "Body": "Reinforced Plastic"
                },
                "is_featured": False,
                "stock": 22
            },
            {
                "name": "GF-6600 Deluxe Plus AC",
                "model_code": "GFC-6600-PLUS-AC",
                "category": "air_cooler",
                "tagline": "Deluxe Comfort Cooling",
                "description": "Deluxe Plus air cooler designed for steady airflow, efficient cooling, and reliable performance.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/gf6600_de394b09-5fdc-4a3e-bba1-bb7815c06c40.jpg?v=1745391118",
                "price_pkr": 28800,
                "price_usd": 103,
                "features": ["Steady Airflow", "Cooling Pads", "Low Maintenance", "Durable Build"],
                "specifications": {
                    "Power": "170W",
                    "Type": "AC",
                    "Capacity": "Medium-Large Room",
                    "Warranty": "1 Year",
                    "Body": "ABS Plastic"
                },
                "is_featured": False,
                "stock": 20
            },
            
            # Washing Machines
            {
                "name": "GF-6600 Deluxe AC-DC",
                "model_code": "GFC-6600",
                "category": "washing_machine",
                "tagline": "Premium Dual-Power Washing Machine",
                "description": "Advanced AC-DC washing machine with auto wash cycles and energy-saving technology.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/gf6600.jpg",
                "price_pkr": 25700,
                "price_usd": 92,
                "features": ["AC-DC Operation", "Auto Cycles", "Energy Efficient", "Stainless Steel Tub"],
                "specifications": {
                    "Capacity": "7.5 kg",
                    "Power": "1200W",
                    "Spin Speed": "1000 RPM",
                    "Warranty": "2 Years",
                    "Material": "Stainless Steel"
                },
                "is_featured": True,
                "stock": 20
            },
            {
                "name": "GF-1100 Twin Tub Washer & Dryer",
                "model_code": "GFC-1100",
                "category": "washing_machine",
                "tagline": "2-in-1 Washer & Dryer Machine",
                "description": "Compact twin-tub washing and drying machine with separate wash and dry chambers.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/gf1100.jpg",
                "price_pkr": 37800,
                "price_usd": 135,
                "features": ["Twin Tub", "Washer & Dryer", "Break System", "Heavy Duty"],
                "specifications": {
                    "Capacity": "10 kg",
                    "Power": "1500W",
                    "Spin Speed": "1200 RPM",
                    "Warranty": "3 Years",
                    "Material": "Stainless Steel & Plastic"
                },
                "is_featured": True,
                "stock": 15
            },
            
            # Air Purifier
            {
                "name": "Air Purifier (GF-400)",
                "model_code": "GFC-400",
                "category": "air_purifier",
                "tagline": "HEPA Air Purification System",
                "description": "Advanced air purifier with HEPA filter technology for clean and healthy air quality.",
                "image_url": "https://www.gfcfans.com/cdn/shop/files/gf-400.jpg",
                "price_pkr": 56999,
                "price_usd": 205,
                "features": ["HEPA Filter", "Smart Sensor", "Low Noise", "Compact Design"],
                "specifications": {
                    "Air Flow": "300 m³/h",
                    "Power": "45W",
                    "Coverage": "35-45 sqm",
                    "Filter Life": "6-8 Months",
                    "Warranty": "2 Years"
                },
                "is_featured": True,
                "stock": 18
            },
        ]

        for product_data in products_data:
            product, created = Product.objects.get_or_create(
                model_code=product_data["model_code"],
                defaults=product_data
            )
            status = "created" if created else "already exists"
            self.stdout.write(
                self.style.SUCCESS(
                    f"✓ {product.name} ({product.model_code}) - {status}"
                )
            )

        self.stdout.write(
            self.style.SUCCESS(f"\n✓ Loaded {len(products_data)} products successfully!")
        )
