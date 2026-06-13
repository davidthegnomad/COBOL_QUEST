# Deployment Guide for COBOL Quest (Static Web Version)

## Overview
This version of **COBOL Quest** is a purely client-side React application. It uses the browser's `localStorage` to save game progress, meaning no backend server or database is required.

## Hosting Options
Since this is a static site, you can host it on any web server or static hosting service:
- **GitHub Pages**
- **Vercel** (Highly recommended for Next.js)
- **Netlify**
- **S3 / Cloudfront**

## Deployment Steps

### 1. Build the Application
Generate the optimized production build:
```bash
npm run build
```

### 2. Export (Optional for Pure Static)
If you are hosting on a service like GitHub Pages that requires a static export, ensure your `next.config.js` has `output: 'export'`. Then run:
```bash
npm run build
```
The output will be in the `out/` directory.

### 3. Upload Files
Upload the contents of the `.next/` directory (for Vercel) or the `out/` directory (for static hosts) to your server.

## Environmental Stability
- **No Database**: No Prisma migrations or SQLite setup required.
- **Persistence**: Game progress is tied to the user's browser storage. Clearing browser data will reset progress.
- **Offline Support**: Once loaded, most game logic functions entirely offline.

