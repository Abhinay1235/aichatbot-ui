# Deployment Instructions

This guide covers deploying the AI Chatbot UI application to various platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build Configuration](#build-configuration)
- [Environment Variables](#environment-variables)
- [Build Process](#build-process)
- [Deployment Platforms](#deployment-platforms)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Access to your deployment platform
- Backend API URL configured

## Build Configuration

### Vite Configuration

The project uses Vite for building. Configuration is in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Set to true for production debugging
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
        },
      },
    },
  },
})
```

## Environment Variables

### Required Variables

Create a `.env.production` file for production builds:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Environment-Specific Files

- `.env.local` - Local development (gitignored)
- `.env.development` - Development environment
- `.env.production` - Production environment

### Accessing Variables

Environment variables must be prefixed with `VITE_` to be accessible in the app:

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

## Build Process

### Local Build

1. Install dependencies:
```bash
npm install
```

2. Set environment variables:
```bash
cp .env.example .env.production
# Edit .env.production with your values
```

3. Build for production:
```bash
npm run build
```

4. Preview build locally:
```bash
npm run preview
```

The build output will be in the `dist/` directory.

### Build Output

The build process creates:
- `dist/index.html` - Entry HTML file
- `dist/assets/` - JavaScript, CSS, and other assets
- Optimized and minified code
- Code splitting for better performance

## Deployment Platforms

### Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Configure Environment Variables:**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add `VITE_API_BASE_URL`

4. **Automatic Deployments:**
   - Connect GitHub repository
   - Vercel will auto-deploy on push to main branch

**vercel.json** (optional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

### Netlify

1. **Install Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Deploy:**
```bash
netlify deploy --prod
```

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Environment Variables:**
   - Site Settings → Environment Variables
   - Add `VITE_API_BASE_URL`

**netlify.toml**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### GitHub Pages

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json:**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

4. **Configure Base Path:**
Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

---

### AWS S3 + CloudFront

1. **Build the application:**
```bash
npm run build
```

2. **Upload to S3:**
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. **Configure S3 Bucket:**
   - Enable static website hosting
   - Set index document to `index.html`
   - Set error document to `index.html` (for SPA routing)

4. **CloudFront Distribution:**
   - Create distribution pointing to S3 bucket
   - Set default root object to `index.html`
   - Configure error pages (404 → 200 → /index.html)

5. **Environment Variables:**
   - Set `VITE_API_BASE_URL` during build
   - Or use CloudFront to inject environment variables

---

### Docker

1. **Create Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

2. **Create nginx.conf:**
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Build and run:**
```bash
docker build -t aichatbot-ui .
docker run -p 80:80 aichatbot-ui
```

---

### Traditional Web Server (Apache/Nginx)

1. **Build the application:**
```bash
npm run build
```

2. **Upload to server:**
```bash
scp -r dist/* user@server:/var/www/html/
```

3. **Apache Configuration (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

4. **Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## Post-Deployment

### Verify Deployment

1. **Check Application:**
   - Visit deployed URL
   - Test chat functionality
   - Verify API connection

2. **Check Console:**
   - Open browser DevTools
   - Check for errors
   - Verify API calls are working

3. **Performance:**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Verify code splitting is working

### Monitoring

Set up monitoring for:
- Error tracking (Sentry, LogRocket)
- Performance monitoring
- API endpoint health
- User analytics

### SSL/HTTPS

Ensure your deployment uses HTTPS:
- Vercel/Netlify: Automatic SSL
- AWS CloudFront: Use ACM certificate
- Custom domain: Use Let's Encrypt or similar

## Troubleshooting

### Build Errors

**Issue:** TypeScript errors during build
**Solution:** Run `npm run lint` and fix errors before building

**Issue:** Environment variables not working
**Solution:** Ensure variables are prefixed with `VITE_` and rebuild

### Runtime Errors

**Issue:** 404 errors on route navigation
**Solution:** Configure server to redirect all routes to `index.html` (SPA routing)

**Issue:** API calls failing
**Solution:** 
- Check CORS configuration on backend
- Verify `VITE_API_BASE_URL` is correct
- Check browser console for errors

**Issue:** Assets not loading
**Solution:** 
- Check base path configuration
- Verify asset paths in build output
- Check server configuration for static assets

### Performance Issues

**Issue:** Slow initial load
**Solution:**
- Enable code splitting (already configured)
- Use CDN for assets
- Enable gzip/brotli compression
- Optimize images and assets

**Issue:** Large bundle size
**Solution:**
- Check bundle analyzer
- Remove unused dependencies
- Use dynamic imports for large components

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use platform-specific secret management
   - Rotate API keys regularly

2. **Content Security Policy:**
   - Configure CSP headers
   - Restrict external resources
   - Use nonce for inline scripts

3. **HTTPS:**
   - Always use HTTPS in production
   - Enable HSTS
   - Use secure cookies if applicable

## Rollback Procedure

If deployment fails:

1. **Vercel/Netlify:**
   - Use dashboard to rollback to previous deployment
   - Or redeploy previous commit

2. **Manual Deployment:**
   - Keep previous build artifacts
   - Restore from backup
   - Redeploy previous version

## Support

For deployment issues:
- Check platform-specific documentation
- Review build logs
- Check browser console for errors
- Verify environment variables

