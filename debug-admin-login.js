// Debug Admin Login
// Run with: node debug-admin-login.js

const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// Try to read .env.local
let supabaseUrl, supabaseAnonKey, jwtSecret;

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
    if (line.startsWith("JWT_SECRET=")) {
      jwtSecret = line.split("=")[1].trim();
    }
  });
} catch (error) {
  console.log("⚠️  .env.local not found");
}

console.log("\n🔍 DEBUGGING ADMIN LOGIN\n");
console.log("=".repeat(50));

// Check environment variables
console.log("\n1. Environment Variables:");
console.log("   SUPABASE_URL:", supabaseUrl ? "✅ Set" : "❌ Missing");
console.log("   SUPABASE_ANON_KEY:", supabaseAnonKey ? "✅ Set" : "❌ Missing");
console.log("   JWT_SECRET:", jwtSecret ? "✅ Set" : "❌ Missing");

if (!supabaseUrl || !supabaseAnonKey) {
  console.log("\n❌ Missing environment variables!");
  console.log("   Create .env.local with:");
  console.log("   NEXT_PUBLIC_SUPABASE_URL=your-url");
  console.log("   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debug() {
  try {
    // Test 1: Check if admins table exists
    console.log("\n2. Checking admins table...");
    const { data: tables, error: tablesError } = await supabase
      .from("admins")
      .select("*")
      .limit(1);

    if (tablesError) {
      console.log("   ❌ Error accessing admins table:", tablesError.message);
      console.log(
        "\n   💡 Solution: Run supabase-schema.sql in Supabase SQL Editor"
      );
      return;
    }
    console.log("   ✅ Admins table exists");

    // Test 2: Check if admin user exists
    console.log("\n3. Checking for admin user...");
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("email", "admin@regaliuslaw.com")
      .single();

    if (adminError || !admin) {
      console.log("   ❌ Admin user not found!");
      console.log("\n   💡 Solution: Run this SQL in Supabase:");
      console.log(`
   INSERT INTO admins (email, "passwordHash", name, "createdAt")
   VALUES (
     'admin@regaliuslaw.com',
     '$2b$10$4ToEEU0JmhiE30AHwSig6uTxgAmpB/vW6uxrrDolt/M6TJ61/xnqS',
     'Admin User',
     NOW()
   );
      `);
      return;
    }

    console.log("   ✅ Admin user exists");
    console.log("      ID:", admin.id);
    console.log("      Email:", admin.email);
    console.log("      Name:", admin.name);

    // Test 3: Verify password hash
    console.log("\n4. Testing password verification...");
    const testPassword = "Admin@123";
    const storedHash = admin.passwordHash;

    console.log("   Testing password:", testPassword);
    console.log("   Stored hash:", storedHash.substring(0, 20) + "...");

    const isValid = await bcrypt.compare(testPassword, storedHash);

    if (isValid) {
      console.log("   ✅ Password verification successful!");
      console.log('\n   The password "Admin@123" should work.');
    } else {
      console.log("   ❌ Password verification failed!");
      console.log("\n   💡 Solution: Reset password with this SQL:");
      console.log(`
   UPDATE admins 
   SET "passwordHash" = '$2b$10$4ToEEU0JmhiE30AHwSig6uTxgAmpB/vW6uxrrDolt/M6TJ61/xnqS'
   WHERE email = 'admin@regaliuslaw.com';
      `);
    }

    // Test 4: Generate fresh hash for comparison
    console.log('\n5. Generating fresh hash for "Admin@123"...');
    const freshHash = await bcrypt.hash("Admin@123", 10);
    console.log("   Fresh hash:", freshHash);

    const freshVerify = await bcrypt.compare("Admin@123", freshHash);
    console.log("   Fresh hash verifies:", freshVerify ? "✅ Yes" : "❌ No");

    // Test 5: Test with the exact stored hash
    console.log("\n6. Testing stored hash directly...");
    const expectedHash =
      "$2b$10$4ToEEU0JmhiE30AHwSig6uTxgAmpB/vW6uxrrDolt/M6TJ61/xnqS";
    const expectedVerify = await bcrypt.compare("Admin@123", expectedHash);
    console.log(
      "   Expected hash verifies:",
      expectedVerify ? "✅ Yes" : "❌ No"
    );

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("\n📋 SUMMARY:\n");

    if (isValid) {
      console.log("✅ Everything looks good!");
      console.log("\nYou should be able to login with:");
      console.log("   Email: admin@regaliuslaw.com");
      console.log("   Password: Admin@123");
      console.log("\nIf login still fails, check:");
      console.log("   1. Browser console for errors");
      console.log("   2. Server terminal for errors");
      console.log("   3. Supabase logs (Logs → Auth Logs)");
    } else {
      console.log("❌ Password hash mismatch!");
      console.log("\nRun this SQL in Supabase to fix:");
      console.log(`
UPDATE admins 
SET "passwordHash" = '$2b$10$4ToEEU0JmhiE30AHwSig6uTxgAmpB/vW6uxrrDolt/M6TJ61/xnqS'
WHERE email = 'admin@regaliuslaw.com';
      `);
    }
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error);
  }
}

debug();
