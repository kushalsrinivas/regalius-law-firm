// Script to verify which Supabase key is being used
// Run this with: node check-supabase-key.js

const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse environment variables
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    let value = match[2].trim();
    // Remove quotes if present
    value = value.replace(/^["']|["']$/g, '');
    env[key] = value;
  }
});

console.log('\n=== Supabase Environment Check ===\n');

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

console.log('✓ Supabase URL:', url ? `${url.substring(0, 30)}...` : '❌ NOT SET');
console.log('✓ Anon Key:', anonKey ? `${anonKey.substring(0, 20)}...` : '❌ NOT SET');
console.log('✓ Service Role Key:', serviceKey ? `${serviceKey.substring(0, 20)}...` : '❌ NOT SET');

if (!serviceKey) {
  console.log('\n❌ ERROR: SUPABASE_SERVICE_ROLE_KEY is not set!');
  console.log('\nPlease add it to your .env.local file:');
  console.log('SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here');
  process.exit(1);
}

// Decode the JWT to check the role
try {
  const parts = serviceKey.split('.');
  if (parts.length === 3) {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    console.log('\n✓ Service Key Role:', payload.role);
    
    if (payload.role === 'service_role') {
      console.log('✅ Correct! Service role key is valid.');
    } else {
      console.log('❌ WARNING: This is not a service_role key! It\'s a', payload.role, 'key.');
    }
  }
} catch (e) {
  console.log('\n⚠️  Could not decode service key JWT');
}

console.log('\n=== Next Steps ===');
console.log('1. Stop your dev server (Ctrl+C)');
console.log('2. Delete the .next cache: rm -rf .next');
console.log('3. Restart: npm run dev');
console.log('\n');

