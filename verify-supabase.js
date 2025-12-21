// Verify Supabase Connection
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

// Read .env.local
let supabaseUrl, supabaseAnonKey;

try {
  const envContent = fs.readFileSync(".env.local", "utf-8");
  const lines = envContent.split("\n");
  lines.forEach((line) => {
    if (line.startsWith("NEXT_PUBLIC_SUPABASE_URL=")) {
      supabaseUrl = line.split("=")[1].trim();
    }
    if (line.startsWith("NEXT_PUBLIC_SUPABASE_ANON_KEY=")) {
      supabaseAnonKey = line.split("=")[1].trim();
    }
  });
} catch (error) {
  console.log("❌ Cannot read .env.local");
  process.exit(1);
}

console.log("\n🔍 VERIFYING SUPABASE CONNECTION\n");
console.log("=".repeat(60));

console.log("\n1. Environment Variables:");
console.log("   URL:", supabaseUrl);
console.log("   Key (first 20 chars):", supabaseAnonKey?.substring(0, 20) + "...");

if (!supabaseUrl || !supabaseAnonKey) {
  console.log("\n❌ Missing credentials in .env.local");
  console.log("\nYour .env.local should have:");
  console.log("NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co");
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...");
  process.exit(1);
}

// Check URL format
if (!supabaseUrl.includes("supabase.co")) {
  console.log("\n⚠️  URL doesn't look like a Supabase URL");
  console.log("   Expected format: https://xxxxx.supabase.co");
}

// Check key format (JWT)
if (!supabaseAnonKey.startsWith("eyJ")) {
  console.log("\n⚠️  API key doesn't look like a JWT token");
  console.log("   Expected to start with: eyJ");
}

console.log("\n2. Testing connection...");

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  try {
    // Test 1: Try to query any table
    console.log("\n3. Checking database access...");
    const { data, error } = await supabase
      .from("admins")
      .select("count")
      .limit(1);

    if (error) {
      console.log("   ❌ Error:", error.message);
      console.log("   Code:", error.code);
      console.log("   Details:", error.details);
      
      if (error.message.includes("Invalid API key") || error.message.includes("JWT")) {
        console.log("\n💡 SOLUTION:");
        console.log("   Your API key is incorrect or expired.");
        console.log("\n   Steps to fix:");
        console.log("   1. Go to https://supabase.com");
        console.log("   2. Open your project");
        console.log("   3. Settings → API");
        console.log("   4. Copy the 'anon public' key (under Project API keys)");
        console.log("   5. Replace NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
        console.log("   6. Make sure to copy the ENTIRE key");
      } else if (error.message.includes("relation") || error.message.includes("does not exist")) {
        console.log("\n💡 SOLUTION:");
        console.log("   The 'admins' table doesn't exist yet.");
        console.log("\n   Steps to fix:");
        console.log("   1. Open Supabase dashboard");
        console.log("   2. Go to SQL Editor");
        console.log("   3. Click 'New Query'");
        console.log("   4. Copy ALL contents from supabase-schema.sql");
        console.log("   5. Paste and click 'Run'");
      }
      return;
    }

    console.log("   ✅ Connected successfully!");
    console.log("\n4. Checking for admin user...");
    
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("email", "admin@regaliuslaw.com")
      .single();

    if (adminError && adminError.code !== "PGRST116") {
      console.log("   ❌ Error:", adminError.message);
      return;
    }

    if (!admin) {
      console.log("   ❌ Admin user not found");
      console.log("\n💡 SOLUTION:");
      console.log("   Run reset-admin-password.sql in Supabase SQL Editor");
      return;
    }

    console.log("   ✅ Admin user exists");
    console.log("   Email:", admin.email);
    console.log("   Hash:", admin.passwordHash?.substring(0, 20) + "...");

    // Test the password
    console.log("\n5. Testing password 'kushalstar95'...");
    const bcrypt = require("bcryptjs");
    const isValid = await bcrypt.compare("kushalstar95", admin.passwordHash);
    
    if (isValid) {
      console.log("   ✅ Password is correct!");
      console.log("\n" + "=".repeat(60));
      console.log("\n✅ EVERYTHING IS GOOD!");
      console.log("\nYou should be able to login with:");
      console.log("   Email: admin@regaliuslaw.com");
      console.log("   Password: kushalstar95");
      console.log("\n" + "=".repeat(60));
    } else {
      console.log("   ❌ Password doesn't match!");
      console.log("\n💡 SOLUTION:");
      console.log("   Run this SQL in Supabase SQL Editor:");
      console.log(`
   UPDATE admins 
   SET "passwordHash" = '$2b$10$lN9MQwmAC5bsvy4KcVo/8.m5qmZnWTacPAI2T85KZIRvMvwDUnUBK'
   WHERE email = 'admin@regaliuslaw.com';
      `);
    }

  } catch (error) {
    console.error("\n❌ Unexpected error:", error.message);
    console.error(error);
  }
}

test();

