#!/usr/bin/env node

/**
 * Fix .env.local by removing quotes from values
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing .env.local...\n');

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local not found!');
  process.exit(1);
}

// Read the file
const envFile = fs.readFileSync(envPath, 'utf8');
const lines = envFile.split('\n');

// Process each line
const fixedLines = lines.map(line => {
  const trimmed = line.trim();
  
  // Skip comments and empty lines
  if (!trimmed || trimmed.startsWith('#')) {
    return line;
  }
  
  const match = trimmed.match(/^([^=]+)=(.*)$/);
  if (!match) {
    return line;
  }
  
  const key = match[1].trim();
  let value = match[2].trim();
  
  // Remove quotes if present
  if ((value.startsWith('"') && value.endsWith('"')) || 
      (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
    console.log(`✅ Fixed: ${key}`);
    return `${key}=${value}`;
  }
  
  return line;
});

// Backup original file
const backupPath = path.join(__dirname, '.env.local.backup');
fs.writeFileSync(backupPath, envFile, 'utf8');
console.log(`\n📦 Backed up original to: .env.local.backup\n`);

// Write fixed file
const fixedContent = fixedLines.join('\n');
fs.writeFileSync(envPath, fixedContent, 'utf8');

console.log('✨ Fixed .env.local!\n');
console.log('Next steps:');
console.log('1. Restart your dev server: npm run dev');
console.log('2. Test: http://localhost:3000/api/attorneys');
console.log('\nThe permission error should be gone! 🎉');



