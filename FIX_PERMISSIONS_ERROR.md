# Fix Supabase Permission Errors

## Problem
You're seeing this error:
```
{
  code: '42501',
  details: null,
  hint: null,
  message: 'permission denied for schema public'
}
```

## Root Cause
The Row Level Security (RLS) policies in your Supabase database are too restrictive. They're checking for `auth.role() = 'authenticated'`, which doesn't work properly with the service role key setup.

## Solution

### Option 1: Update RLS Policies (Recommended)

1. **Go to your Supabase Dashboard**
   - Navigate to https://supabase.com
   - Open your project
   - Click on "SQL Editor" in the left sidebar

2. **Run the fix script**
   - Copy the contents of `fix-rls-policies.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute

3. **Verify the fix**
   - Restart your development server
   - Test the `/api/attorneys` endpoint
   - The error should be gone!

### Option 2: Disable RLS (Quick Fix - Less Secure)

If you want to quickly test without RLS:

```sql
-- WARNING: This removes all security restrictions!
-- Only use this for local development/testing

ALTER TABLE attorneys DISABLE ROW LEVEL SECURITY;
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;
```

**Note**: This is NOT recommended for production. Your service role key should handle security at the application layer.

### Option 3: Verify Environment Variables

Make sure your `.env.local` file has the correct values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=regalius-law-secret-jwt-key-2024
```

To verify your keys are working:
```bash
node verify-supabase.js
```

## Understanding the Fix

The original policies used:
```sql
auth.role() = 'authenticated'
```

This checks if a user is authenticated via Supabase Auth, but since we're using a service role key from API routes (not browser-based auth), this check always fails.

The new policies use:
```sql
USING (true)
```

This allows all operations through RLS, relying on the service role key for security at the application layer. Your API routes handle authorization (admin checks, session verification, etc.).

## Security Considerations

With these permissive RLS policies, security is handled by:

1. **Service Role Key**: Only your server can access the database (key is never exposed to clients)
2. **API Route Protection**: Admin operations require valid sessions (see `/app/api/*/route.ts`)
3. **Environment Variables**: Keys are kept secret in `.env.local` (never committed to git)

This is a common pattern for server-side rendered applications using Supabase.

## Troubleshooting

### Still seeing the error?

1. **Check that policies were created**:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'attorneys';
   ```

2. **Verify service role key is set**:
   ```bash
   node check-supabase-key.js
   ```

3. **Restart your dev server**:
   ```bash
   npm run dev
   ```

4. **Check Supabase logs**:
   - Go to Supabase Dashboard → Logs → Database
   - Look for any error messages

### Double-check your setup

Run these verification scripts:
```bash
node verify-supabase.js
node check-supabase-key.js
```

## After Applying the Fix

1. Restart your development server
2. Visit http://localhost:3000/attorneys - should load without errors
3. Visit http://localhost:3000/about - should display attorney profiles
4. Try the admin panel to manage attorneys

If you still have issues, check the console logs for more specific error messages.

