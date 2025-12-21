-- ========================================
-- RESET ADMIN PASSWORD TO: kushalstar95
-- ========================================
-- Run this in Supabase SQL Editor to reset your admin password
-- Dashboard → SQL Editor → New Query → Paste this → Run

-- Update the admin password
UPDATE admins 
SET "passwordHash" = '$2b$10$lN9MQwmAC5bsvy4KcVo/8.m5qmZnWTacPAI2T85KZIRvMvwDUnUBK'
WHERE email = 'admin@regaliuslaw.com';

-- Verify the update
SELECT id, email, name, "createdAt" 
FROM admins 
WHERE email = 'admin@regaliuslaw.com';

-- ========================================
-- If the admin user doesn't exist yet, create it:
-- ========================================

INSERT INTO admins (email, "passwordHash", name, "createdAt")
VALUES (
  'admin@regaliuslaw.com',
  '$2b$10$lN9MQwmAC5bsvy4KcVo/8.m5qmZnWTacPAI2T85KZIRvMvwDUnUBK',
  'Admin User',
  NOW()
)
ON CONFLICT (email) DO UPDATE 
SET "passwordHash" = '$2b$10$lN9MQwmAC5bsvy4KcVo/8.m5qmZnWTacPAI2T85KZIRvMvwDUnUBK';

-- ========================================
-- CREDENTIALS:
-- ========================================
-- Email: admin@regaliuslaw.com
-- Password: kushalstar95
-- ========================================
