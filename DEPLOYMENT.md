# Deployment Fix Guide

## The Problem
If you see the error: `Failed to resolve module specifier "vue"`, it means GitHub Pages is serving the **source files** instead of the **built files**.

## Solution 1: Use GitHub Actions (Recommended)

1. **Enable GitHub Actions in your repository:**
   - Go to: `Settings` → `Actions` → `General`
   - Under "Workflow permissions", select "Read and write permissions"
   - Click "Save"

2. **Configure GitHub Pages:**
   - Go to: `Settings` → `Pages`
   - Under "Source", select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Save

3. **Push your code:**
   ```bash
   git add .
   git commit -m "Fix deployment"
   git push
   ```

4. **Wait for the workflow to complete:**
   - Go to: `Actions` tab in your repository
   - You should see the "Deploy to GitHub Pages" workflow running
   - Wait for it to complete (green checkmark)

5. **Your site should now work!**

## Solution 2: Manual Deployment (If GitHub Actions doesn't work)

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Create a `gh-pages` branch and deploy:**
   ```bash
   # Install gh-pages if you haven't
   npm install --save-dev gh-pages
   
   # Add to package.json scripts:
   # "deploy": "npm run build && gh-pages -d dist"
   
   # Then run:
   npm run deploy
   ```

   OR manually:
   - Copy ALL contents from the `dist` folder
   - Create/checkout a `gh-pages` branch
   - Commit and push the dist contents to the root of `gh-pages` branch
   - In GitHub Pages settings, select `gh-pages` branch as source

## Important Notes

- ✅ The built `dist/index.html` references bundled files like `/assets/index-xxx.js`
- ❌ The source `index.html` references `/src/main.js` (this causes the error)
- ✅ Always deploy the `dist` folder contents, never the source files
- ✅ The `.nojekyll` file prevents Jekyll from processing your site

## Verify It's Working

After deployment, check:
- The page loads without errors
- Open browser DevTools → Network tab
- You should see requests to `/assets/index-xxx.js` (not `/src/main.js`)

