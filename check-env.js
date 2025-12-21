#!/usr/bin/env node

/**
 * Check Supabase environment variables
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Supabase Environment Variables\n');

// Load .env.local manually
const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.error('   Create .env.local from ENV_TEMPLATE.txt');
  process.exit(1);
}

const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=:#]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
  }
});

console.log('📋 Found environment variables:\n');

const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET'
];

let hasIssues = false;

required.forEach(key => {
  const value = envVars[key];
  if (!value) {
    console.log(`❌ ${key}: NOT SET`);
    hasIssues = true;
  } else if (value.includes('your-') || value.includes('placeholder')) {
    console.log(`⚠️  ${key}: SET BUT LOOKS LIKE PLACEHOLDER`);
    console.log(`   Value: ${value.substring(0, 50)}...`);
    hasIssues = true;
  } else {
    const preview = value.length > 50 ? value.substring(0, 50) + '...' : value;
    console.log(`✅ ${key}: ${preview}`);
  }
});

console.log();

if (hasIssues) {
  console.log('⚠️  Issues detected with environment variables!\n');
  console.log('To fix:');
  console.log('1. Go to https://supabase.com');
  console.log('2. Open your project');
  console.log('3. Click Settings → API');
  console.log('4. Copy the correct values to .env.local');
  console.log();
  console.log('See ENV_TEMPLATE.txt for more details.');
} else {
  console.log('✅ All environment variables look good!');
  console.log();
  console.log('If you\'re still getting errors, the issue is likely with');
  console.log('the RLS policies in your Supabase database.');
  console.log();
  console.log('Run the fix: fix-rls-policies.sql in Supabase SQL Editor');
  console.log('See: FIX_PERMISSIONS_ERROR.md for instructions');
}

