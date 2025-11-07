# 🚀 GitHub Pages Quick Start - TL;DR Version

## Prerequisites
- GitHub account
- Your repository name (e.g., `regenseq-website`)

---

## 1️⃣ Update Vite Config

Edit `vite.config.ts` - add `base` property:

```typescript
export default defineConfig({
  base: '/regenseq-website/', // ⚠️ REPLACE with YOUR repo name
  plugins: [
    // ... existing plugins
  ],
  // ... rest stays the same
});
```

**If using custom domain or username.github.io:** use `base: '/'`

---

## 2️⃣ Build the Site

```bash
npm run build
```

---

## 3️⃣ Create GitHub Repository

1. Go to github.com → New repository
2. Name: `regenseq-website` (or your choice)
3. ✅ Public visibility
4. ❌ Don't initialize with README
5. Create repository

---

## 4️⃣ Push to GitHub

```bash
# Initialize git (if needed)
git init

# Configure identity
git config user.email "you@example.com"
git config user.name "Your Name"

# Add files
git add .
git commit -m "Initial commit: RegenSeq website"

# Connect to GitHub (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**Authentication:** Use a [Personal Access Token](https://github.com/settings/tokens) as password

---

## 5️⃣ Enable GitHub Pages

1. GitHub repository → **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Wait 2-3 minutes for deployment

---

## 6️⃣ Update URLs for Production

After deployment, update these files with your GitHub Pages URL:

### `client/index.html`
```html
<!-- Update canonical and og:url -->
<link rel="canonical" href="https://USERNAME.github.io/REPO/" />
<meta property="og:url" content="https://USERNAME.github.io/REPO/" />
<meta property="og:image" content="https://USERNAME.github.io/REPO/og-image.png" />
<meta name="twitter:image" content="https://USERNAME.github.io/REPO/og-image.png" />
```

### `client/public/sitemap.xml`
Replace all `https://regenseq.replit.app` with `https://USERNAME.github.io/REPO`

### `client/public/robots.txt`
```
Sitemap: https://USERNAME.github.io/REPO/sitemap.xml
```

Then push changes:
```bash
npm run build
git add .
git commit -m "Update URLs for GitHub Pages"
git push origin main
```

---

## ✅ Done!

Your site will be live at: `https://USERNAME.github.io/REPO/`

Check **Actions** tab in GitHub to monitor deployment progress.

---

## 🔄 Future Updates

```bash
# Make changes, then:
git add .
git commit -m "Describe your changes"
git push origin main
# Automatically deploys!
```

---

**📖 For detailed instructions, see:** `DEPLOY_TO_GITHUB_PAGES.md`
