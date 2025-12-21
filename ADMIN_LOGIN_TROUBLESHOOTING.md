# Admin Login Troubleshooting Guide

## 🔐 Default Admin Credentials

- **Email**: `admin@regaliuslaw.com`
- **Password**: `Admin@123`

---

## ✅ Quick Fix - Run This SQL in Supabase

1. Go to your Supabase project
2. Click **SQL Editor** (left sidebar)
3. Click "New Query"
4. Copy and paste this:

```sql
-- Reset admin password to: Admin@123
UPDATE admins 
SET "passwordHash" = '$2b$10$4ToEEU0JmhiE30AHwSig6uTxgAmpB/vW6uxrrDolt/M6TJ61/xnqS'
WHERE email = 'admin@regaliuslaw.com';

-- Verify it worked
SELECT email, name, "createdAt" FROM admins WHERE email = 'admin@regaliuslaw.com';
```

5. Click **Run**
6. Try logging in again with `admin@regaliuslaw.com` / `Admin@123`

---

## 🔍 Troubleshooting Steps

### Step 1: Verify Admin Exists

Run this in Supabase SQL Editor:

```sql
SELECT * FROM admins WHERE email = 'admin@regaliuslaw.com';
```

**If you get NO results:**
- The admin wasn't created
- Run the full `supabase-schema.sql` again
- Or use the script in `reset-admin-password.sql`

**If you get results:**
- Admin exists but password is wrong
- Continue to Step 2

### Step 2: Check Environment Variables

Make sure you have `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
JWT_SECRET=your-secret-key
```

### Step 3: Restart Dev Server

After adding/changing env variables:

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Step 4: Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Try logging in
4. Look for any error messages

### Step 5: Check Supabase Logs

1. Go to your Supabase project
2. Click **Logs** → **Auth Logs**
3. Try logging in
4. Check for error messages

---

## 🔧 Alternative Solutions

### Option A: Create New Admin Manually

Run in Supabase SQL Editor:

```sql
INSERT INTO admins (email, "passwordHash", name, "createdAt")
VALUES (
  'admin@regaliuslaw.com',
  '$2b$10$4ToEEU0JmhiE30AHwSig6uTxgAmpB/vW6uxrrDolt/M6TJ61/xnqS',
  'Admin User',
  NOW()
) ON CONFLICT (email) DO UPDATE 
SET "passwordHash" = EXCLUDED."passwordHash";
```

Password will be: `Admin@123`

### Option B: Use Different Password

1. Run this command to generate a new hash:

```bash
node generate-password-hash.js
```

2. Edit the script to use your desired password
3. Copy the generated hash
4. Run in Supabase:

```sql
UPDATE admins 
SET "passwordHash" = 'YOUR_GENERATED_HASH_HERE'
WHERE email = 'admin@regaliuslaw.com';
```

### Option C: Delete and Recreate

```sql
-- Delete existing admin
DELETE FROM admins WHERE email = 'admin@regaliuslaw.com';

-- Create fresh admin
INSERT INTO admins (email, "passwordHash", name, "createdAt")
VALUES (
  'admin@regaliuslaw.com',
  '$2b$10$4ToEEU0JmhiE30AHwSig6uTxgAmpB/vW6uxrrDolt/M6TJ61/xnqS',
  'Admin User',
  NOW()
);
```

---

## 🐛 Common Issues

### "Invalid credentials" Error

**Causes:**
- Wrong email or password
- Admin doesn't exist in database
- Password hash is incorrect
- Environment variables not set

**Solutions:**
1. Double-check email: `admin@regaliuslaw.com` (no spaces)
2. Double-check password: `Admin@123` (capital A, @ symbol, no spaces)
3. Run the reset SQL above
4. Check `.env.local` exists

### "Unauthorized" Error

**Causes:**
- Environment variables missing
- JWT_SECRET not set
- Supabase connection issue

**Solutions:**
1. Check all env vars are set
2. Restart dev server
3. Check Supabase project is running

### Database Connection Issues

**Causes:**
- Wrong SUPABASE_URL or SUPABASE_ANON_KEY
- Supabase project paused/deleted
- Network issues

**Solutions:**
1. Verify credentials in Supabase dashboard (Settings → API)
2. Copy-paste carefully (no extra spaces)
3. Check project is active

---

## 📝 Password Hash Explanation

The hash `$2b$10$4ToEEU0JmhiE30AHwSig6uTxgAmpB/vW6uxrrDolt/M6TJ61/xnqS` corresponds to the password `Admin@123`.

This is generated using bcrypt with 10 rounds. If you want to use a different password, you can:

1. Use `generate-password-hash.js` script
2. Or use an online bcrypt generator (make sure it's bcrypt, not other algorithms)

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] `supabase-schema.sql` ran successfully
- [ ] `admins` table exists
- [ ] Admin user exists in database
- [ ] `.env.local` file exists with correct values
- [ ] Dev server restarted after adding env vars
- [ ] Using correct email: `admin@regaliuslaw.com`
- [ ] Using correct password: `Admin@123`

---

## 🆘 Still Not Working?

If you've tried everything above:

1. **Check the admin exists:**
   ```sql
   SELECT * FROM admins;
   ```

2. **Delete all admins and start fresh:**
   ```sql
   DELETE FROM admins;
   ```
   Then run `reset-admin-password.sql`

3. **Check browser Network tab:**
   - Open DevTools → Network
   - Try logging in
   - Look at the `/api/admin/login` request
   - Check the response

4. **Check server logs:**
   - Look at your terminal where `npm run dev` is running
   - Any errors will show there

---

**After fixing, you should be able to login with:**
- Email: `admin@regaliuslaw.com`
- Password: `Admin@123`

