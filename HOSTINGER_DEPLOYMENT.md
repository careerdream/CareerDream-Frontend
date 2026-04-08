# CareerDream - Hostinger Complete Deployment Guide

## 📋 Deployment Checklist

Your Hostinger premium shared hosting plan supports Node.js, so you can deploy both frontend and backend directly to Hostinger.

### Architecture:
- **Frontend**: `careerdream.in` → `public_html/`
- **Backend**: `api.careerdream.in` → `public_html/api.careerdream.in/`
- **Database**: Remote MySQL at 193.203.184.228:3306

---

## ✅ STEP 1: Create Subdomain for Backend

### 1.1 In Hostinger cPanel:
1. Login to **cPanel** (cpanel.careerdream.in or via Hostinger dashboard)
2. Find **Addon Domains** or **Subdomains** section
3. **Create new subdomain:**
   - Name: `api`
   - Domain: `careerdream.in`
   - Document Root: `public_html/api.careerdream.in` (auto-created)
4. Click **Create**

**Result:**
- Main site: `https://careerdream.in`
- API: `https://api.careerdream.in`

---

## ✅ STEP 2: Build Frontend for Production

Run on your local machine:

```bash
cd c:\Users\shrey\OneDrive\Documents\SHREYASH\CareerDream.in\CareerDream
npm run build
```

This creates a `dist/` folder with production-ready files (~5-10 MB).

---

## ✅ STEP 3: Upload Frontend to Hostinger

### 3.1 Using File Manager (Recommended):
1. In Hostinger cPanel, go to **File Manager**
2. Navigate to `/public_html`
3. **Delete all existing files** (if any)
4. Click **Upload** and select all files from your local `dist/` folder
5. Upload takes 2-5 minutes

### 3.2 Using FTP (Alternative):
1. In Hostinger cPanel, go to **FTP Accounts**
2. Create an FTP account (if needed) or use existing
3. Get credentials:
   - **FTP Host**: ftp.careerdream.in
   - **Username**: Your FTP username
   - **Password**: Your FTP password
4. Use FileZilla or WinSCP:
   - Connect to `ftp.careerdream.in`
   - Navigate to `/public_html`
   - Delete existing files
   - Upload all files from `dist/` folder

---

## ✅ STEP 4: Prepare Backend for Hosting

### 4.1 Update `.env.production` (Already done)

File: `server/.env.production`
```env
DATABASE_URL="mysql://username:password@193.203.184.228:3306/careerdream"
NODE_ENV="production"
PORT=8080
```

**Replace:**
- `username`: Your actual MySQL username
- `password`: Your actual MySQL password

### 4.2 Package Backend Files

Create a `backend-build/` folder with:
```
backend-build/
├── server.js
├── seed_final.js
├── package.json
├── package-lock.json
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── routes/
│   ├── assessments.js
│   ├── auth.js
│   ├── courses.js
│   └── jobs.js
├── config/
│   └── (if any config files)
└── .env.production
```

### 4.3 Generate Prisma Client

Run locally before uploading:
```bash
cd server
npx prisma generate
```

This creates `node_modules/.prisma/` which must be uploaded.

---

## ✅ STEP 5: Upload Backend to Hostinger

### 5.1 Using File Manager:
1. In cPanel, go to **File Manager**
2. Navigate to `/public_html/api.careerdream.in`
3. **Upload** all backend files (from Step 4):
   - `server.js`
   - `package.json`
   - `package-lock.json`
   - `.env.production`
   - `routes/` folder
   - `prisma/` folder
   - `config/` folder

### 5.2 Install Dependencies on Server

**Access Terminal in Hostinger:**
1. In cPanel, find **Terminal** or **SSH Access**
2. Or use Hostinger's **Advanced > Terminal**
3. Navigate to backend directory:
   ```bash
   cd public_html/api.careerdream.in
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
   (Takes 3-5 minutes)

5. Verify Prisma:
   ```bash
   npx prisma generate
   ```

---

## ✅ STEP 6: Set Up Node.js Application

### 6.1 Enable Node.js in Hostinger

1. In cPanel, find **Node Version Manager** or **Node.js** section
2. Click **Create Node.js Application**
3. Configure:
   - **Application name**: `careerdream-api`
   - **Domain/Subdomain**: `api.careerdream.in`
   - **Application root**: `/public_html/api.careerdream.in`
   - **Application startup file**: `server.js`
   - **Node version**: 18.x or 20.x
   - **Port**: 8080 (Hostinger will manage)

4. Click **Create** and wait 1-2 minutes for startup

### 6.2 Verify Backend is Running

Try accessing: `https://api.careerdream.in/api/jobs`

Should return JSON data with jobs including emojis.

---

## ✅ STEP 7: Connect Frontend to Backend

Your code is already updated to use:
- **Development**: `/api` (proxied to localhost:5000)
- **Production**: `https://api.careerdream.in`

**No additional changes needed!** The frontend automatically detects production and uses correct URL.

---

## ✅ STEP 8: Update DNS (if needed)

### Only if you moved hosting or changed nameservers:

1. Go to your domain registrar (where you bought careerdream.in)
2. Update **Nameservers** to Hostinger's:
   - ns1.hostinger.com
   - ns2.hostinger.com
   - ns3.hostinger.com
   - ns4.hostinger.com
3. Wait 24 hours for DNS to propagate

Or point DNS A records to Hostinger's IP address.

---

## ✅ STEP 9: Test Everything

### 9.1 Frontend Tests:
1. Visit `https://careerdream.in` in browser
2. Check **Jobs Page**:
   - Should show 13 jobs with logos (🤖, ☁️, 🚀, etc.)
   - Click a job to verify details load
3. Check **Learning Page**:
   - Should show 8 courses with icons (🤖, 🧠, ☁️, etc.)
   - Click a course
4. Check **Assessments Page**:
   - Should show 8 assessments with badges (🐍, ✨, 🗄️, etc.)

### 9.2 Backend Tests:
Test API endpoints directly:

```bash
# In browser or curl:
curl https://api.careerdream.in/api/jobs
curl https://api.careerdream.in/api/courses
curl https://api.careerdream.in/api/assessments
```

All should return JSON with emoji data.

### 9.3 Browser DevTools:
1. Open browser (F12) → **Network** tab
2. Refresh your website
3. Look for API calls going to `https://api.careerdream.in/api/...`
4. Should show `200 OK` responses

---

## ✅ STEP 10: Enable HTTPS (Security)

### 10.1 In Hostinger cPanel:
1. Find **SSL Certificates** section
2. Click **Install → Let's Encrypt Free SSL** for both:
   - `careerdream.in`
   - `api.careerdream.in`
3. Wait 10-15 minutes for installation

### 10.2 Verify HTTPS:
- Visit `https://careerdream.in` (should NOT show warning)
- Visit `https://api.careerdream.in/api/jobs` (should show green lock)

---

## 🆘 Troubleshooting

### Issue: Frontend loads but no jobs/courses show

**Solution:**
1. Check browser DevTools → **Console** tab
2. Look for CORS errors
3. Verify API URL is `https://api.careerdream.in`
4. Check backend is running: `https://api.careerdream.in/api/jobs`

### Issue: Backend returns 404

**Solution:**
1. Verify Node.js app is running in cPanel
2. Check `.env.production` has correct database credentials
3. Verify `server.js` file is in correct folder
4. Check logs in Hostinger Terminal:
   ```bash
   tail -n 50 /var/log/nodejs/careerdream-api.log
   ```

### Issue: Database connection fails

**Solution:**
1. Verify database host: `193.203.184.228:3306`
2. Check MySQL username and password in `.env.production`
3. Test from terminal:
   ```bash
   mysql -h 193.203.184.228 -u username -p
   ```

### Issue: Can't upload files to Hostinger

**Solution:**
1. Use FTP instead of File Manager
2. Check file permissions (should be 644 for files, 755 for folders)
3. Ensure you're not exceeding disk quota

---

## 📝 Quick Reference

| Item | Value |
|------|-------|
| Frontend URL | https://careerdream.in |
| Backend URL | https://api.careerdream.in |
| Database Host | 193.203.184.228:3306 |
| SSH Host | ssh.careerdream.in |
| FTP Host | ftp.careerdream.in |
| Node Version | 18.x or 20.x |
| Backend Port | 8080 (managed by Hostinger) |

---

## ✨ You're Done!

Your CareerDream website is now live at:
- **Frontend**: https://careerdream.in
- **API**: https://api.careerdream.in

### Next Steps:
1. Monitor performance: Check Hostinger dashboard
2. Set up backups for database
3. Monitor error logs regularly
4. Plan future updates (git push → rebuild → upload)

