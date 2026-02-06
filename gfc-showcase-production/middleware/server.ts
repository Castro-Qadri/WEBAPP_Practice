import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import axios from "axios";
import NodeCache from "node-cache";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 5000;
const djangoUrl = process.env.DJANGO_API_URL || "http://localhost:8000";
const corsOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000").split(",");
const cacheTTL = parseInt(process.env.CACHE_TTL || "300", 10);

// Initialize cache
const cache = new NodeCache({ stdTTL: cacheTTL, checkperiod: 60 });

// ==================== MIDDLEWARE ====================

// Security Headers
app.use(helmet());

// Body Parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// CORS Configuration
const corsOptions = {
  origin: corsOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));

// Logging
app.use(morgan("combined"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// ==================== CUSTOM MIDDLEWARE ====================

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.path} - IP: ${req.ip}`
  );
  next();
});

// Cache middleware
const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== "GET") {
    return next();
  }

  const cacheKey = `${req.method}:${req.originalUrl}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log(`✓ Cache HIT: ${cacheKey}`);
    return res.json(cachedData);
  }

  console.log(`✗ Cache MISS: ${cacheKey}`);
  next();
};

// ==================== PROXY ROUTES ====================

// Products API
app.get("/api/products", cacheMiddleware, async (req: Request, res: Response) => {
  try {
    const cacheKey = `GET:/api/products`;
    const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
    const url = `${djangoUrl}/api/products/?${queryString}`;

    console.log(`Fetching: ${url}`);
    const response = await axios.get(url);

    // Cache the response
    cache.set(cacheKey, response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Featured Products
app.get("/api/products/featured", cacheMiddleware, async (req: Request, res: Response) => {
  try {
    const cacheKey = `GET:/api/products/featured`;
    const url = `${djangoUrl}/api/products/featured/`;

    console.log(`Fetching: ${url}`);
    const response = await axios.get(url);

    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({ error: "Failed to fetch featured products" });
  }
});

// Products by Category
app.get("/api/products/by-category", cacheMiddleware, async (req: Request, res: Response) => {
  try {
    const cacheKey = `GET:/api/products/by-category`;
    const url = `${djangoUrl}/api/products/by_category/`;

    console.log(`Fetching: ${url}`);
    const response = await axios.get(url);

    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Product Detail
app.get("/api/products/:id", cacheMiddleware, async (req: Request, res: Response) => {
  try {
    const cacheKey = `GET:/api/products/${req.params.id}`;
    const url = `${djangoUrl}/api/products/${req.params.id}/`;

    console.log(`Fetching: ${url}`);
    const response = await axios.get(url);

    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching product detail:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Related Products
app.get("/api/products/:id/related", cacheMiddleware, async (req: Request, res: Response) => {
  try {
    const cacheKey = `GET:/api/products/${req.params.id}/related`;
    const url = `${djangoUrl}/api/products/${req.params.id}/related/`;

    console.log(`Fetching: ${url}`);
    const response = await axios.get(url);

    cache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ error: "Failed to fetch related products" });
  }
});

// Contact Form
app.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const url = `${djangoUrl}/api/contact/`;

    console.log(`Posting to: ${url}`);
    const response = await axios.post(url, req.body);

    // Clear relevant caches
    cache.del("GET:/api/products");

    res.json(response.data);
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

// Newsletter Subscription
app.post("/api/newsletter", async (req: Request, res: Response) => {
  try {
    const url = `${djangoUrl}/api/newsletter/`;

    console.log(`Posting to: ${url}`);
    const response = await axios.post(url, req.body);

    res.json(response.data);
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    res.status(500).json({ error: "Failed to subscribe" });
  }
});

// ==================== HEALTH CHECK ====================

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    django: `${djangoUrl}`,
  });
});

// ==================== ERROR HANDLING ====================

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    path: req.path,
    method: req.method,
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ==================== SERVER START ====================

app.listen(port, () => {
  console.log(`
╔════════════════════════════════════════╗
║  GFC Express Middleware Server         ║
║  Listening on: http://localhost:${port}   ║
║  Django API: ${djangoUrl}              ║
║  CORS Origins: ${corsOrigins.join(", ")} ║
╚════════════════════════════════════════╝
  `);
});

export default app;
