# Quick Start - PostgreSQL Setup

## 🚀 Get Started in 3 Steps

### Step 1: Add Database Connection

Add this line to your `.env.local` file:

```bash
POSTGRES_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres
```

**Get your connection string from Supabase:**
1. Go to https://supabase.com → Your Project
2. Settings → Database → Connection String
3. Select "Transaction" mode
4. Copy and replace `[YOUR-PASSWORD]`

### Step 2: Run Migrations

```bash
npm run db:migrate
```

This creates all database tables.

### Step 3: Seed Data

```bash
npm run db:seed
```

This adds the default admin user and initial content.

## 🎉 Done!

**Admin Login:**
- URL: http://localhost:3000/admin/login
- Email: `admin@regaliuslaw.com`
- Password: `admin123`

⚠️ Change the password after first login!

## 📚 Useful Commands

```bash
# View database in browser GUI
npm run db:studio

# After changing schema
npm run db:generate  # Create migration
npm run db:migrate   # Apply migration
```

## 📖 Full Documentation

- `POSTGRES_SETUP.md` - Complete setup guide
- `MIGRATION_COMPLETE.md` - What changed in the migration

## ❓ Troubleshooting

**No data showing?**
```bash
npm run db:seed
```

**Tables don't exist?**
```bash
npm run db:migrate
```

**Connection errors?**
- Check `POSTGRES_URL` in `.env.local`
- Verify Supabase project is active
- Restart dev server: `npm run dev`

