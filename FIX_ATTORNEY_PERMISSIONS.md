# Fix Attorney Creation Permission Error

## Problem
You're getting a `permission denied for schema public` error when creating attorneys because the Supabase client is using the **anon key** instead of the **service role key**.

The anon key is subject to Row Level Security (RLS) policies, while the service role key bypasses RLS and has full access.

## Solution

### Step 1: Get Your Service Role Key

1. Go to https://supabase.com and sign in
2. Open your project
3. Click **Settings** (gear icon) in the left sidebar
4. Click **API** in the settings menu
5. Scroll down to find the **service_role** key (under "Project API keys")
6. **⚠️ IMPORTANT**: This key has **FULL ACCESS** to your database and should **NEVER** be exposed to the client-side or committed to git

### Step 2: Add Service Role Key to Environment Variables

Open your `.env.local` file and add this line:

```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Replace `your-service-role-key-here` with the actual service role key you copied from Supabase.

Your `.env.local` should look like this:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=regalius-law-secret-jwt-key-2024
```

### Step 3: Restart Your Development Server

Stop your Next.js dev server (Ctrl+C) and restart it:

```bash
npm run dev
```

### Step 4: Test Attorney Creation

1. Go to the admin panel
2. Try creating a new attorney
3. The upload should now work without the permission error

## What Changed

I've updated the `lib/supabase.ts` file to use the service role key instead of the anon key:

**Before:**
```typescript
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**After:**
```typescript
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
export const supabase = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
```

## Security Notes

- ✅ The service role key is stored in `.env.local` which is **NOT** committed to git (already in `.gitignore`)
- ✅ The service role key does NOT have the `NEXT_PUBLIC_` prefix, so it's only available on the server
- ✅ This client is only used in API routes (server-side), never on the client
- ⚠️ **NEVER** expose the service role key to the client-side
- ⚠️ **NEVER** commit the service role key to git

## Troubleshooting

If you still get permission errors:

1. **Verify the key is correct**: Check that you copied the full service_role key from Supabase
2. **Restart the server**: Make sure you restarted the dev server after adding the env variable
3. **Check the file**: Confirm the key is in `.env.local` (not `.env`)
4. **Clear cache**: Try running `rm -rf .next && npm run dev` to clear the Next.js cache

## Why This Happened

The original setup was using the anon key, which is meant for client-side operations and respects RLS policies. However, your backend API routes need full database access to perform admin operations, which requires the service role key.

The image upload worked because Supabase Storage has different permissions than the database tables.

