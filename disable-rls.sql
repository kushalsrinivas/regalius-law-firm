-- ALTERNATIVE FIX: Disable RLS Entirely
-- This will bypass RLS completely and rely on service role key security

-- Disable RLS on all tables
ALTER TABLE attorneys DISABLE ROW LEVEL SECURITY;
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies (they're not needed with RLS disabled)
DROP POLICY IF EXISTS "Enable read for all users" ON attorneys;
DROP POLICY IF EXISTS "Enable insert for all users" ON attorneys;
DROP POLICY IF EXISTS "Enable update for all users" ON attorneys;
DROP POLICY IF EXISTS "Enable delete for all users" ON attorneys;
DROP POLICY IF EXISTS "Enable read for active attorneys" ON attorneys;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON attorneys;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON attorneys;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON attorneys;

DROP POLICY IF EXISTS "Enable read for all users" ON blogs;
DROP POLICY IF EXISTS "Enable insert for all users" ON blogs;
DROP POLICY IF EXISTS "Enable update for all users" ON blogs;
DROP POLICY IF EXISTS "Enable delete for all users" ON blogs;
DROP POLICY IF EXISTS "Enable read for published blogs" ON blogs;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON blogs;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON blogs;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON blogs;

DROP POLICY IF EXISTS "Enable insert for all users" ON contacts;
DROP POLICY IF EXISTS "Enable read for all users" ON contacts;
DROP POLICY IF EXISTS "Enable update for all users" ON contacts;
DROP POLICY IF EXISTS "Enable delete for all users" ON contacts;
DROP POLICY IF EXISTS "Enable read for authenticated users only" ON contacts;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON contacts;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON contacts;

DROP POLICY IF EXISTS "Enable read for all users" ON admins;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON admins;

-- Verify RLS is disabled
SELECT 
  schemaname,
  tablename,
  rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE tablename IN ('attorneys', 'blogs', 'contacts', 'admins')
ORDER BY tablename;

