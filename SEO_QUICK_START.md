# ⚡ SEO QUICK START CHECKLIST
## Get Your Site Ranking in 30 Days

---

## 🚨 BEFORE YOU LAUNCH (Critical - Do First!)

### Update Business Information
**File:** `lib/seo.ts`

1. [ ] Replace phone number:
   ```typescript
   phone: "+91-XXXXXXXXXX",  // Line 13
   ```

2. [ ] Update office address:
   ```typescript
   address: {
     streetAddress: "Your complete office address",  // Line 18
     addressLocality: "Bangalore",
     addressRegion: "Karnataka",
     postalCode: "560001",  // Update this
   }
   ```

3. [ ] Add geo-coordinates (Google Maps → Right click office → Copy coordinates):
   ```typescript
   geo: {
     latitude: "12.9716",    // Line 27 - Update
     longitude: "77.5946"    // Line 28 - Update
   }
   ```

4. [ ] Update social media links (if you have them):
   ```typescript
   social: {
     linkedin: "https://www.linkedin.com/company/regalius-law-partners",
     twitter: "https://twitter.com/regaliuslaw",
   }
   ```

---

## 📸 CREATE OG IMAGE (Social Media Preview)

**Task:** Create `/public/og-image.jpg`

**Specifications:**
- Size: 1200px × 630px
- Format: JPG (optimized)
- Content: Firm name + tagline + professional imagery

**Quick Tools:**
- Canva.com (free templates)
- Figma (free)
- Adobe Express (free)

**Template Suggestion:**
```
┌─────────────────────────────────────────┐
│                                         │
│     REGALIUS LAW PARTNERS               │
│                                         │
│     High Court Advocates in Bangalore   │
│     Civil & Commercial Litigation       │
│                                         │
│     [Professional law office image]     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔍 WEEK 1: GOOGLE SEARCH CONSOLE

### Day 1: Set Up GSC

1. [ ] Go to https://search.google.com/search-console
2. [ ] Add property: `https://regaliuslawpartners.com`
3. [ ] Choose verification method (Recommended: HTML tag)
4. [ ] Copy verification code
5. [ ] Update `app/layout.tsx` line 38:
   ```typescript
   verification: {
     google: 'paste-your-code-here',
   },
   ```
6. [ ] Deploy site
7. [ ] Click "Verify" in GSC

### Day 2: Submit Sitemap

1. [ ] In GSC, go to "Sitemaps" (left menu)
2. [ ] Enter: `sitemap.xml`
3. [ ] Click "Submit"
4. [ ] Wait 24-48 hours for indexing to begin

### Day 3: Check Indexing

1. [ ] In GSC, go to "Coverage" or "Pages"
2. [ ] Check which pages are indexed
3. [ ] Fix any errors if shown

---

## 📍 WEEK 1: GOOGLE BUSINESS PROFILE

### Day 4: Claim/Create Profile

1. [ ] Go to https://business.google.com
2. [ ] Search "Regalius Law Partners Bangalore"
3. [ ] If exists → Claim it | If not → Create new
4. [ ] Complete verification (phone/postcard/email)

### Day 5: Complete Profile (100%)

1. [ ] Business name: `Regalius Law Partners`
2. [ ] Primary category: `Attorney` or `Law Firm`
3. [ ] Add address (exact location)
4. [ ] Add phone number
5. [ ] Add website: `https://regaliuslawpartners.com`
6. [ ] Add email: `office.blr@regaliuslawpartners.com`
7. [ ] Set business hours:
   ```
   Mon-Fri: 9:00 AM - 6:00 PM
   Sat: 10:00 AM - 2:00 PM
   Sun: Closed
   ```

### Day 6: Add Services

Add all 6 services (copy from `GOOGLE_BUSINESS_PROFILE_GUIDE.md`):
1. [ ] Civil Litigation
2. [ ] Commercial Litigation
3. [ ] Arbitration & Dispute Resolution
4. [ ] High Court Representation
5. [ ] Commercial Legal Advisory
6. [ ] Contract Dispute Resolution

### Day 7: Upload Photos

Upload minimum 10 photos:
- [ ] 1 Logo (profile photo)
- [ ] 1 Cover photo
- [ ] 3 Office exterior photos
- [ ] 3 Office interior photos
- [ ] 2 Team/attorney photos

---

## 📝 WEEK 2: FIRST CONTENT

### Day 8-10: First Blog Post

**Topic:** "How to File a Civil Suit in Karnataka High Court"
(Full outline in `CONTENT_CALENDAR.md`)

1. [ ] Write 1,500-2,000 words
2. [ ] Include primary keyword in H1
3. [ ] Add internal links (3-5)
4. [ ] Add images with alt text
5. [ ] Write meta title & description
6. [ ] Publish on website

### Day 11-12: Second Blog Post

**Topic:** "Commercial Courts Act 2015: What Businesses Need to Know"

1. [ ] Write 1,500-2,000 words
2. [ ] SEO optimize
3. [ ] Publish

### Day 13-14: GBP Posts

Create first 2 Google Business Profile posts:
1. [ ] Post 1: "Expert Civil Litigation Services" (highlight practice area)
2. [ ] Post 2: Share first blog post

---

## ⭐ WEEK 3: REVIEWS & SOCIAL

### Day 15-17: Request Reviews

1. [ ] Identify 5 satisfied clients
2. [ ] Send review request email (template in `GOOGLE_BUSINESS_PROFILE_GUIDE.md`)
3. [ ] Include direct GBP review link
4. [ ] Goal: Get 2-3 initial reviews

### Day 18-19: Social Media Setup

1. [ ] Create LinkedIn Company Page
2. [ ] Create Twitter profile (optional)
3. [ ] Add social links to website footer
4. [ ] Share both blog posts on LinkedIn

### Day 20-21: FAQs

Add 10 FAQs to homepage with FAQ schema:
(Examples in practice area pages)

Common questions:
- What types of civil cases do you handle?
- Do you represent clients in Commercial Courts?
- What is your experience in Karnataka High Court?
- How much do you charge for consultation?
- Etc.

---

## 🔗 WEEK 4: DIRECTORIES & BACKLINKS

### Day 22-24: Legal Directories

Submit to these directories:
1. [ ] JustisDoor (https://justisdoor.com)
2. [ ] LawRato (https://lawrato.com)
3. [ ] Lawyered (https://lawyered.in)
4. [ ] Bar Council of Karnataka website
5. [ ] Google My Business (already done)

### Day 25-26: Local Citations

Ensure consistent NAP (Name, Address, Phone) on:
1. [ ] Facebook Business Page
2. [ ] LinkedIn Company Page
3. [ ] Yelp (if applicable)
4. [ ] Local business directories

### Day 27-28: Content Outreach

1. [ ] Share blog posts in legal forums
2. [ ] Submit to legal news aggregators
3. [ ] Email to local bar associations
4. [ ] Share on relevant LinkedIn groups

---

## 📊 WEEK 4: ANALYTICS & MONITORING

### Day 29: Set Up Analytics

1. [ ] Google Analytics 4
   - Create GA4 property
   - Add tracking code to website
   - Set up goals (contact form submission)

2. [ ] Google Tag Manager (optional but recommended)
   - Set up container
   - Add GA4 through GTM

### Day 30: Baseline Metrics

Record starting metrics:
1. [ ] Keyword rankings (use GSC or Ahrefs)
2. [ ] Organic traffic (GA4)
3. [ ] GBP views/actions
4. [ ] Indexed pages (GSC)
5. [ ] Domain authority (Ahrefs/SEMrush)

---

## 🎯 30-DAY COMPLETION CHECKLIST

By day 30, you should have:
- [x] All business info updated in code
- [x] OG image created
- [x] Google Search Console verified & sitemap submitted
- [x] Google Business Profile 100% complete
- [x] 10+ photos on GBP
- [x] 6 services listed on GBP
- [x] 2 blog posts published (1,500+ words each)
- [x] 2 GBP posts published
- [x] 2-3 client reviews on Google
- [x] Social media profiles created
- [x] 10 FAQs on homepage
- [x] Listed in 5+ legal directories
- [x] Google Analytics set up
- [x] Baseline metrics recorded

---

## 📅 ONGOING (After Day 30)

### Weekly Tasks:
- [ ] 1 blog post (follow `CONTENT_CALENDAR.md`)
- [ ] 1 GBP post
- [ ] Respond to any reviews within 24 hours
- [ ] Upload 2-3 new photos to GBP
- [ ] Check GSC for indexing issues

### Monthly Tasks:
- [ ] Review analytics (traffic, rankings, conversions)
- [ ] Request 2-3 new client reviews
- [ ] Update GBP business hours (holidays)
- [ ] Submit site to 2-3 new directories
- [ ] Guest post/backlink outreach

---

## 🚀 IMMEDIATE PRIORITY (Do TODAY)

1. [ ] Update phone, address, geo-coordinates in `lib/seo.ts`
2. [ ] Create og-image.jpg
3. [ ] Set up Google Search Console
4. [ ] Claim Google Business Profile

These 4 items are CRITICAL and should be done immediately.

---

## 💡 PRO TIPS

### Don't:
- ❌ Rush through setup - quality matters
- ❌ Skip Google Business Profile - it's critical for local SEO
- ❌ Publish thin content (< 1,000 words)
- ❌ Buy backlinks or reviews
- ❌ Keyword stuff

### Do:
- ✅ Be consistent (weekly content is better than monthly bulk)
- ✅ Focus on quality over quantity
- ✅ Engage with reviews and comments
- ✅ Monitor metrics and adjust strategy
- ✅ Be patient - SEO takes 3-6 months

---

## 📞 QUICK REFERENCE

**Main Docs:**
- Full implementation details → `SEO_IMPLEMENTATION.md`
- GBP optimization → `GOOGLE_BUSINESS_PROFILE_GUIDE.md`
- Content strategy → `CONTENT_CALENDAR.md`
- Complete summary → `SEO_SUMMARY.md`

**Files to Update:**
- Business info → `lib/seo.ts`
- GSC verification → `app/layout.tsx`
- OG image → `/public/og-image.jpg`

---

## ✅ CHECKLIST PROGRESS

Print this out or keep it handy. Check off items as you complete them.

**Goal:** Complete all Week 1-4 tasks within 30 days of launch.

**Expected Result After 30 Days:**
- Site indexed by Google
- Initial keyword rankings appearing
- Google Business Profile generating views
- 2-3 client reviews
- Foundation for long-term SEO success

---

**START NOW! The sooner you begin, the sooner you'll see results. 🚀**

**First 3 tasks (right now):**
1. Open `lib/seo.ts` and update your business information
2. Create og-image.jpg using Canva
3. Go to Google Search Console and start setup

**You've got this! 💪**

