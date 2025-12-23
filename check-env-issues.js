#!/usr/bin/env node

/**
 * Check for common .env.local issues
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking .env.local for common issues\n');

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local not found!');
  process.exit(1);
}

const envFile = fs.readFileSync(envPath, 'utf8');
const lines = envFile.split('\n');

let hasIssues = false;
let lineNum = 0;

lines.forEach(line => {
  lineNum++;
  const trimmed = line.trim();
  
  // Skip comments and empty lines
  if (!trimmed || trimmed.startsWith('#')) return;
  
  const match = trimmed.match(/^([^=]+)=(.*)$/);
  if (!match) return;
  
  const key = match[1].trim();
  const value = match[2].trim();
  
  // Check for common issues
  if (key.startsWith('SUPABASE') || key.startsWith('NEXT_PUBLIC')) {
    // Issue 1: Values wrapped in quotes
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      console.log(`⚠️  Line ${lineNum}: ${key}`);
      console.log(`   Value has quotes around it - this might cause issues!`);
      console.log(`   Current: ${key}=${value}`);
      console.log(`   Should be: ${key}=${value.slice(1, -1)}`);
      console.log();
      hasIssues = true;
    }
    
    // Issue 2: Placeholder values
    if (value.includes('your-') || value.includes('placeholder')) {
      console.log(`⚠️  Line ${lineNum}: ${key}`);
      console.log(`   Looks like a placeholder value!`);
      console.log(`   Current: ${value.substring(0, 50)}...`);
      console.log();
      hasIssues = true;
    }
    
    // Issue 3: Empty values
    if (!value || value === '""' || value === "''") {
      console.log(`❌ Line ${lineNum}: ${key}`);
      console.log(`   Value is empty!`);
      console.log();
      hasIssues = true;
    }
  }
});

if (!hasIssues) {
  console.log('✅ No obvious issues found in .env.local');
  console.log();
  console.log('Your environment file looks good!');
  console.log('If you\'re still having issues, the problem is likely');
  console.log('with the RLS policies in Supabase.');
  console.log();
  console.log('👉 Run this SQL in Supabase to fix:');
  console.log('   ALTER TABLE attorneys DISABLE ROW LEVEL SECURITY;');
  console.log('   ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;');
  console.log('   ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;');
  console.log('   ALTER TABLE admins DISABLE ROW LEVEL SECURITY;');
} else {
  console.log('Found issues! Fix them in .env.local and restart your dev server.');
}



