# 🌸 Wedding Invite — Complete Setup Guide
### From zero to live in under 30 minutes

---

## What You'll Need
- A computer (Mac, Windows, or Linux)
- An internet connection
- About 30 minutes

No prior experience required. Every step is explained in plain language.

---

## Overview of What We're Building

```
Your Computer  →  GitHub  →  Vercel (free hosting)
                               ↕
                          Supabase (free database)
```

- **Vercel** = where your website lives (free, no credit card)
- **Supabase** = where your guest data is stored (free, no credit card)
- **GitHub** = connects your code to Vercel (free)

---

# PART 1 — Install Tools on Your Computer

## Step 1: Install Node.js

Node.js lets you run the project on your computer before publishing it.

1. Go to **https://nodejs.org**
2. Click the big green **"LTS"** button (not "Current")
3. Download and run the installer
4. Click "Next" through all the steps, keep all defaults
5. Click "Finish"

**Verify it worked** — open Terminal (Mac) or Command Prompt (Windows) and type:
```bash
node --version
```
You should see something like `v20.11.0`. If you do, Node.js is installed. ✅

## Step 2: Install Git

Git lets you save and upload your code.

**Mac:** Git is usually already installed. Check with:
```bash
git --version
```
If not, download from **https://git-scm.com/download/mac**

**Windows:** Download from **https://git-scm.com/download/win**  
During install, keep all defaults and click "Next" through everything.

---

# PART 2 — Set Up Supabase (Your Database)

Supabase stores all your guest RSVP data.

## Step 3: Create a Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with GitHub or email (GitHub is easier)
4. Confirm your email if prompted

## Step 4: Create a New Project

1. Once logged in, click **"New project"**
2. Fill in:
   - **Name:** `wedding-invite` (or anything you like)
   - **Database Password:** Create a strong password — **write this down somewhere!**
   - **Region:** Choose the closest to you
3. Click **"Create new project"**
4. Wait about 2 minutes while it sets up (you'll see a loading screen)

## Step 5: Run the Database Schema

This creates all the tables your app needs.

1. In your Supabase dashboard, look at the left sidebar
2. Click **"SQL Editor"** (it looks like `<>`)
3. Click **"New query"** at the top
4. Copy and paste the **entire contents** of the file `supabase/schema.sql` from this project
5. Click the green **"Run"** button (or press Ctrl+Enter / Cmd+Enter)
6. You should see: `Success. No rows returned` ✅

**Screenshot of what to look for:**  
Left sidebar → SQL Editor → New query → paste → Run

## Step 6: Get Your API Keys

1. In the left sidebar, click **"Project Settings"** (the gear icon at the bottom)
2. Click **"API"** in the settings menu
3. You'll see two important values — **copy them both**:

   - **Project URL** — looks like: `https://abcdefghijklm.supabase.co`
   - **anon / public key** — a long string starting with `eyJ...`

Keep this browser tab open, you'll need these values soon.

---

# PART 3 — Get the Code on Your Computer

## Step 7: Download This Project

Open your Terminal (Mac) or Command Prompt (Windows).

**On Mac:** Press `Cmd + Space`, type "Terminal", press Enter  
**On Windows:** Press `Windows key`, type "cmd", press Enter

Now type these commands one at a time, pressing Enter after each:

```bash
cd Desktop
```
*(This moves you to your Desktop so the project folder is easy to find)*

If you received this project as a ZIP file:
1. Unzip it on your Desktop
2. It will create a folder called `wedding-invite`
3. In your terminal, type:
```bash
cd wedding-invite
```

**OR** if you're cloning from GitHub (if someone shared a repo link):
```bash
git clone https://github.com/YOUR-USERNAME/wedding-invite.git
cd wedding-invite
```

## Step 8: Install Dependencies

While inside the `wedding-invite` folder in your terminal, run:

```bash
npm install
```

This downloads all the code libraries the project needs. It takes 1–3 minutes. You'll see lots of text scrolling — that's normal. Wait for it to finish.

You'll know it's done when you see something like:
```
added 847 packages in 45s
```

## Step 9: Create Your Environment File

This file tells your project where your Supabase database is.

1. In the `wedding-invite` folder on your Desktop, find the file called `.env.example`
2. **Duplicate it** (right-click → Copy, then right-click → Paste)
3. **Rename the copy** to exactly: `.env.local`
   - On Windows: you might need to show file extensions first (View → Show → File name extensions)
   - The dot at the start IS important
4. Open `.env.local` in any text editor (Notepad, TextEdit, VS Code)
5. Replace the placeholder values with your real Supabase keys:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR-FULL-KEY
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** No spaces around the `=` sign. No quotes around the values.

6. Save the file.

---

# PART 4 — Test It on Your Computer

## Step 10: Run the Project Locally

In your terminal (still in the `wedding-invite` folder), run:

```bash
npm run dev
```

You'll see:
```
▲ Next.js 14.2.5
- Local:        http://localhost:3000
- Ready
```

## Step 11: Open It in Your Browser

Go to: **http://localhost:3000**

You should see your wedding invite landing page! 🎉

**Test the full flow:**
1. Go to `http://localhost:3000/create`
2. Fill out the form to create a test wedding
3. After submitting, you'll get your invitation and dashboard links
4. Check your Supabase dashboard → Table Editor to see the data appear

**To stop the local server:** Press `Ctrl + C` in the terminal.

---

# PART 5 — Put It on the Internet (Deploy)

## Step 12: Create a GitHub Account

GitHub stores your code online so Vercel can access it.

1. Go to **https://github.com**
2. Click **"Sign up"**
3. Follow the steps to create your free account
4. Verify your email

## Step 13: Create a GitHub Repository

1. Once logged in to GitHub, click the **"+"** icon in the top right
2. Click **"New repository"**
3. Name it: `wedding-invite`
4. Keep it **Public** (required for free Vercel hosting)
5. **Do NOT** check any of the "Initialize" checkboxes
6. Click **"Create repository"**

## Step 14: Upload Your Code to GitHub

Back in your terminal (in the wedding-invite folder):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/wedding-invite.git
git push -u origin main
```

**Replace `YOUR-GITHUB-USERNAME`** with your actual GitHub username.

When prompted:
- Username: your GitHub email or username
- Password: use a **Personal Access Token** (GitHub no longer accepts passwords)

**How to get a Personal Access Token:**
1. GitHub → Settings (click your profile picture) → Developer Settings
2. Personal access tokens → Tokens (classic) → Generate new token (classic)
3. Give it any name, set expiry to "No expiration"
4. Check the **"repo"** checkbox
5. Click "Generate token"
6. **Copy the token immediately** — you won't see it again!
7. Use this token as your password when pushing

## Step 15: Create a Vercel Account

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** — this links them together automatically
4. Authorize Vercel to access your GitHub

## Step 16: Deploy to Vercel

1. In Vercel, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories — find **"wedding-invite"** and click **"Import"**
3. In the configuration screen:
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** leave as `./`
4. Expand the **"Environment Variables"** section
5. Add these three variables one at a time:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon key |
   | `NEXT_PUBLIC_APP_URL` | leave blank for now |

6. Click **"Deploy"**
7. Wait 2–3 minutes while it builds

## Step 17: Get Your Live URL

When deployment finishes, Vercel gives you a URL like:
```
https://wedding-invite-yourname.vercel.app
```

1. Click "Visit" to open it
2. Copy your URL

## Step 18: Update the App URL

Go back to Vercel:
1. Settings → Environment Variables
2. Add/update `NEXT_PUBLIC_APP_URL` = `https://your-actual-vercel-url.vercel.app`
3. Go to Deployments → click the three dots on your latest deployment → "Redeploy"

---

# PART 6 — Using the App

## Creating a Wedding Invitation

1. Go to `https://your-site.vercel.app/create`
2. Fill out the 4-step form:
   - **Step 1:** Bride & groom names
   - **Step 2:** Date, time, venue, Google Maps link
   - **Step 3:** Your love story, tagline, dress code
   - **Step 4:** RSVP options and dashboard password
3. Click "Create Invitation 🎉"
4. You'll get two links:
   - **Invitation link** — share this with guests
   - **Dashboard link** — keep this private (only for the couple)

## Viewing Your Dashboard

1. Go to `https://your-site.vercel.app/dashboard/your-names`
2. Enter the password you created
3. You'll see:
   - **Overview tab:** Stats + recent responses + share link
   - **Guest List tab:** Full searchable guest list, exportable to CSV
   - **Analytics tab:** Charts showing attendance and trends

## Demo Invitation

A sample invitation was created in the database schema.  
View it at: `https://your-site.vercel.app/ravishka-dilshan`  
Dashboard: `https://your-site.vercel.app/dashboard/ravishka-dilshan` (password: `demo123`)

---

# PART 7 — Customization

## Adding a Custom Domain (Optional)

Free option: your Vercel URL works perfectly.

For a custom domain like `www.yourinvite.com`:
1. Buy a domain from Namecheap, GoDaddy, or Google Domains (~$10–15/year)
2. In Vercel → Settings → Domains → Add your domain
3. Follow Vercel's instructions to update DNS records at your registrar

## Editing Content After Creation

Currently editing requires going into Supabase directly:
1. Supabase dashboard → Table Editor → `weddings` table
2. Click the row you want to edit
3. Double-click any cell to edit it
4. Press Enter to save

---

# PART 8 — Troubleshooting

## "Module not found" error when running `npm run dev`
```bash
npm install
```
Run this again — a package may not have installed correctly.

## "Invalid API key" or blank page
- Check your `.env.local` file
- Make sure there are no spaces or quotes around the values
- Restart the dev server: Ctrl+C then `npm run dev` again

## Data not showing in dashboard
- Check your Supabase RLS policies (SQL Editor → run the schema again)
- Make sure your env variables in Vercel exactly match Supabase

## Vercel build failed
- Check the error log in Vercel dashboard
- Most common fix: make sure all environment variables are set correctly

## "Unique constraint" RSVP error
This happens when someone tries to RSVP twice with the same email.
It's expected behavior — contact the couple to manually update in Supabase.

---

# File Structure Reference

```
wedding-invite/
├── app/
│   ├── [slug]/page.tsx          ← Invitation page (/ravishka-dilshan)
│   ├── dashboard/[slug]/page.tsx ← Dashboard page (/dashboard/ravishka-dilshan)
│   ├── create/page.tsx          ← Create invitation form
│   ├── created/page.tsx         ← Success page after creating
│   ├── api/rsvp/route.ts        ← API: submit RSVP
│   ├── api/wedding/[slug]/route.ts ← API: get wedding data
│   ├── globals.css              ← All global styles
│   ├── layout.tsx               ← Root HTML layout
│   └── page.tsx                 ← Home/landing page
│
├── components/
│   ├── invitation/
│   │   ├── HeroSection.tsx      ← Full-screen hero with couple names
│   │   ├── CountdownTimer.tsx   ← Live countdown to wedding day
│   │   ├── StorySection.tsx     ← Love story section
│   │   ├── EventDetails.tsx     ← Ceremony/reception + venue card
│   │   ├── DressCode.tsx        ← Dress code + color palette
│   │   ├── RSVPForm.tsx         ← 3-step RSVP form
│   │   └── InvitationFooter.tsx ← Footer
│   │
│   ├── dashboard/
│   │   ├── DashboardClient.tsx  ← Full dashboard (password + tabs)
│   │   ├── StatsCards.tsx       ← 4 stat cards at the top
│   │   ├── GuestList.tsx        ← Searchable table + CSV export
│   │   └── RSVPCharts.tsx       ← Pie + bar + distribution charts
│   │
│   └── ui/
│       ├── FloatingPetals.tsx   ← Animated rose petals effect
│       └── AnimatedSection.tsx  ← Scroll-triggered fade-in
│
├── lib/
│   ├── supabase.ts              ← Supabase client setup
│   ├── types.ts                 ← TypeScript type definitions
│   └── utils.ts                 ← Date formatting, countdown, etc.
│
├── supabase/
│   └── schema.sql               ← Database tables + policies
│
├── .env.example                 ← Template for environment variables
├── .env.local                   ← YOUR actual keys (never commit this!)
├── package.json                 ← Dependencies list
├── tailwind.config.ts           ← Design tokens + colors
└── next.config.mjs              ← Next.js configuration
```

---

# Quick Reference: All Commands

```bash
# Install dependencies (run once)
npm install

# Run locally (development)
npm run dev

# Build for production (Vercel does this automatically)
npm run build

# Push code updates to GitHub (and Vercel auto-deploys)
git add .
git commit -m "Your change description"
git push
```

---

# Need Help?

- **Supabase docs:** https://supabase.com/docs
- **Vercel docs:** https://vercel.com/docs
- **Next.js docs:** https://nextjs.org/docs

---

*Made with love 🌸*
