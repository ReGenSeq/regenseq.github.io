# 📘 Deploy RegenSeq to GitHub Pages - Step-by-Step Guide

## ⚠️ Important Notes

- **GitHub Pages only hosts static websites** (no backend/server functionality)
- Your RegenSeq site is perfect for GitHub Pages since it's a static marketing/documentation site
- The Express.js server is only used for development; the production build is static files

---

## 🚀 Phase 1: Prepare Your Project

### Step 1: Update Vite Config for GitHub Pages

Edit `vite.config.ts` and add the `base` property for your GitHub repository:

```typescript
export default defineConfig({
  base: '/regenseq-website/', // Replace with YOUR repository name
  // ... rest of config
});
```

**Important:** If you want to use a custom domain or `username.github.io/regenseq-website`, use the repository name. If deploying to `username.github.io`, use `base: '/'`.

### Step 2: Build the Production Files

Open the Replit Shell and run:

```bash
npm run build
```

This creates `dist/public/` with all your static website files.

### Step 3: Verify the Build

```bash
ls -la dist/public/
```

You should see: `index.html`, `assets/`, and other files.

---

## 🔗 Phase 2: Create GitHub Repository

### Step 4: Create New Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click **"+" → "New repository"**
3. Configure:
   - **Name:** `regenseq-website` (or your choice)
   - **Description:** "RegenSeq Open Source Community - NSF-funded DNA sequencer repurposing project"
   - **Visibility:** ✅ **Public** (required for free GitHub Pages)
   - **❌ DO NOT** check "Initialize with README" (we have files already)
4. Click **"Create repository"**
5. **Keep this page open** - you'll need the URL

---

## 💾 Phase 3: Connect Replit to GitHub

### Step 5: Initialize Git in Replit

In the Replit Shell:

```bash
# Initialize git if not already done
git init

# Configure your Git identity
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

### Step 6: Add All Files to Git

```bash
# Stage all files
git add .

# Check what will be committed
git status

# Create initial commit
git commit -m "Initial commit: RegenSeq website with full SEO optimization"
```

### Step 7: Connect to GitHub

Replace `yourusername` and `regenseq-website` with your actual values:

```bash
# Add GitHub as remote
git remote add origin https://github.com/yourusername/regenseq-website.git

# Verify remote was added
git remote -v

# Push to GitHub (you'll be prompted for credentials)
git push -u origin main
```

**Authentication:**
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (not your password)
  - Create token at: https://github.com/settings/tokens
  - Required scopes: `repo`, `workflow`

---

## ⚙️ Phase 4: Configure GitHub Pages

### Step 8: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll to **"Pages"** in the left sidebar
4. Under **"Build and deployment"**:
   - **Source:** Select **"GitHub Actions"**
5. The workflow file (`.github/workflows/deploy.yml`) will handle deployment

### Step 9: Verify Workflow File Exists

Make sure `.github/workflows/deploy.yml` exists in your repository. This file was already created for you and handles:
- Installing dependencies
- Building the project
- Deploying to GitHub Pages

### Step 10: Trigger First Deployment

The deployment happens automatically when you push to the `main` branch. To verify:

1. Go to **"Actions"** tab in your GitHub repository
2. You should see a workflow running (yellow circle) or completed (green checkmark)
3. Wait for it to complete (~2-3 minutes)

### Step 11: Access Your Live Site

Once the workflow completes:

1. Go back to **Settings → Pages**
2. You'll see: **"Your site is live at https://yourusername.github.io/regenseq-website/"**
3. Click the URL to visit your live site! 🎉

---

## 🔄 Phase 5: Making Updates

### How to Update Your Site

Every time you make changes:

```bash
# In Replit Shell:

# 1. Stage your changes
git add .

# 2. Commit with a descriptive message
git commit -m "Update: describe your changes here"

# 3. Push to GitHub
git push origin main
```

The GitHub Actions workflow will automatically rebuild and redeploy your site!

---

## 🎨 Optional: Custom Domain Setup

### If You Want to Use Your Own Domain

1. Buy a domain (e.g., from Namecheap, Google Domains, etc.)
2. In your repository: **Settings → Pages → Custom domain**
3. Enter your domain (e.g., `regenseq.org`)
4. Add DNS records at your domain provider:
   - **Type:** `CNAME`
   - **Name:** `www` (or `@` for apex domain)
   - **Value:** `yourusername.github.io`
5. Wait for DNS propagation (can take up to 24 hours)

For apex domains (no www), use these A records:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

---

## 🐛 Troubleshooting

### Issue: "404 - File not found" on GitHub Pages

**Solution:** Make sure `base` in `vite.config.ts` matches your repository name:
```typescript
base: '/regenseq-website/', // Must match repo name
```

### Issue: CSS/JS files not loading

**Solution:** 
1. Check the browser console for errors
2. Verify the `base` path in `vite.config.ts`
3. Rebuild: `npm run build`
4. Push changes: `git add . && git commit -m "Fix: update base path" && git push`

### Issue: Authentication failed when pushing to GitHub

**Solution:**
1. Create a Personal Access Token at https://github.com/settings/tokens
2. Use the token as your password when Git prompts for credentials
3. Or configure Git credential helper:
```bash
git config --global credential.helper store
```

### Issue: Workflow fails in GitHub Actions

**Solution:**
1. Go to **Actions** tab in GitHub
2. Click on the failed workflow
3. Read the error logs
4. Common fixes:
   - Make sure `package.json` has all dependencies
   - Verify `npm run build` works locally
   - Check that `dist/public` directory is created

---

## 📊 SEO Considerations for GitHub Pages

### Update Your URLs

After deployment, update these files with your new GitHub Pages URL:

#### 1. `client/index.html`
```html
<!-- Change from -->
<link rel="canonical" href="https://regenseq.replit.app/" />
<meta property="og:url" content="https://regenseq.replit.app/" />

<!-- To -->
<link rel="canonical" href="https://yourusername.github.io/regenseq-website/" />
<meta property="og:url" content="https://yourusername.github.io/regenseq-website/" />
```

#### 2. `client/public/sitemap.xml`
Replace all instances of `https://regenseq.replit.app` with your new URL.

#### 3. `client/public/robots.txt`
```
Sitemap: https://yourusername.github.io/regenseq-website/sitemap.xml
```

### Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (GitHub Pages URL)
3. Verify ownership
4. Submit your sitemap URL
5. Request indexing for your homepage

---

## ✅ Success Checklist

After completing all steps, verify:

- [ ] Site is live at GitHub Pages URL
- [ ] All images load correctly
- [ ] Navigation works
- [ ] Favicon appears in browser tab
- [ ] Open Graph tags work (test with [Facebook Debugger](https://developers.facebook.com/tools/debug/))
- [ ] Meta description appears in Google Search results
- [ ] Site is mobile-responsive
- [ ] SSL certificate is active (https://)
- [ ] robots.txt is accessible at `/robots.txt`
- [ ] sitemap.xml is accessible at `/sitemap.xml`

---

## 🎓 Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## 🆘 Need Help?

If you encounter issues:

1. Check the **Actions** tab in GitHub for build errors
2. Verify `npm run build` works locally in Replit
3. Review GitHub Pages documentation
4. Check that all URLs are updated correctly

Good luck with your deployment! 🚀
