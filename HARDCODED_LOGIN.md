# ⚠️ TEMPORARY HARDCODED CREDENTIALS

## Current Status

The admin login is **temporarily using hardcoded credentials** instead of Supabase authentication.

### Login Credentials:
- **Email:** `admin@regaliuslaw.com`
- **Password:** `kushalstar95`

---

## What's Hardcoded:

**File:** `app/api/admin/login/route.ts`

The login route bypasses Supabase and uses simple string comparison:

```typescript
if (email === 'admin@regaliuslaw.com' && password === 'kushalstar95') {
  // Login successful
}
```

---

## What Still Works:

✅ Admin login  
✅ Session management (JWT)  
✅ Protected routes  
✅ Admin dashboard access

---

## What Doesn't Work Yet:

❌ Supabase database connection  
❌ Contact form submissions to database  
❌ Blog CRUD operations  
❌ Attorney CRUD operations  

*These features will return errors until Supabase is properly configured.*

---

## To Fix Supabase Later:

1. Go to [supabase.com](https://supabase.com)
2. Settings → API
3. Copy **Project URL** and **anon public** key
4. Update `.env.local` (remove quotes from values):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   JWT_SECRET=regalius-law-secret-jwt-key-2024
   ```
5. Run `supabase-schema.sql` in Supabase SQL Editor
6. Create `uploads` bucket in Supabase Storage (make it public)
7. Revert `app/api/admin/login/route.ts` to use Supabase authentication

---

## For Now:

You can access the admin panel at:
- **URL:** `http://localhost:3000/admin/login`
- **Email:** `admin@regaliuslaw.com`
- **Password:** `kushalstar95`

---

**Note:** This is a temporary workaround. The full application requires Supabase to be properly configured for all features to work.



