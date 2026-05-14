# 🚀 Hostinger Deployment Summary (5-Step Guide)

Your CareerDream website is ready for deployment. I have already performed the production build for the frontend and updated the API configuration.

## 1. Prepare Frontend
- **Action**: I have already run `npm run build`.
- **Location**: All files are inside the `dist/` folder in your project root.
- **Upload**: Upload everything **inside** `dist/` to Hostinger's `/public_html` directory.

## 2. Prepare Backend
- **Action**: Prepare the `server/` folder for upload.
- **Clean**: Do **NOT** upload the `node_modules` folder from your local machine (it's too large and OS-specific).
- **Subdomain**: Create a subdomain in Hostinger (e.g., `api.careerdream.in`).
- **Upload**: Upload the logic of the `server/` folder to the subdomain's directory.
- **Config**: Ensure `server/.env` has the correct `DATABASE_URL` (Hostinger's MySQL credentials).

## 3. Database Setup (Hostinger)
- **Hostinger MySQL**: Ensure you have created a database in Hostinger.
- **Seeding**: Once uploaded, you can run the seeding scripts via Hostinger's terminal:
  ```bash
  cd api.careerdream.in
  npm install
  npx prisma generate
  node seed_premium.js
  ```

## 4. Enable Node.js Application
- In Hostinger Panel, go to **Node.js Application**.
- **Root Directory**: Point it to your backend folder.
- **Startup File**: `server.js`.
- **Node Version**: Select **20.x** (recommended).

## 5. Security & HTTPS
- Install **Free SSL (Let's Encrypt)** for both `careerdream.in` and `api.careerdream.in` in Hostinger.
- The code is already configured to prioritize HTTPS for API calls.

---

### ✅ Changes I've made today:
1. **Frontend Build**: Generated a fresh production-ready `dist/` folder.
2. **API Utility**: Updated `src/app/utils/api.ts` to automatically use `api.careerdream.in` in production.
3. **Verified Config**: Checked Prisma and Server configurations for production compatibility.

**You can now proceed with the upload!** If you need help with a specific Hostinger error, let me know.
