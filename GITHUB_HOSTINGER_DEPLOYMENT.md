# 🚀 CareerDream: GitHub to Hostinger Deployment Guide

Complete step-by-step guide to deploy your website using GitHub and Hostinger.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Phase 1: GitHub Repository Setup](#phase-1-github-repository-setup)
3. [Phase 2: Hostinger Configuration](#phase-2-hostinger-configuration)
4. [Phase 3: Production Secrets & Environment](#phase-3-production-secrets--environment)
5. [Phase 4: Connect GitHub to Hostinger](#phase-4-connect-github-to-hostinger)
6. [Phase 5: Deploy Frontend](#phase-5-deploy-frontend)
7. [Phase 6: Deploy Backend](#phase-6-deploy-backend)
8. [Phase 7: Verification & Testing](#phase-7-verification--testing)
9. [Phase 8: Automated Updates](#phase-8-automated-updates)

---

## 📌 Prerequisites

Before starting, ensure you have:

✅ **GitHub Account** - Free account at https://github.com  
✅ **Hostinger Account** - With premium shared hosting (Node.js support)  
✅ **Git Installed** - Download from https://git-scm.com  
✅ **Local Repository** - Your project folder initialized with Git  
✅ **Hostinger cPanel Access** - URL: `cpanel.careerdream.in`

**Check Git Installation:**
```bash
git --version
```

---

---

# ⚡ PHASE 1: GitHub Repository Setup

## STEP 1.1: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `careerdream-platform` (or your preferred name)
3. **Description**: "CareerDream - IT Jobs & Learning Platform"
4. **Visibility**: Choose `Private` (recommended for production)
5. **Initialize**: Leave unchecked (you'll push existing repo)
6. Click **Create repository**

**You'll get a repository URL:**
```
https://github.com/YOUR_USERNAME/careerdream-platform.git
```

---

## STEP 1.2: Configure Local Git

Open PowerShell in your project folder:

```bash
cd "c:\Users\shrey\OneDrive\Documents\SHREYASH\CareerDream.in\CareerDream"
```

**Set Git Config (if not already set):**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## STEP 1.3: Update .gitignore

Your `.gitignore` should exclude production secrets. Verify it contains:

```
node_modules/
dist/
.env
.env.local
.env.development
.env.test
build/
*.log
.DS_Store
```

✅ **Already configured correctly**

---

## STEP 1.4: Add Remote & Push to GitHub

**Check current remotes:**
```bash
git remote -v
```

**If no origin exists, add it:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/careerdream-platform.git
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## STEP 1.5: Push to GitHub (First Time)

```bash
git branch -M main
git push -u origin main
```

**What it does:**
- Renames current branch to `main` (GitHub standard)
- Pushes all commits to GitHub
- Sets `origin/main` as tracking branch

**Output:**
```
Enumerating objects: 542, done.
Counting objects: 100% (542/542), done.
Delta compression using up to 8 threads
Compressing objects: 100% (450/450), done.
Writing objects: 100% (542/542), 45.23 MiB
...
Branch 'main' set up to track remote tracking branch 'main' from 'origin'.
```

✅ Your code is now on GitHub!

---

## STEP 1.6: Create GitHub Personal Access Token (PAT)

You'll need this to authenticate deployments from Hostinger.

1. Go to https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. **Token name**: `hostinger-deployment`
4. **Expiration**: 90 days (recommended)
5. **Scopes**: Check only `repo` (full control of private repositories)
6. Click **Generate token**

⚠️ **IMPORTANT**: Copy and save this token immediately! You'll need it in Phase 4.

```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  (save this)
```

---

---

# ⚡ PHASE 2: Hostinger Configuration

## STEP 2.1: Create API Subdomain

1. **Login to Hostinger cPanel**
   - URL: https://cpanel.careerdream.in
   - Or via Hostinger dashboard → cPanel

2. Find **Addon Domains** or **Subdomains**

3. **Create Subdomain:**
   - Name: `api`
   - Domain: `careerdream.in`
   - Document Root: `public_html/api.careerdream.in` (auto-created)
   - Click **Create**

✅ Result: `https://api.careerdream.in` is now ready

---

## STEP 2.2: Enable SSH/Terminal Access

1. In cPanel, go to **Advanced** → **Terminal**
   - Or **SSH/Shell Access** (may need to enable first)

2. Take note of your SSH credentials:
   - Host: `careerdream.in` or IP address
   - Username: Your cPanel username
   - Port: 22 (default)

3. **Optional**: Set up SSH key for passwordless login
   - In cPanel, find **Manage API Tokens** or **SSH Access**
   - Upload your public key from: `C:\Users\shrey\.ssh\id_rsa.pub`

---

## STEP 2.3: Enable Node.js Support

1. In cPanel, find **Node.js App Manager** or **Node Version Manager**
   - May be under **Software** section

2. Verify Node.js 18.x or 20.x is available

✅ Most premium Hostinger plans include this

---

## STEP 2.4: Database Setup

Your remote MySQL is already configured at: `193.203.184.228:3306`

**Get your database credentials:**
1. In cPanel, go to **MySQL Databases**
2. Create new database:
   - Name: `careerdream_prod`
   - User: `cd_prod_user`
   - Password: Generate a strong password (20+ chars)
3. Note these credentials (used in Phase 3)

---

---

# ⚡ PHASE 3: Production Secrets & Environment

## STEP 3.1: Create .env.production for Backend

In your local `server/` folder, create/update `.env.production`:

```env
# Database
DATABASE_URL="mysql://cd_prod_user:YOUR_DB_PASSWORD@193.203.184.228:3306/careerdream_prod"

# Environment
NODE_ENV=production
PORT=8080

# Security
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars

# API URLs
FRONTEND_URL=https://careerdream.in

# Optional: Email, Payment, etc. (if used)
# SENDGRID_API_KEY=your_key
# STRIPE_SECRET_KEY=your_key
```

⚠️ **DO NOT COMMIT THIS FILE TO GITHUB**
- It's already in `.gitignore`
- You'll upload this directly to Hostinger

---

## STEP 3.2: Store Secrets Securely

**On your local machine:**
1. Create a folder: `C:\Hostinger-Secrets\`
2. Save `.env.production` there
3. Keep this folder secure and never share

**On Hostinger:**
- You'll upload `.env.production` directly via cPanel
- Never commit to GitHub

---

---

# ⚡ PHASE 4: Connect GitHub to Hostinger

## STEP 4.1: Clone Repository on Hostinger

1. **SSH into Hostinger:**
   ```bash
   ssh your_cpanel_username@careerdream.in
   # Or: ssh your_cpanel_username@your_server_ip
   ```
   - Enter your cPanel password when prompted

2. **Navigate to public_html:**
   ```bash
   cd ~/public_html
   ```

3. **Clone repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/careerdream-platform.git .
   ```

   - Replace `YOUR_USERNAME` with your GitHub username
   - The `.` clones into current directory

4. **Configure Git credentials (for future pulls):**
   ```bash
   git config credential.helper store
   git pull
   # Enter your GitHub username and Personal Access Token (from Step 1.6)
   ```

---

## STEP 4.2: Deploy Frontend

1. **Build frontend locally (on your computer):**
   ```bash
   cd "c:\Users\shrey\OneDrive\Documents\SHREYASH\CareerDream.in\CareerDream"
   npm run build
   ```

2. **Copy dist files to GitHub:**
   ```bash
   git add dist/
   git commit -m "Build: Production frontend build"
   git push origin main
   ```

3. **On Hostinger, pull the dist folder:**
   ```bash
   cd ~/public_html
   git pull origin main
   ```

4. **Deploy dist to root:**
   ```bash
   cp -r dist/* .
   # Or using File Manager: Copy all files from dist/ to public_html/
   ```

✅ Frontend is now live at `https://careerdream.in`

---

## STEP 4.3: Deploy Backend

1. **On Hostinger, create backend directory:**
   ```bash
   mkdir -p ~/public_html/api.careerdream.in
   cd ~/public_html/api.careerdream.in
   ```

2. **Clone backend (Option A: Full repo):**
   ```bash
   git clone https://github.com/YOUR_USERNAME/careerdream-platform.git .
   cd server
   ```

   **Or (Option B: GitHub will copy server folder):**
   ```bash
   git clone https://github.com/YOUR_USERNAME/careerdream-platform.git temp
   cp temp/server/* .
   rm -rf temp
   ```

3. **Upload .env.production:**
   - Via cPanel **File Manager**: Upload `server/.env.production`
   - Or via SCP: 
   ```bash
   # From your local computer
   scp C:\Hostinger-Secrets\.env.production your_username@careerdream.in:~/public_html/api.careerdream.in/
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

6. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```

7. **(Optional) Seed database:**
   ```bash
   node seed_final.js
   ```

✅ Backend is ready to be configured in Node.js App Manager

---

## STEP 4.4: Enable Node.js Application in cPanel

1. **In cPanel**, find **Node.js App Manager**

2. **Create New Application:**
   - **Application name**: `careerdream-api`
   - **Domain/Subdomain**: `api.careerdream.in`
   - **Application root**: `/public_html/api.careerdream.in`
   - **Application startup file**: `server.js`
   - **Node version**: 20.x (recommended)
   - **Port**: 8080

3. Click **Create** and wait 1-2 minutes

✅ Backend is now live at `https://api.careerdream.in`

---

---

# ⚡ PHASE 5: Deploy Frontend

## STEP 5.1: Build & Commit Frontend

```bash
cd "c:\Users\shrey\OneDrive\Documents\SHREYASH\CareerDream.in\CareerDream"

# Build for production
npm run build

# Stage dist folder
git add dist/

# Commit
git commit -m "Release: Production build v1.0"

# Push to GitHub
git push origin main
```

---

## STEP 5.2: Pull & Deploy on Hostinger

**Via SSH:**
```bash
ssh your_username@careerdream.in
cd ~/public_html
git pull origin main

# Option 1: If dist in repo
cp -r dist/* .

# Option 2: If not, rebuild on server
npm run build
cp -r dist/* .
```

**Via File Manager:**
1. Download `dist/` folder from your computer
2. In Hostinger cPanel → File Manager
3. Navigate to `/public_html`
4. Delete old files
5. Upload all files from `dist/`

✅ Frontend deployed! Check: https://careerdream.in

---

---

# ⚡ PHASE 6: Deploy Backend

## STEP 6.1: Verify Backend Structure

Ensure your repository contains:

```
careerdream-platform/
├── server/
│   ├── server.js
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── .env.production (NOT IN REPO)
├── src/
├── dist/
└── ...
```

---

## STEP 6.2: Deploy Backend Code

**On Hostinger:**
```bash
cd ~/public_html/api.careerdream.in

# Pull latest code from GitHub
git pull origin main

# Install/Update dependencies
npm install --production

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

---

## STEP 6.3: Verify Backend is Running

```bash
# Check if Node.js app is running
ps aux | grep "node server.js"

# Test API
curl https://api.careerdream.in/api/health

# Should return: {"status":"ok"}
```

✅ Backend is live! Check: https://api.careerdream.in/api/health

---

---

# ⚡ PHASE 7: Verification & Testing

## STEP 7.1: Check SSL Certificates

1. **In cPanel**, go to **SSL/TLS Status**
2. Ensure both domains have green checkmarks:
   - ✅ careerdream.in
   - ✅ api.careerdream.in

3. If not, click **Auto-Configure SSL** for each domain

---

## STEP 7.2: Test Frontend

1. Open browser: https://careerdream.in
2. Check for errors in Developer Console (F12)
3. Verify all pages load correctly:
   - Homepage
   - Jobs page
   - Assessments
   - Learn

---

## STEP 7.3: Test Backend API

```bash
# Test health endpoint
curl https://api.careerdream.in/api/health

# Test jobs endpoint
curl https://api.careerdream.in/api/jobs

# Test with authentication (if applicable)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.careerdream.in/api/user/profile
```

---

## STEP 7.4: Test Frontend-Backend Connection

1. Go to https://careerdream.in/jobs
2. Jobs should load from backend
3. Open DevTools (F12) → Network tab
4. Verify API calls go to `https://api.careerdream.in/api/*`

---

## STEP 7.5: Monitor Logs

**Backend logs:**
```bash
cd ~/public_html/api.careerdream.in

# View recent logs
tail -n 50 /var/log/nodejs/careerdream-api.log

# Or check Node.js App Manager in cPanel for logs
```

---

---

# ⚡ PHASE 8: Automated Updates

## STEP 8.1: Update Frontend

When you make changes:

```bash
cd "c:\Users\shrey\OneDrive\Documents\SHREYASH\CareerDream.in\CareerDream"

# Make your code changes...

# Build for production
npm run build

# Commit changes
git add .
git commit -m "Feature: Your change description"

# Push to GitHub
git push origin main

# On Hostinger, pull and deploy
# (SSH in or via deployment script)
```

---

## STEP 8.2: Update Backend

When you update server code:

```bash
# Make changes to server/

# Commit
git add server/
git commit -m "API: Your change description"

# Push
git push origin main

# On Hostinger
cd ~/public_html/api.careerdream.in
git pull origin main
npm install  # if new dependencies
node_modules/.bin/prisma generate
# Restart Node.js app in cPanel
```

---

## STEP 8.3: Create Deployment Script (Optional)

Create `deploy.sh` on Hostinger:

```bash
#!/bin/bash

# Deploy Frontend
cd ~/public_html
git pull origin main
cp -r dist/* .
echo "✅ Frontend deployed at $(date)"

# Deploy Backend
cd ~/public_html/api.careerdream.in
git pull origin main
npm install --production
npx prisma generate
echo "✅ Backend deployed at $(date)"
```

**Make executable:**
```bash
chmod +x deploy.sh
```

**Run anytime:**
```bash
./deploy.sh
```

---

---

# 🔄 Complete Workflow Summary

### Every Time You Want to Deploy:

**Local Machine:**
```bash
cd CareerDream
npm run build
git add .
git commit -m "Release: Your message"
git push origin main
```

**Hostinger (via SSH or cPanel Terminal):**
```bash
cd ~/public_html
git pull origin main
cp -r dist/* .

cd ~/public_html/api.careerdream.in
git pull origin main
npm install --production
npx prisma generate
```

---

# 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Permission denied" on Hostinger** | Use `sudo` or contact Hostinger support for sudo access |
| **npm install fails** | Check Node.js version: `node -v` (should be 18+) |
| **Prisma migration fails** | Ensure `DATABASE_URL` is correct in `.env.production` |
| **Frontend shows 404 API errors** | Check VITE_API_BASE_URL in `.env.production` |
| **Backend not starting** | Check logs: `tail -f /var/log/nodejs/careerdream-api.log` |
| **SSL certificate issues** | Use cPanel's Auto-Configure SSL or Let's Encrypt |

---

# 📞 Need Help?

- **GitHub Issues**: GitHub docs: https://docs.github.com
- **Hostinger Support**: https://support.hostinger.com
- **Node.js**: https://nodejs.org/docs
- **Prisma**: https://www.prisma.io/docs

---

**Deployment Guide Complete! Your website is now live! 🎉**

