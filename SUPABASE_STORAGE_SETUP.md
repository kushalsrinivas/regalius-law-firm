# Supabase Storage Setup for Images 📸

## Overview

Images are now stored in **Supabase Storage** instead of the local filesystem, making the app fully compatible with Vercel's serverless environment.

## ✅ What's Been Configured

### 1. **Supabase Client** (`lib/supabase.ts`)
   - Created a server-side Supabase client with service role key
   - Configured for the `uploads` bucket

### 2. **Upload API Route** (`app/api/upload/route.ts`)
   - ✅ Uploads files directly to Supabase Storage
   - ✅ Validates file types (JPEG, PNG, WebP, GIF)
   - ✅ Validates file size (max 5MB)
   - ✅ Returns public URL for uploaded images
   - ✅ Requires admin authentication

### 3. **Environment Variables**
   Already configured in your `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://ojuitpycfsncxwebzxus.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## 🔧 Supabase Storage Bucket Setup

You need to ensure the `uploads` bucket exists and is properly configured:

### Step 1: Create the Bucket (if not exists)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `ojuitpycfsncxwebzxus`
3. Navigate to **Storage** in the left sidebar
4. Click **"New bucket"**
5. Set bucket name: `uploads`
6. **Make it PUBLIC** (check the "Public bucket" option)
7. Click **Create bucket**

### Step 2: Set Storage Policies

Run this SQL in your Supabase SQL Editor to allow public access:

```sql
-- Allow public read access to uploads bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');

-- Or if you want to allow uploads with service role only (more secure)
CREATE POLICY "Service role can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'uploads');
```

### Step 3: Configure CORS (if needed)

If you're uploading from the browser directly (not through API), add your domain to allowed origins:

1. Go to **Storage** → **Policies** → **Configuration**
2. Add your domain to allowed origins

## 📝 How It Works

### Upload Flow

1. Admin logs in and goes to any admin page (attorneys, blogs, etc.)
2. Clicks "Upload Image" or similar
3. Selects a file
4. File is sent to `/api/upload`
5. API validates the file
6. File is uploaded to Supabase Storage bucket `uploads`
7. Public URL is returned (e.g., `https://ojuitpycfsncxwebzxus.supabase.co/storage/v1/object/public/uploads/1234567890.jpg`)
8. URL is saved in the database (in-memory for now)

### Example Upload Response

```json
{
  "success": true,
  "url": "https://ojuitpycfsncxwebzxus.supabase.co/storage/v1/object/public/uploads/1766234845825.jpeg",
  "filename": "1766234845825.jpeg"
}
```

## 🚀 Deploying to Vercel

### 1. Add Environment Variables to Vercel

Go to your Vercel project settings → Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://ojuitpycfsncxwebzxus.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdWl0cHljZnNuY3h3ZWJ6eHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMTUyNTEsImV4cCI6MjA4MDY5MTI1MX0.G2LvE4oMbL4O7up3uFfD_7OjNZ3uvsd9H62J0iYOGqA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdWl0cHljZnNuY3h3ZWJ6eHVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTExNTI1MSwiZXhwIjoyMDgwNjkxMjUxfQ._UOGX1n2ArYfbJhmHz-dnl76KUNX3vpsenetP8mO7iI
JWT_SECRET=kadgssgfaugdadfgsyuy
```

⚠️ **Important**: Add these to all environments (Production, Preview, Development)

### 2. Deploy

```bash
vercel --prod
```

Or push to your connected Git repository.

## 🔍 Testing Locally

### 1. Start the dev server:
```bash
npm run dev
```

### 2. Test upload:
- Go to http://localhost:3000/admin/login
- Login with admin credentials
- Go to any admin section (attorneys, blogs, etc.)
- Try uploading an image
- Check that the image URL starts with your Supabase URL

## 📦 Existing Images

Your existing images in `/public/uploads/` will still work locally, but they won't be available on Vercel. You have two options:

### Option 1: Upload Existing Images to Supabase

Run this script to migrate existing images:

```bash
node migrate-images-to-supabase.js
```

(You'll need to create this script if you want to migrate)

### Option 2: Update Image References

Manually re-upload images through the admin panel and update the references.

## 🎯 Benefits

✅ **Vercel Compatible** - No filesystem writes needed
✅ **Scalable** - Supabase handles storage and CDN
✅ **Persistent** - Images survive deployments and restarts
✅ **Fast** - CDN-backed delivery
✅ **Secure** - Service role authentication for uploads

## 🐛 Troubleshooting

### "Failed to upload file to storage"

1. Check that the `uploads` bucket exists in Supabase
2. Verify the bucket is public
3. Check storage policies allow uploads
4. Verify environment variables are set correctly

### "Missing Supabase environment variables"

1. Ensure `.env.local` exists with all required variables
2. For Vercel, check environment variables in project settings
3. Restart the dev server after adding variables

### Images not loading

1. Check that the bucket is public
2. Verify the URL format is correct
3. Check browser console for CORS errors
4. Ensure storage policies allow public reads

## 📚 Additional Resources

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Storage Policies Guide](https://supabase.com/docs/guides/storage/security/access-control)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

