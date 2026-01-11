# AWS Amplify Deployment Guide

## Overview

This guide covers deploying the AI Chatbot UI to AWS Amplify and connecting it to the production backend.

## Prerequisites

- AWS Account
- GitHub repository with the UI code
- Backend deployed and running at: `https://ai-chatbot-service.abhinaykumar.com`

## Step-by-Step Deployment

### Step 1: Prepare Repository

1. **Ensure all changes are committed:**
   ```bash
   git add .
   git commit -m "Add Amplify configuration and update API endpoint"
   git push origin main
   ```

### Step 2: Deploy via AWS Amplify Console

1. **Go to AWS Amplify Console:**
   - Navigate to: https://console.aws.amazon.com/amplify
   - Click "New app" → "Host web app"

2. **Connect Repository:**
   - Choose your Git provider (GitHub, GitLab, Bitbucket, etc.)
   - Authorize AWS Amplify to access your repositories
   - Select the `aichatbot-ui` repository
   - Select the branch (usually `main` or `master`)

3. **Configure Build Settings:**
   - AWS Amplify should auto-detect the build settings from `amplify.yml`
   - Verify the build settings:
     - **Build command:** `npm run build`
     - **Output directory:** `dist`
   - If auto-detection doesn't work, manually paste the content from `amplify.yml`

4. **Add Environment Variables:**
   - Click "Advanced settings" → "Environment variables"
   - Add the following variable:
     ```
     Key: VITE_API_URL
     Value: https://ai-chatbot-service.abhinaykumar.com
     ```
   - Click "Save"

5. **Review and Deploy:**
   - Review all settings
   - Click "Save and deploy"
   - Amplify will:
     - Clone your repository
     - Install dependencies (`npm ci`)
     - Build the application (`npm run build`)
     - Deploy to a unique Amplify URL

### Step 3: Wait for Deployment

- The deployment process takes 3-5 minutes
- You can watch the build logs in real-time
- Once complete, you'll get a URL like: `https://main.d1234567890.amplifyapp.com`

### Step 4: Update Backend CORS (After Getting Amplify URL)

After deployment, you'll receive your Amplify URL. Update the backend CORS:

1. **Get your Amplify URL:**
   - It will be in the format: `https://main.xxxxx.amplifyapp.com`
   - Copy this URL

2. **Update backend CORS:**
   - Edit `src/main.py` in the backend repository
   - Update the CORS configuration:
     ```python
     app.add_middleware(
         CORSMiddleware,
         allow_origins=[
             "https://main.xxxxx.amplifyapp.com",  # Your Amplify URL
             "http://localhost:3000",  # Local development
         ],
         allow_credentials=True,
         allow_methods=["*"],
         allow_headers=["*"],
     )
     ```
   - Commit and push to trigger backend redeployment

### Step 5: Test the Deployment

1. **Visit your Amplify URL:**
   - Open the URL provided by Amplify
   - The UI should load

2. **Test API Connection:**
   - Try sending a message in the chat
   - Check browser console for any CORS errors
   - Verify the API calls are going to: `https://ai-chatbot-service.abhinaykumar.com`

3. **Verify Backend Health:**
   - Visit: `https://ai-chatbot-service.abhinaykumar.com/health`
   - Should return: `{"status": "healthy"}`

## Environment Variables

### Required in Amplify

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `https://ai-chatbot-service.abhinaykumar.com` | Backend API endpoint |

### Optional

- `VITE_API_URL` can be omitted if you want to use the default in `constants.ts`

## Custom Domain (Optional)

1. **In Amplify Console:**
   - Go to your app → "Domain management"
   - Click "Add domain"
   - Enter your domain name
   - Follow DNS verification steps

2. **Update Backend CORS:**
   - Add your custom domain to the `allow_origins` list in backend

## Continuous Deployment

AWS Amplify automatically deploys when you push to the connected branch:
- Push to `main` → Automatic deployment
- Build logs available in Amplify Console
- Rollback available if needed

## Troubleshooting

### Build Fails

- **Check build logs** in Amplify Console
- **Verify Node.js version** (Amplify uses Node 18 by default)
- **Check `package.json`** scripts are correct

### CORS Errors

- **Verify backend CORS** allows your Amplify domain
- **Check browser console** for specific error messages
- **Ensure backend is running** at the specified IP

### API Connection Issues

- **Verify backend URL** is correct: `https://ai-chatbot-service.abhinaykumar.com`
- **Check backend health:** `https://ai-chatbot-service.abhinaykumar.com/health`
- **Verify environment variable** `VITE_API_URL` is set correctly

### Mixed Content Warnings

- **Issue:** HTTPS (Amplify) calling HTTP (backend)
- **Solution:** 
  - Backend is now using HTTPS at `https://ai-chatbot-service.abhinaykumar.com`
  - No mixed content warnings when using the HTTPS endpoint

## Cost

AWS Amplify Hosting:
- **Free tier:** 1,000 build minutes/month, 15 GB storage, 5 GB served/month
- **After free tier:** ~$0.01 per build minute, $0.023/GB storage, $0.15/GB served
- **Estimated cost for portfolio:** $0-5/month (likely free tier)

## Next Steps

1. ✅ Deploy to Amplify
2. ✅ Get Amplify URL
3. ✅ Update backend CORS with Amplify URL
4. ✅ Test end-to-end
5. ⬜ (Optional) Set up custom domain
6. ⬜ (Optional) Add SSL to backend (via ALB or domain)

## Quick Reference

- **Backend API:** `https://ai-chatbot-service.abhinaykumar.com`
- **Backend Health:** `https://ai-chatbot-service.abhinaykumar.com/health`
- **Backend Docs:** `https://ai-chatbot-service.abhinaykumar.com/docs`
- **Amplify Console:** https://console.aws.amazon.com/amplify

