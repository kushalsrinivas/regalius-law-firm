// Generate Password Hash for Admin User
// Run this with: node generate-password-hash.js

const bcrypt = require('bcryptjs');

async function generateHash() {
  // Change this password to whatever you want
  const password = 'Admin@123';
  
  console.log('Generating password hash...\n');
  console.log('Password:', password);
  
  const hash = await bcrypt.hash(password, 10);
  
  console.log('\nGenerated Hash:');
  console.log(hash);
  
  console.log('\n\nSQL Update Statement:');
  console.log(`UPDATE admins SET "passwordHash" = '${hash}' WHERE email = 'admin@regaliuslaw.com';`);
  
  console.log('\n\nOr for INSERT:');
  console.log(`INSERT INTO admins (email, "passwordHash", name) VALUES ('admin@regaliuslaw.com', '${hash}', 'Admin User');`);
}

generateHash().catch(console.error);

