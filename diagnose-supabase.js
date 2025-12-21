#!/usr/bin/env node

/**
 * Quick diagnostic script to check Supabase connection and policies
 */

const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      process.env[key] = value;
    }
  });
}

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Diagnosing Supabase Connection...\n');

// Check environment variables
console.log('✅ Environment Variables:');
console.log(`   NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✓ Set' : '✗ Missing'}`);
console.log(`   SUPABASE_SERVICE_ROLE_KEY: ${serviceRoleKey ? '✓ Set' : '✗ Missing'}`);
console.log();

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing required environment variables!');
  console.error('   Please check your .env.local file.');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Test connection
async function testConnection() {
  console.log('🔌 Testing Database Connection...\n');

  try {
    // Test attorneys table
    console.log('📋 Testing attorneys table...');
    const { data: attorneys, error: attorneysError } = await supabase
      .from('attorneys')
      .select('*')
      .limit(1);

    if (attorneysError) {
      console.error('   ❌ Error:', attorneysError.message);
      console.error('   Code:', attorneysError.code);
      console.error('   Details:', attorneysError.details);
      console.log();
      
      if (attorneysError.code === '42501') {
        console.log('💡 This is a PERMISSIONS error!');
        console.log('   The RLS policies are blocking access.');
        console.log('   Run the fix script: fix-rls-policies.sql');
        console.log('   See: FIX_PERMISSIONS_ERROR.md for instructions');
      }
    } else {
      console.log(`   ✅ Success! Found ${attorneys?.length || 0} attorney(s)`);
    }
    console.log();

    // Test blogs table
    console.log('📋 Testing blogs table...');
    const { data: blogs, error: blogsError } = await supabase
      .from('blogs')
      .select('*')
      .limit(1);

    if (blogsError) {
      console.error('   ❌ Error:', blogsError.message);
    } else {
      console.log(`   ✅ Success! Found ${blogs?.length || 0} blog(s)`);
    }
    console.log();

    // Test contacts table
    console.log('📋 Testing contacts table...');
    const { data: contacts, error: contactsError } = await supabase
      .from('contacts')
      .select('*')
      .limit(1);

    if (contactsError) {
      console.error('   ❌ Error:', contactsError.message);
    } else {
      console.log(`   ✅ Success! Found ${contacts?.length || 0} contact(s)`);
    }
    console.log();

    // Check policies
    console.log('🔐 Checking RLS Policies...');
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('tablename, policyname')
      .in('tablename', ['attorneys', 'blogs', 'contacts', 'admins']);

    if (!policiesError && policies) {
      console.log(`   Found ${policies.length} policies:`);
      const grouped = policies.reduce((acc, p) => {
        if (!acc[p.tablename]) acc[p.tablename] = [];
        acc[p.tablename].push(p.policyname);
        return acc;
      }, {});
      
      Object.entries(grouped).forEach(([table, pols]) => {
        console.log(`   - ${table}: ${pols.length} policies`);
      });
    }
    console.log();

    console.log('✨ Diagnosis Complete!');
    
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    process.exit(1);
  }
}

testConnection();

