import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Take-Home Bundle Builder API",
      version: "1.0.0",
      description: "RESTful API documentation for Take-Home Bundle Builder backend service.",
    },
    servers: [
      {
        url: "/api",
        description: "API Base URL",
      },
    ],
    components: {
      schemas: {
        ProductVariant: {
          type: "object",
          properties: {
            name: { type: "string", example: "White" },
            image: { type: "string", example: "/images/cam-v4.png" },
          },
          required: ["name"],
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "string", example: "cam-v4" },
            category: { type: "string", enum: ["cameras", "sensors", "accessories"], example: "cameras" },
            name: { type: "string", example: "Wyze Cam v4" },
            description: { type: "string", example: "The clearest Wyze Cam ever made." },
            image: { type: "string", example: "/images/cam-v4.png" },
            price: { type: "number", example: 35.98 },
            salePrice: { type: "number", example: 27.98 },
            badge: { type: "string", example: "Save 22%" },
            variants: {
              type: "array",
              items: { $ref: "#/components/schemas/ProductVariant" },
            },
            required: { type: "boolean", example: false },
          },
        },
        Plan: {
          type: "object",
          properties: {
            id: { type: "string", example: "cam-unlimited" },
            name: { type: "string", example: "Cam Unlimited" },
            price: { type: "number", example: 12.99 },
            salePrice: { type: "number", example: 9.99 },
          },
        },
        LineItem: {
          type: "object",
          properties: {
            productId: { type: "string", example: "cam-v4" },
            qty: { type: "integer", example: 2 },
            variant: { type: "string", example: "Black" },
          },
          required: ["productId", "qty"],
        },
        Bundle: {
          type: "object",
          properties: {
            id: { type: "string", example: "b1a2c3d4-e5f6-7890-abcd-ef1234567890" },
            cameras: {
              type: "array",
              items: { $ref: "#/components/schemas/LineItem" },
            },
            sensors: {
              type: "array",
              items: { $ref: "#/components/schemas/LineItem" },
            },
            accessories: {
              type: "array",
              items: { $ref: "#/components/schemas/LineItem" },
            },
            planId: { type: "string", nullable: true, example: "cam-unlimited" },
            step: { type: "integer", example: 1 },
          },
        },
        PricingSummary: {
          type: "object",
          properties: {
            original: { type: "number", example: 104.94 },
            discounted: { type: "number", example: 83.94 },
            savings: { type: "number", example: 21.00 },
          },
        },
        OrderInput: {
          type: "object",
          properties: {
            bundleId: { type: "string", example: "b1a2c3d4-e5f6-7890-abcd-ef1234567890" },
            email: { type: "string", example: "customer@wyze.com" },
            address: { type: "string", example: "123 Security Way" },
            total: { type: "number", example: 83.94 },
          },
          required: ["bundleId"],
        },
      },
    },
    paths: {
      "/products": {
        get: {
          summary: "Retrieve all products",
          tags: ["Products"],
          parameters: [
            {
              name: "category",
              in: "query",
              required: false,
              schema: { type: "string", enum: ["cameras", "sensors", "accessories"] },
              description: "Filter products by category",
            },
          ],
          responses: {
            200: {
              description: "List of products",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
          },
        },
      },
      "/plans": {
        get: {
          summary: "Retrieve all available plans",
          tags: ["Plans"],
          responses: {
            200: {
              description: "List of protection plans",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Plan" },
                  },
                },
              },
            },
          },
        },
      },
      "/bundles": {
        post: {
          summary: "Create a new security bundle",
          tags: ["Bundles"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Bundle" },
              },
            },
          },
          responses: {
            201: {
              description: "Bundle successfully created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Bundle" },
                },
              },
            },
          },
        },
      },
      "/bundles/calculate": {
        post: {
          summary: "Calculate total bundle pricing and savings",
          tags: ["Bundles"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Bundle" },
              },
            },
          },
          responses: {
            200: {
              description: "Pricing summary calculation",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/PricingSummary" },
                },
              },
            },
          },
        },
      },
      "/bundles/{id}": {
        get: {
          summary: "Get bundle configuration by ID",
          tags: ["Bundles"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Bundle details",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Bundle" },
                },
              },
            },
            404: { description: "Bundle not found" },
          },
        },
        put: {
          summary: "Update existing bundle configuration",
          tags: ["Bundles"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Bundle" },
              },
            },
          },
          responses: {
            200: {
              description: "Updated bundle details",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Bundle" },
                },
              },
            },
          },
        },
      },
      "/orders": {
        post: {
          summary: "Place an order for a bundle",
          tags: ["Orders"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OrderInput" },
              },
            },
          },
          responses: {
            201: { description: "Order created successfully" },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
