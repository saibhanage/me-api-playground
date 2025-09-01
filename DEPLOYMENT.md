# Deployment Guide

This guide covers deploying all components of the Me-API Playground to production.

## Overview

The Me-API Playground consists of three main components:
1. **PostgreSQL Database** (Supabase/Render)
2. **Node.js Backend API** (Render/Heroku)
3. **React Frontend** (Vercel/Netlify)

## 1. Database Deployment

### Option A: Supabase (Recommended)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up and create a new project

2. **Set Up Database**
   - Go to SQL Editor in your Supabase dashboard
   - Run the schema: Copy and paste contents of `database/schema.sql`
   - Run the seed data: Copy and paste contents of `database/seed.sql`

3. **Get Connection String**
   - Go to Settings > Database
   - Copy the connection string (format: `postgresql://postgres:[password]@[host]:5432/postgres`)

### Option B: Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up and create a new PostgreSQL service

2. **Set Up Database**
   - Use the built-in SQL editor or connect via psql
   - Run the schema and seed files

3. **Get Connection String**
   - Copy the connection string from your Render dashboard

## 2. Backend Deployment

### Option A: Render (Recommended)

1. **Connect Repository**
   - Push your code to GitHub
   - In Render, create a new Web Service
   - Connect your GitHub repository

2. **Configure Service**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

3. **Set Environment Variables**
   ```
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   BASIC_AUTH_USERNAME=your_admin_username
   BASIC_AUTH_PASSWORD=your_admin_password
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your app

### Option B: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

## 3. Frontend Deployment

### Option A: Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Configure Build**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Option B: Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Configure Build**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

3. **Set Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add `VITE_API_URL` with your backend URL

4. **Deploy**
   - Netlify will automatically deploy on push to main branch

## 4. Environment Variables Reference

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Server
PORT=3001
NODE_ENV=production

# Security
BASIC_AUTH_USERNAME=admin
BASIC_AUTH_PASSWORD=secure_password

# CORS
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.onrender.com
```

## 5. Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify CORS is working
- [ ] Test frontend-backend communication
- [ ] Check database connections
- [ ] Verify authentication works
- [ ] Test search and filtering
- [ ] Check responsive design
- [ ] Monitor error logs

## 6. Monitoring and Maintenance

### Health Checks
- Backend: `https://your-backend-domain/health`
- Frontend: Check browser console for errors

### Logs
- **Render**: View logs in the dashboard
- **Vercel**: Check deployment logs
- **Supabase**: Monitor database logs

### Updates
1. Update code in GitHub
2. Deployments will be automatic (if configured)
3. Monitor for any issues

## 7. Troubleshooting

### Common Issues

**CORS Errors**
- Ensure `FRONTEND_URL` is set correctly in backend
- Check that the frontend URL matches exactly

**Database Connection Issues**
- Verify `DATABASE_URL` is correct
- Check if database is accessible from your deployment platform

**Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are in package.json

**Environment Variables**
- Ensure all required variables are set
- Check for typos in variable names

### Support
- Check platform-specific documentation
- Review error logs in deployment dashboards
- Test locally before deploying

## 8. Security Considerations

1. **Use strong passwords** for database and admin access
2. **Enable HTTPS** (automatic on most platforms)
3. **Set up proper CORS** configuration
4. **Use environment variables** for sensitive data
5. **Regularly update dependencies**
6. **Monitor for security vulnerabilities**

## 9. Cost Optimization

### Free Tiers Available
- **Supabase**: 500MB database, 2GB bandwidth
- **Render**: 750 hours/month for web services
- **Vercel**: 100GB bandwidth, unlimited deployments
- **Netlify**: 100GB bandwidth, unlimited builds

### Scaling Considerations
- Monitor usage and upgrade when needed
- Consider caching strategies
- Optimize database queries
- Use CDN for static assets


