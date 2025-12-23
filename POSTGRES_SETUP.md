# PostgreSQL + Drizzle ORM Setup Guide

## Overview
The application now uses PostgreSQL with Drizzle ORM for persistent data storage, replacing the previous in-memory JSON storage.

## Prerequisites
- Supabase account and project
- Node.js and npm installed

## Environment Variables Setup

Add the following to your `.env.local` file:

```bash
POSTGRES_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres
```

### How to Get Your PostgreSQL Connection String

1. Go to [Supabase Dashboard](https://supabase.com)
2. Open your project
3. Navigate to **Settings** → **Database**
4. Scroll to **Connection String** section
5. Select **Transaction** mode (recommended for serverless)
6. Copy the connection string
7. Replace `[YOUR-PASSWORD]` with your actual database password

## Database Migration

### Initial Setup

1. **Generate migration files** (creates SQL files from schema):
   ```bash
   npm run db:generate
   ```

2. **Apply migrations** (runs SQL against your database):
   ```bash
   npm run db:migrate
   ```

3. **Seed initial data** (adds default admin, FAQs, etc.):
   ```bash
   npm run db:seed
   ```

### Development Workflow

After changing schema in `lib/schema.ts`:

1. Generate new migration:
   ```bash
   npm run db:generate
   ```

2. Review the generated SQL in `drizzle/` folder

3. Apply the migration:
   ```bash
   npm run db:migrate
   ```

### Alternative: Push Schema (Dev Only)

For rapid development, you can push schema changes directly without migrations:

```bash
npm run db:push
```

⚠️ **Warning**: This bypasses migration files. Only use in development.

## Drizzle Studio

View and edit your database data with a GUI:

```bash
npm run db:studio
```

This opens a web interface at `https://local.drizzle.studio`

## Database Schema

### Tables

- **admins** - Admin user accounts
- **attorneys** - Law firm attorneys
- **blogs** - Blog posts
- **contacts** - Contact form submissions
- **practice_areas** - Practice area pages
- **services** - Service offerings
- **faqs** - Frequently asked questions

### Key Features

- **Auto-incrementing IDs** - Using `serial` type instead of timestamp strings
- **JSONB columns** - For array data (education, practice areas, features, etc.)
- **Enums** - Type-safe status fields
- **Unique constraints** - Slugs are unique across tables
- **Timestamps** - Automatic `created_at` and `updated_at` tracking
- **Indexes** - On slug fields for fast lookups

## TypeScript Types

All database types are automatically inferred from the schema:

```typescript
import { type Attorney, type Blog, type Contact } from '@/lib/schema';

// Use in your code with full type safety
const attorney: Attorney = await db.query.attorneys.findFirst();
```

## Troubleshooting

### Connection Issues

**Error**: "POSTGRES_URL environment variable is not set"
- Check that `.env.local` exists and contains `POSTGRES_URL`
- Restart your dev server after adding environment variables

**Error**: "Connection refused" or "timeout"
- Verify your Supabase project is active
- Check that you're using the correct connection string
- Ensure your password is correct (no special characters need escaping in the URL)

### Migration Issues

**Error**: "No migration files found"
- Run `npm run db:generate` first to create migrations

**Error**: "relation already exists"
- Your tables already exist. Either:
  - Drop the tables manually in Supabase SQL Editor
  - Or use `db:push` to sync schema directly

### Schema Changes

If you make breaking changes to the schema:

1. Generate new migration: `npm run db:generate`
2. Review the SQL - Drizzle may create DROP statements
3. Backup your data if needed
4. Apply migration: `npm run db:migrate`

## Production Deployment

### Vercel

1. Add `POSTGRES_URL` to your Vercel project environment variables
2. Deploy - migrations run automatically during build
3. After first deploy, run seed script manually if needed

### Environment Variables Required

```
POSTGRES_URL=postgresql://postgres:password@host:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
JWT_SECRET=your-secret-key
```

## Migration from Old System

The old in-memory storage has been replaced. Data does not automatically migrate.

If you had important data in the old system:
1. Export it from `lib/initial-data.ts`
2. Add it to the seed script in `lib/seed.ts`
3. Run `npm run db:seed`

## Support

For issues or questions:
- Check Drizzle ORM docs: https://orm.drizzle.team/
- Supabase PostgreSQL docs: https://supabase.com/docs/guides/database
- Create an issue in the project repository

