// Attic Database Seed Script
// Can be executed with npx tsx prisma/seed.ts

import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "../src/data/mockData";
import { SEED_USERS } from "../src/lib/db";

async function main() {
  console.log("🌱 Starting Attic database seeding...");

  // 1. Categories
  console.log(`📦 Seeding ${MOCK_CATEGORIES.length} categories...`);
  for (const cat of MOCK_CATEGORIES) {
    console.log(`  - Category: ${cat.label} (${cat.id})`);
  }

  // 2. Demo Users
  console.log(`👤 Seeding ${SEED_USERS.length} demo users...`);
  for (const user of SEED_USERS) {
    console.log(`  - User: ${user.name} [Role: ${user.role}]`);
  }

  // 3. Furniture Listings
  console.log(`🛋️ Seeding ${MOCK_PRODUCTS.length} curated furniture listings...`);
  for (const product of MOCK_PRODUCTS) {
    console.log(
      `  - [${product.conditionLabel}] ${product.title} (${product.dimensions.length}x${product.dimensions.width}x${product.dimensions.height}cm) - Rp ${product.price.toLocaleString("id-ID")}`
    );
  }

  console.log("✅ Attic database seeding completed successfully!");
}

main().catch((e) => {
  console.error("❌ Seed error:", e);
  process.exit(1);
});
