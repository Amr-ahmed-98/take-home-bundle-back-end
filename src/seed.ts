import "dotenv/config";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import { ProductModel } from "./modules/products/product.model.js";
import { PlanModel } from "./modules/plans/plan.model.js";

const products = [
  {
    id: "cam-v4",
    category: "cameras",
    name: "Wyze Cam v4",
    description: "The clearest Wyze Cam ever made.",
    image: "/images/cam-v4.png",
    price: 35.98,
    salePrice: 27.98,
    badge: "Save 22%",
    variants: [
      { name: "White", image: "/images/cam-v4.png" },
      { name: "Grey", image: "/images/grey-cam-v4.png" },
      { name: "Black", image: "/images/black-cam-v4.png" },
    ],
    required: false,
  },
  {
    id: "cam-pan-v3",
    category: "cameras",
    name: "Wyze Cam Pan v3",
    description: "360° pan and 180° tilt security camera.",
    image: "/images/cam-pan-v3.png",
    price: 39.98,
    salePrice: 34.98,
    badge: "Save 12%",
    variants: [
      { name: "White", image: "/images/cam-pan-v3.png" },
      { name: "Black", image: "/images/black-cam-pan.png" },
    ],
    required: false,
  },
  {
    id: "cam-floodlight-v2",
    category: "cameras",
    name: "Wyze Cam Floodlight v2",
    description: "2K floodlight camera with a 160° wide-angle view for your garage.",
    image: "/images/cam-floodlight-v2.png",
    price: 89.98,
    salePrice: 69.98,
    badge: "Save 22%",
    variants: [
      { name: "White", image: "/images/cam-floodlight-v2.png" },
      { name: "Black", image: "/images/black-wayze-cam-v2.png" },
    ],
    required: false,
  },
  {
    id: "duo-cam-doorbell",
    category: "cameras",
    name: "Wyze Duo Cam Doorbell",
    description: "Two cameras. Two views. Double the porch protection.",
    image: "/images/duo-cam-doorbell.png",
    price: 69.98,
    required: false,
  },
  {
    id: "battery-cam-pro",
    category: "cameras",
    name: "Wyze Battery Cam Pro",
    description: "Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.",
    image: "/images/battery-cam-pro.png",
    price: 89.98,
    variants: [
      { name: "White", image: "/images/battery-cam-pro.png" },
      { name: "Black", image: "/images/black-wayze-battery.png" },
    ],
    required: false,
  },
  {
    id: "motion-sensor",
    category: "sensors",
    name: "Wyze Sense Motion Sensor",
    description: "Detects motion up to 25 feet away with a 120° field of view.",
    image: "/images/motion-sensor.png",
    price: 29.99,
    required: false,
  },
  {
    id: "sense-hub",
    category: "sensors",
    name: "Wyze Sense Hub (Required)",
    description: "Connects all your Wyze sensors to your home network.",
    image: "/images/sense-hub.png",
    price: 29.92,
    salePrice: 0,
    required: true,
  },
  {
    id: "microsd-256gb",
    category: "accessories",
    name: "Wyze MicroSD Card (256GB)",
    description: "Local continuous recording for your Wyze cameras.",
    image: "/images/microsd.png",
    price: 20.98,
    required: false,
  },
];

const plans = [
  {
    id: "cam-unlimited",
    name: "Cam Unlimited",
    price: 12.99,
    salePrice: 9.99,
  },
];

async function seed() {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI environment variable is missing.");
  }
  await mongoose.connect(env.mongoUri);
  await ProductModel.deleteMany({});
  await PlanModel.deleteMany({});
  await ProductModel.insertMany(products);
  await PlanModel.insertMany(plans);
  console.log(`Seeded ${products.length} products, ${plans.length} plans with variant images`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed", err);
  process.exit(1);
});
