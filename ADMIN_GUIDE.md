# Regalius Law Partners - Admin Panel Documentation

## 🎉 Complete Admin System Implementation

A comprehensive admin panel has been successfully integrated into the Regalius Law Partners website with full authentication, content management, and database functionality.

---

## 📋 Features Implemented

### 1. **Admin Authentication System**
- Secure JWT-based authentication with httpOnly cookies
- Password hashing with bcrypt
- Session management and protected routes
- Login/logout functionality

### 2. **Contact Form Management**
- Public contact form submission API
- Admin dashboard to view all contact requests
- Status tracking (new, read, responded)
- Admin notes functionality
- Delete and update capabilities

### 3. **Blog Management System (Renamed from News)**
- Full CRUD operations for blog posts
- Rich blog editor with:
  - Title, excerpt, and content fields
  - Thumbnail image upload
  - Category selection
  - Author attribution
  - Draft/Published status
  - Automatic read time calculation
- Public blog display page with dynamic content
- Featured blog highlighting
- Responsive grid layout

### 4. **Image Upload System**
- Secure file upload API
- Type and size validation (max 5MB)
- Support for JPEG, PNG, WebP, GIF
- Automatic thumbnail storage in `/public/uploads`

---

## 🚀 Quick Start Guide

### Default Admin Credentials
```
Email: admin@regaliuslaw.com
Password: Admin@123
```

### Accessing the Admin Panel

1. **Login Page**: Navigate to `/admin/login`
2. **Dashboard**: After login, you'll see `/admin/dashboard` with statistics
3. **Contact Management**: `/admin/contacts` - View and manage contact submissions
4. **Blog Management**: `/admin/blogs` - Create, edit, and publish blog posts

---

## 📂 Project Structure

```
/lib
  ├── db.ts              # JSON database operations
  ├── auth.ts            # Authentication & JWT utilities

/app/api
  ├── admin/
  │   ├── login/         # Admin login endpoint
  │   ├── logout/        # Admin logout endpoint
  │   └── session/       # Session verification
  ├── contacts/
  │   ├── route.ts       # GET all contacts, POST new contact
  │   └── [id]/          # PATCH update, DELETE contact
  ├── blogs/
  │   ├── route.ts       # GET published blogs, POST new blog
  │   └── [id]/          # GET/PATCH/DELETE single blog
  └── upload/            # Image upload endpoint

/app/admin
  ├── layout.tsx         # Admin layout with sidebar & auth check
  ├── login/             # Login page
  ├── dashboard/         # Admin dashboard
  ├── contacts/          # Contact management page
  └── blogs/
      ├── page.tsx       # Blog list
      └── [id]/          # Blog editor (new & edit)

/data                    # JSON database storage (auto-created)
  ├── admin.json         # Admin users
  ├── contacts.json      # Contact submissions
  └── blogs.json         # Blog posts

/public/uploads          # Uploaded images (auto-created)
```

---

## 🔒 Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Sessions**: Signed tokens with expiration (7 days)
3. **HTTP-only Cookies**: Prevents XSS attacks
4. **Protected Routes**: Middleware checks authentication
5. **Input Validation**: Zod schemas for all API inputs
6. **File Upload Validation**: Type, size, and extension checks

---

## 📡 API Endpoints

### Public Endpoints
- `POST /api/contacts` - Submit contact form
- `GET /api/blogs` - Get published blogs

### Admin-Only Endpoints (Requires Authentication)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/session` - Check session status
- `GET /api/contacts` - Get all contact submissions
- `PATCH /api/contacts/[id]` - Update contact status/notes
- `DELETE /api/contacts/[id]` - Delete contact
- `GET /api/blogs?includeDrafts=true` - Get all blogs (including drafts)
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/[id]` - Get single blog
- `PATCH /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog
- `POST /api/upload` - Upload image

---

## 🎨 UI/UX Features

### Admin Dashboard
- Statistics overview (contacts, blogs)
- Quick action buttons
- Responsive sidebar navigation
- Mobile-friendly with hamburger menu

### Contact Management
- Three-column layout (list, detail, actions)
- Status badges (new, read, responded)
- Inline admin notes
- Delete confirmation

### Blog Editor
- Two-column layout (editor, sidebar)
- Live word count and read time
- Drag-and-drop image upload
- Draft/publish workflow
- Category selection
- Mobile-responsive

### Public Blog Page
- Hero section with featured blog
- Grid layout for additional blogs
- Category badges
- Read time indicators
- Newsletter signup section

---

## 🔄 Workflow Examples

### Creating a Blog Post
1. Navigate to `/admin/blogs`
2. Click "Create New Post"
3. Fill in title, excerpt, and content
4. Upload a thumbnail image
5. Select category and author
6. Save as draft or publish immediately

### Managing Contact Requests
1. Go to `/admin/contacts`
2. Click on a contact to view details
3. Mark as "Read" or "Responded"
4. Add admin notes if needed
5. Delete when no longer needed

---

## 📊 Database Schema

### Contact Submission
```typescript
{
  id: string;
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Blog Post
```typescript
{
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  readTime: string;
}
```

---

## 🛠️ Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Authentication**: jose (JWT), bcryptjs
- **Validation**: Zod
- **UI**: React, Framer Motion, Tailwind CSS
- **Database**: JSON file-based storage
- **Image Storage**: Local filesystem

---

## 📝 Notes for Production

1. **Change Default Password**: Update admin credentials immediately
2. **Environment Variables**: Add `JWT_SECRET` to `.env`
3. **Database**: Consider migrating to PostgreSQL/MongoDB for scale
4. **Image CDN**: Use Cloudinary/AWS S3 for production images
5. **Email Notifications**: Add email alerts for new contact submissions
6. **Backups**: Implement regular backups of `/data` folder

---

## 🐛 Troubleshooting

### "Unauthorized" on Admin Pages
- Check if you're logged in: `/admin/login`
- Clear cookies and log in again

### Images Not Uploading
- Check `/public/uploads` folder exists
- Verify file size < 5MB
- Ensure file type is JPEG/PNG/WebP/GIF

### Contact Form Not Submitting
- Check browser console for errors
- Verify API is running on correct port
- Test API directly: `POST /api/contacts`

---

## 🎯 Future Enhancements

- [ ] Email notifications for new contacts
- [ ] Rich text editor (TinyMCE/Quill)
- [ ] Blog categories management
- [ ] User roles (editor, admin, super-admin)
- [ ] Analytics dashboard
- [ ] SEO optimization for blogs
- [ ] Social sharing for blog posts
- [ ] Comments system for blogs

---

## ✅ Testing Checklist

- [x] Admin login with correct credentials
- [x] Admin login fails with wrong credentials
- [x] Session persists across page refreshes
- [x] Logout clears session
- [x] Contact form submission (public)
- [x] Contact list displays all submissions
- [x] Contact status updates (new → read → responded)
- [x] Contact deletion with confirmation
- [x] Blog creation (draft)
- [x] Blog creation (published)
- [x] Blog editing
- [x] Blog deletion
- [x] Image upload (< 5MB)
- [x] Image upload fails (> 5MB)
- [x] Public blog page shows only published blogs
- [x] Admin blog page shows drafts and published
- [x] Mobile responsive navigation
- [x] Mobile responsive forms

---

## 📞 Support

For issues or questions, contact the development team or refer to the Next.js and React documentation.

**Admin Panel Version**: 1.0.0  
**Last Updated**: December 2024

