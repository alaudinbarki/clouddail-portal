# Quick Start Deployment Guide
## Virtual Number & eSIM Reselling Platform

**Time to Deploy**: 2-3 hours  
**Difficulty**: Intermediate

---

## 📋 Prerequisites

- MySQL 8.0+ installed
- .NET 9 SDK installed
- Node.js 18+ installed
- Stripe account (for payments)
- Provider accounts (Twilio, Telnyx, Telna)

---

## 🚀 Step-by-Step Deployment

### Step 1: Database Setup (15 minutes)

```bash
# 1. Create database
mysql -u root -p
CREATE DATABASE clouddail_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 2. Create user
CREATE USER 'clouddail_user'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON clouddail_db.* TO 'clouddail_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 3. Run schema
cd /path/to/project
mysql -u root -p clouddail_db < .gemini/antigravity/brain/.../database_schema.sql

# 4. Verify
mysql -u root -p clouddail_db
SHOW TABLES;  # Should show 30 tables
EXIT;
```

---

### Step 2: Backend API Setup (20 minutes)

```bash
# 1. Navigate to backend
cd backend/CloudDail.API

# 2. Install packages
dotnet restore

# 3. Configure appsettings.json
nano appsettings.json
```

**appsettings.json**:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=clouddail_db;User=clouddail_user;Password=YOUR_PASSWORD;"
  },
  "JWT": {
    "SecretKey": "YOUR_SUPER_SECRET_KEY_MIN_32_CHARS",
    "Issuer": "CloudDail",
    "Audience": "CloudDailUsers",
    "ExpiryMinutes": 1440
  },
  "Providers": {
    "Twilio": {
      "AccountSid": "ACxxxxxxxxxxxxx",
      "AuthToken": "your_twilio_token"
    },
    "Telnyx": {
      "ApiKey": "KEYxxxxxxxxxxxxx"
    },
    "Telna": {
      "ApiKey": "your_telna_key",
      "ApiSecret": "your_telna_secret"
    }
  },
  "Stripe": {
    "PublishableKey": "REDACTED_PK_TEST_xxxxx",
    "SecretKey": "REDACTED_SK_TEST_xxxxx"
  }
}
```

```bash
# 4. Run backend
dotnet run

# Should start at https://localhost:5001
# Test: Open https://localhost:5001/swagger
```

---

### Step 3: Frontend Setup (15 minutes)

```bash
# 1. Navigate to frontend
cd /path/to/project

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Configure environment
nano .env
```

**.env**:
```
VITE_API_URL=https://localhost:5001/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=REDACTED_PK_TEST_xxxxx
```

```bash
# 4. Start frontend
npm run dev

# Should start at http://localhost:5173
```

---

### Step 4: Create Admin User (5 minutes)

```bash
# Option A: Via MySQL
mysql -u root -p clouddail_db

INSERT INTO users (id, email, password_hash, first_name, last_name, role, email_verified)
VALUES (
  UUID(),
  'admin@yourdomain.com',
  '$2a$11$hashed_password_here',  # Use BCrypt to hash
  'Admin',
  'User',
  'super_admin',
  TRUE
);

# Option B: Via API (after backend is running)
curl -X POST https://localhost:5001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yourdomain.com",
    "password": "SecurePassword123!",
    "firstName": "Admin",
    "lastName": "User"
  }'
```

---

### Step 5: Configure Providers (10 minutes)

```bash
# Insert provider records
mysql -u root -p clouddail_db

INSERT INTO providers (id, name, type, api_endpoint, status) VALUES
(UUID(), 'Twilio', 'voice', 'https://api.twilio.com', 'active'),
(UUID(), 'Telnyx', 'voice', 'https://api.telnyx.com', 'active'),
(UUID(), 'Telna', 'data', 'https://api.telna.com', 'active');
```

---

### Step 6: Set Default Pricing (10 minutes)

```bash
# Create default pricing rules
# Via API or MySQL

# Example: Voice pricing for US
INSERT INTO pricing_rules (
  id, service_type, country_code, markup_type, markup_value, is_active
) VALUES (
  UUID(), 'voice', 'US', 'percentage', 50.00, TRUE
);

# Example: SMS pricing for US
INSERT INTO pricing_rules (
  id, service_type, country_code, markup_type, markup_value, is_active
) VALUES (
  UUID(), 'sms', 'US', 'percentage', 50.00, TRUE
);
```

---

### Step 7: Create Loyalty Tiers (5 minutes)

```bash
mysql -u root -p clouddail_db

INSERT INTO loyalty_tiers (id, name, description, min_points, max_points, discount_percentage, bonus_points_multiplier, benefits, badge_color) VALUES
(UUID(), 'Bronze', 'Entry level', 0, 999, 0, 1.0, '["Basic support"]', '#CD7F32'),
(UUID(), 'Silver', 'Regular customer', 1000, 4999, 5, 1.2, '["5% discount", "Priority support"]', '#C0C0C0'),
(UUID(), 'Gold', 'Premium customer', 5000, 9999, 10, 1.5, '["10% discount", "Free porting"]', '#FFD700'),
(UUID(), 'Platinum', 'VIP customer', 10000, 999999, 15, 2.0, '["15% discount", "Dedicated manager"]', '#E5E4E2');
```

---

### Step 8: Test the System (20 minutes)

#### Test 1: Login
```bash
# Open browser: http://localhost:5173
# Login with admin credentials
```

#### Test 2: Check Dashboard
```
# Should see:
- Revenue widgets
- Wallet balance
- Active services
```

#### Test 3: Add Wallet Funds
```
# Navigate to Wallet
# Click "Add Funds"
# Use Stripe test card: 4242 4242 4242 4242
# Expiry: Any future date
# CVC: Any 3 digits
```

#### Test 4: Search Virtual Numbers
```
# Navigate to Number Marketplace
# Select country: United States
# Click Search
# Should show available numbers from providers
```

#### Test 5: Purchase Number
```
# Select a number
# Click "Buy Now"
# Confirm purchase
# Check wallet balance (should be deducted)
# Check "My Numbers" page
```

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check MySQL connection
mysql -u clouddail_user -p clouddail_db

# Check appsettings.json
# Verify connection string

# Check logs
tail -f logs/app.log
```

### Frontend won't connect to backend
```bash
# Check .env file
cat .env

# Verify API URL
# Check CORS settings in backend

# Check browser console for errors
```

### Provider API errors
```bash
# Verify API credentials in appsettings.json
# Test Twilio: https://www.twilio.com/console
# Test Telnyx: https://portal.telnyx.com
# Test Telna: Contact Telna support
```

---

## 📊 Post-Deployment Checklist

- [ ] Database running and accessible
- [ ] Backend API running (https://localhost:5001)
- [ ] Frontend running (http://localhost:5173)
- [ ] Admin user created
- [ ] Can login successfully
- [ ] Providers configured
- [ ] Pricing rules set
- [ ] Loyalty tiers created
- [ ] Stripe test payment works
- [ ] Can search numbers
- [ ] Can purchase number
- [ ] Wallet transactions working

---

## 🌐 Production Deployment

### Database
```bash
# Use managed MySQL (AWS RDS, DigitalOcean, etc.)
# Enable SSL
# Set up automated backups
# Configure monitoring
```

### Backend
```bash
# Deploy to:
- Azure App Service
- AWS Elastic Beanstalk
- DigitalOcean App Platform
- Heroku

# Update appsettings.Production.json
# Enable HTTPS
# Set up logging (Application Insights, Sentry)
# Configure auto-scaling
```

### Frontend
```bash
# Build production
npm run build

# Deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps

# Update .env.production
# Enable CDN
# Configure custom domain
```

### DNS & SSL
```bash
# Point domain to servers
# Enable SSL certificates (Let's Encrypt)
# Configure HTTPS redirect
```

---

## 📈 Monitoring

### Application Monitoring
- Application Insights (Azure)
- New Relic
- Datadog

### Error Tracking
- Sentry
- Bugsnag
- Rollbar

### Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

---

## 🔐 Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secret key
- [ ] Enable HTTPS everywhere
- [ ] Configure CORS properly
- [ ] Encrypt provider API keys
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Backup encryption
- [ ] 2FA for admin accounts

---

## 📞 Support

**Documentation**: `/Users/alaudinburki/.gemini/antigravity/brain/...`

**Key Files**:
- `api_reference_complete.md` - All API endpoints
- `database_configuration.md` - Database setup
- `ui_rebuild_plan.md` - UI structure
- `complete_project_summary.md` - Full overview

---

**Deployment Time**: ~2-3 hours  
**You're Ready to Launch!** 🚀
