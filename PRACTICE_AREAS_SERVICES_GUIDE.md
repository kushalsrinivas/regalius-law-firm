# Practice Areas & Services Implementation Guide

## Overview
I've successfully added two new sections to your admin panel: **Practice Areas** and **Services**. Both sections support full CRUD operations (Create, Read, Update, Delete) and have clickable detail pages just like your blog system.

## What Was Added

### 1. Database & Backend
- **Database Schema** (`lib/db.ts`)
  - Added `PracticeArea` interface with fields: title, slug, description, content, image, icon, status, order
  - Added `Service` interface with fields: title, slug, description, content, image, icon, category, features, status, order
  - Created full CRUD operations for both entities
  - Created JSON storage files: `practice-areas.json` and `services.json`

### 2. API Routes
- **Practice Areas API**
  - `GET /api/practice-areas` - List all active practice areas (public)
  - `GET /api/practice-areas?includeInactive=true` - List all (admin only)
  - `POST /api/practice-areas` - Create new practice area (admin only)
  - `GET /api/practice-areas/[id]` - Get single practice area
  - `PATCH /api/practice-areas/[id]` - Update practice area (admin only)
  - `DELETE /api/practice-areas/[id]` - Delete practice area (admin only)

- **Services API**
  - `GET /api/services` - List all active services (public)
  - `GET /api/services?includeInactive=true` - List all (admin only)
  - `POST /api/services` - Create new service (admin only)
  - `GET /api/services/[id]` - Get single service
  - `PATCH /api/services/[id]` - Update service (admin only)
  - `DELETE /api/services/[id]` - Delete service (admin only)

### 3. Admin Pages

#### Practice Areas Management
- **List Page**: `/admin/practice-areas`
  - View all practice areas with cards showing image, title, description
  - Filter by status (all, active, inactive)
  - Create, edit, and delete practice areas
  - Displays order number for each practice area

- **Editor Page**: `/admin/practice-areas/new` or `/admin/practice-areas/[id]`
  - Title, description, and detailed content fields
  - Image upload functionality
  - Optional icon field
  - Display order (lower numbers appear first)
  - Status toggle (active/inactive)
  - Save as inactive or publish as active

#### Services Management
- **List Page**: `/admin/services`
  - View all services with cards showing image, title, category, description
  - Filter by status (all, active, inactive)
  - Create, edit, and delete services
  - Displays category and order number

- **Editor Page**: `/admin/services/new` or `/admin/services/[id]`
  - Title, description, and detailed content fields
  - Image upload functionality
  - Category dropdown (Legal Services, Corporate Services, etc.)
  - Key Features list (add/remove features dynamically)
  - Optional icon field
  - Display order
  - Status toggle (active/inactive)
  - Save as inactive or publish as active

### 4. Public Detail Pages

#### Practice Area Details
- **Route**: `/practice-areas/[slug]`
- Features:
  - Full-width hero image with overlay
  - Practice area title and description
  - Complete content display
  - Call-to-action section with links to contact and attorneys pages
  - Responsive design matching your site's aesthetic

#### Service Details
- **Route**: `/service-details/[slug]`
- Features:
  - Full-width hero image with overlay
  - Service title, category, and description
  - Complete content display
  - Key Features section with checkmark icons
  - Call-to-action section with links to contact and attorneys pages
  - Responsive design matching your site's aesthetic

### 5. Home Page Integration
- Practice Areas section now dynamically loads from the database
- Cards are clickable and link to detail pages (`/practice-areas/[slug]`)
- Displays first 3 practice areas
- Fallback to static content if API fails (maintains current appearance)

### 6. Admin Dashboard Updates
- Added two new stat cards:
  - **Practice Areas**: Shows total count and active count
  - **Services**: Shows total count and active count
- Added quick action buttons:
  - "Add Practice Area" → `/admin/practice-areas/new`
  - "Add Service" → `/admin/services/new`
- Dashboard grid expanded from 4 to 5 columns to accommodate new stats

## How to Use

### Adding a Practice Area
1. Go to Admin Dashboard → Practice Areas (or `/admin/practice-areas`)
2. Click "Create New Practice Area"
3. Fill in:
   - **Title**: Name of the practice area (e.g., "Corporate Law")
   - **Description**: Brief summary shown on cards
   - **Content**: Detailed information about the practice area
   - **Image**: Upload a featured image
   - **Icon** (optional): Icon name or URL
   - **Order**: Number for display order (1 appears first)
4. Click "Save as Inactive" (draft) or "Publish (Active)"

### Adding a Service
1. Go to Admin Dashboard → Services (or `/admin/services`)
2. Click "Create New Service"
3. Fill in:
   - **Title**: Name of the service
   - **Description**: Brief summary shown on cards
   - **Content**: Detailed information about the service
   - **Image**: Upload a featured image
   - **Category**: Select from dropdown
   - **Key Features**: Add bullet points highlighting service features
   - **Icon** (optional): Icon name or URL
   - **Order**: Number for display order
4. Click "Save as Inactive" (draft) or "Publish (Active)"

### Viewing on Website
- **Practice Areas**: 
  - Home page shows top 3 practice areas
  - Click any card to view full details at `/practice-areas/[slug]`
  
- **Services**: 
  - You can link to services from your services page
  - Detail pages available at `/service-details/[slug]`

## Features Matching Blog System

Just like your blog system, both Practice Areas and Services include:
- ✅ Admin CRUD interface
- ✅ Image upload support
- ✅ Rich content editor
- ✅ Draft/Published status
- ✅ Clickable cards in admin
- ✅ Public detail pages with full content
- ✅ Responsive design
- ✅ Beautiful hero images
- ✅ Call-to-action sections
- ✅ Breadcrumb navigation
- ✅ Automatic slug generation from title

## Technical Details

### Slug Generation
- Automatically generated from title
- Lowercase with hyphens (e.g., "Corporate Law" → "corporate-law")
- Used for clean URLs

### Display Order
- Both entities have an `order` field
- Lower numbers appear first
- Allows you to control the display sequence

### Status Management
- **Active**: Visible to the public
- **Inactive**: Hidden from public, visible only in admin panel

### Image Handling
- Uses your existing upload API (`/api/upload`)
- Stores images in `/public/uploads/`
- Supports all common image formats

## Next Steps

1. **Add Initial Content**: Create your first practice areas and services through the admin panel
2. **Update Services Page**: Link your `/services` page to the new service detail pages
3. **Customize Categories**: Edit the categories array in `/app/admin/services/[id]/page.tsx` if needed
4. **Test Navigation**: Click through from home page → practice area detail → contact form

## Files Created/Modified

### New Files
- `lib/db.ts` (modified - added interfaces and operations)
- `app/api/practice-areas/route.ts`
- `app/api/practice-areas/[id]/route.ts`
- `app/api/services/route.ts`
- `app/api/services/[id]/route.ts`
- `app/admin/practice-areas/page.tsx`
- `app/admin/practice-areas/[id]/page.tsx`
- `app/admin/services/page.tsx`
- `app/admin/services/[id]/page.tsx`
- `app/practice-areas/[slug]/page.tsx`
- `app/service-details/[slug]/page.tsx`
- `data/practice-areas.json`
- `data/services.json`

### Modified Files
- `app/page.tsx` (home page - dynamic practice areas)
- `app/admin/dashboard/page.tsx` (added new stats and actions)

## Support

The implementation follows the same patterns as your blog system, so everything should be familiar. All admin pages are protected by your existing authentication system.

Enjoy managing your practice areas and services! 🎉

