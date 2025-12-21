# Careers Page Implementation

## Overview
The Careers page has been successfully implemented and integrated with the admin panel. Job applications are submitted through the careers form and appear in the admin contacts panel.

## How It Works

### Frontend (Careers Page)
**Location:** `/app/careers/page.tsx`

**Features:**
1. **Hero Section** - Welcoming introduction
2. **Why Work With Us** - 4 key benefits
3. **What We Look For** - Detailed candidate requirements
4. **Application Form** with fields:
   - Full Name (required)
   - Email Address (required)
   - Phone Number (optional)
   - Position Applying For (required) - dropdown with options
   - Years of Experience (optional)
   - Cover Letter (required)
5. **Contact Information** - Alternative email for applications

**Form Submission:**
- When a user submits the careers form, it creates a contact submission with:
  - `inquiryType`: "Career Application - [Position Name]"
  - `message`: Contains position, experience, and cover letter
  - `status`: "new"
- Submissions are stored in `/data/contacts.json`

### Backend (API)
**Location:** `/app/api/contacts/route.ts`

- **POST endpoint** (public): Accepts career applications and contact forms
- **GET endpoint** (admin only): Retrieves all submissions for admin panel
- Uses the existing `db.contacts` operations from `/lib/db.ts`

### Admin Panel
**Location:** `/app/admin/contacts/page.tsx`

**Enhanced Features:**
1. **Header shows breakdown:**
   - Total submissions
   - Number of career applications
   - Number of regular contacts

2. **Career applications are highlighted:**
   - Inquiry type shows in gold color (#C6B27E)
   - Easy to distinguish from regular contacts

3. **Application details:**
   - Shows "Application Details" label instead of "Message"
   - Displays formatted application information including:
     - Position applied for
     - Years of experience
     - Cover letter

4. **Status management:**
   - Mark as Read
   - Mark as Responded
   - Delete application

## Testing the Feature

### To Test Career Applications:

1. **Submit an application:**
   - Visit `/careers`
   - Fill out the application form
   - Click "Submit Application"
   - You should see a success message

2. **View in admin panel:**
   - Login to admin panel at `/admin/login`
   - Navigate to "Contacts" or `/admin/contacts`
   - You should see the career application listed
   - Career applications will have "Career Application - [Position]" as the inquiry type
   - Career applications are highlighted in gold

3. **Manage applications:**
   - Click on a career application to view full details
   - Mark as read, responded, or delete as needed

## Data Storage

All career applications are stored in:
```
/data/contacts.json
```

Each application includes:
```json
{
  "id": "timestamp",
  "name": "Applicant Name",
  "email": "applicant@email.com",
  "phone": "+91 1234567890",
  "inquiryType": "Career Application - Associate Attorney",
  "message": "Position: Associate Attorney\nExperience: 5 years\n\nCover Letter:\n[Full cover letter text]",
  "status": "new",
  "createdAt": "2025-12-21T...",
  "updatedAt": "2025-12-21T..."
}
```

## Available Positions

The dropdown includes:
- Associate Attorney
- Senior Associate
- Partner
- Legal Intern
- Paralegal
- Legal Secretary
- Other

You can modify these options in `/app/careers/page.tsx` at line ~320.

## Navigation

The Careers link has been added to:
- `/components/navigation.tsx` - Main navigation component
- `/components/Navbar.tsx` - Alternative navbar component

It appears in both desktop and mobile navigation menus.

## Email Alternative

Users can also email applications directly to:
**careers@regaliuslaw.com**

This email is displayed:
- At the bottom of the application form
- In the "Have Questions?" section

## No Database Required

✅ All functionality works with JSON file storage
✅ No Supabase or external database needed
✅ All data persists in the `/data` directory

