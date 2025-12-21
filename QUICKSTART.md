# 🚀 QUICK START GUIDE - Regalius Law Admin Setup

## ⚠️ YOU'RE MISSING `.env.local` FILE!

The "Invalid credentials" error is because your app **cannot connect to Supabase**.

---

## 📝 Step-by-Step Fix

### **1. Create `.env.local` File**

Create a new file in the **root** of your project (same folder as `package.json`):

**File:** `.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
JWT_SECRET=regalius-law-secret-jwt-key-2024
```

---

### **2. Get Your Supabase Credentials**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Open your project (or create a new one)
3. Click **Settings** (gear icon in bottom left)
4. Click **API**
5. Copy these values:
   - **Project URL** → Replace `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** (under Project API keys) → Replace `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Example:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xyzabcdef.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiY2RlZiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjc4OTAwMDAwLCJleHAiOjE5OTQ0NzYwMDB9.example
JWT_SECRET=regalius-law-secret-jwt-key-2024
```

---

### **3. Set Up Supabase Database**

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy the entire contents of `supabase-schema.sql`
4. Paste into the SQL editor
5. Click **Run** (or press Ctrl+Enter)

This creates:
- `admins` table
- `contacts` table
- `blogs` table
- `attorneys` table
- Security policies
- **Default admin user**

---

### **4. Create Supabase Storage Bucket**

1. In Supabase dashboard, click **Storage** (left sidebar)
2. Click **New Bucket**
3. Name: `uploads`
4. Make it **Public**
5. Click **Create Bucket**

---

### **5. Reset Admin Password**

The default admin has been set to:

**Email:** `admin@regaliuslaw.com`  
**Password:** `kushalstar95`

If you need to reset it later:
1. Open `reset-admin-password.sql`
2. Copy the SQL
3. Run it in Supabase SQL Editor

---

### **6. Restart Your Development Server**

```bash
# Stop the server (Ctrl+C)
npm run dev
```

---

### **7. Login to Admin Panel**

1. Open your browser: `http://localhost:3000/admin/login`
2. Enter:
   - **Email:** `admin@regaliuslaw.com`
   - **Password:** `kushalstar95`
3. Click **Sign In**

---

## ✅ Checklist

- [ ] Created `.env.local` with Supabase credentials
- [ ] Ran `supabase-schema.sql` in Supabase SQL Editor
- [ ] Created `uploads` bucket in Supabase Storage (set to Public)
- [ ] Restarted dev server
- [ ] Can login with `admin@regaliuslaw.com` / `kushalstar95`

---

## 🆘 Still Having Issues?

Run the debug script:

```bash
node debug-admin-login.js
```

This will check:
- ✅ Environment variables are set
- ✅ Supabase connection works
- ✅ Admin user exists
- ✅ Password hash is correct

---

## 🚀 For Vercel Deployment

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these three variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `JWT_SECRET`
4. Redeploy your app

---

## 📝 Default Credentials

**Admin Login:**
- Email: `admin@regaliuslaw.com`
- Password: `kushalstar95`

**Change password:** Use `generate-password-hash.js` to create a new hash, then update in Supabase.

---

## 🔒 Security Notes

- `.env.local` is in `.gitignore` (never commit it!)
- The anon key is safe for frontend use (it respects RLS policies)
- Keep your JWT_SECRET private
- Change the default password after first login (in production)

---

**Need help?** Check `SUPABASE_SETUP.md` for detailed instructions.

