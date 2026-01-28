# UI Rebuild Plan - Virtual Number & eSIM Reselling Platform

## 🎯 Purpose

Rebuild the React UI to match the **exact requirements** for a Virtual Number & eSIM Reselling Platform.

**Current Problem**: Generic admin panel UI doesn't match the reselling business model.

**Solution**: Create specialized UI for:
- Provider management (Twilio, Telnyx, Telna)
- Pricing & markup configuration
- Virtual number marketplace
- eSIM data marketplace
- Reseller/white-label management
- Profit tracking & analytics

---

## 📱 Complete Page Structure

### 1. Dashboard (Home)
**Purpose**: Overview of business performance

**Widgets**:
- Total Revenue (today, week, month)
- Total Profit (with margin %)
- Active Services (numbers, eSIM, packages)
- Wallet Balance
- Recent Transactions
- Top Selling Services
- Provider Cost Comparison Chart
- Revenue vs Profit Chart
- Active Users Count
- Low Stock Alerts

**File**: `src/features/dashboard/Dashboard.tsx`

---

### 2. Provider Management

#### 2.1 Provider List
**Purpose**: Manage Twilio, Telnyx, Telna integrations

**Features**:
- Provider cards (Twilio, Telnyx, Telna)
- Connection status (Connected/Disconnected)
- API credentials management
- Test connection button
- Provider statistics (total purchases, cost)
- Enable/disable provider

**File**: `src/features/providers/ProviderList.tsx`

#### 2.2 Provider Configuration
**Purpose**: Configure individual provider

**Features**:
- API credentials (Account SID, Auth Token, API Key)
- Webhook URLs
- Default settings
- Cost tracking
- Usage statistics

**File**: `src/features/providers/ProviderConfig.tsx`

---

### 3. Pricing & Markup

#### 3.1 Pricing Rules
**Purpose**: Manage markup on provider prices

**Features**:
- Service type filter (voice, SMS, data, numbers)
- Country selection
- Provider base price (auto-fetched)
- Your markup (% or fixed)
- Selling price (calculated)
- Profit margin display
- Bulk update
- Price history

**File**: `src/features/pricing/PricingRules.tsx`

#### 3.2 Price Calculator
**Purpose**: Calculate prices before setting

**Features**:
- Select service type
- Select country
- Enter provider cost
- Enter markup
- See selling price
- See profit margin
- Compare with competitors

**File**: `src/features/pricing/PriceCalculator.tsx`

#### 3.3 Price Comparison
**Purpose**: Compare provider prices

**Features**:
- Service type selection
- Country selection
- Show prices from all providers
- Highlight cheapest
- Show your markup
- Show final selling price

**File**: `src/features/pricing/PriceComparison.tsx`

---

### 4. Virtual Numbers

#### 4.1 Number Marketplace
**Purpose**: Customer-facing page to buy numbers

**Features**:
- Country selection dropdown
- Number type filter (local, toll-free, mobile)
- Search available numbers
- Display numbers with prices
- "Buy Now" button
- Wallet balance check
- Purchase confirmation

**File**: `src/features/numbers/NumberMarketplace.tsx`

#### 4.2 My Numbers
**Purpose**: User's purchased numbers

**Features**:
- List of owned numbers
- Number details (country, type, provider)
- Usage statistics (calls, SMS)
- Monthly cost
- Auto-renew toggle
- Release number button
- Call/SMS history

**File**: `src/features/numbers/MyNumbers.tsx`

#### 4.3 Number Inventory (Admin)
**Purpose**: Admin view of all numbers

**Features**:
- All purchased numbers
- Filter by user, country, provider
- Status (active, suspended, released)
- Cost vs revenue
- Profit per number
- Bulk actions

**File**: `src/features/numbers/NumberInventory.tsx`

---

### 5. eSIM Data Plans

#### 5.1 eSIM Marketplace
**Purpose**: Customer-facing page to buy eSIM

**Features**:
- Region/country selection
- Data plan cards (1GB, 5GB, 10GB, etc.)
- Validity period (7 days, 30 days, etc.)
- Price display
- "Buy Now" button
- Wallet balance check
- QR code generation after purchase

**File**: `src/features/esim/EsimMarketplace.tsx`

#### 5.2 My eSIMs
**Purpose**: User's purchased eSIMs

**Features**:
- List of activations
- QR code display
- LPA string
- Data usage (used/total)
- Expiry date
- Auto-renew toggle
- Top-up button
- Download QR code

**File**: `src/features/esim/MyEsims.tsx`

#### 5.3 eSIM Plans (Admin)
**Purpose**: Manage eSIM data plans

**Features**:
- Create new plan
- Edit existing plans
- Set pricing (provider cost + markup)
- Set validity
- Enable/disable plans
- View sales statistics

**File**: `src/features/esim/EsimPlans.tsx`

---

### 6. Packages & Bundles

#### 6.1 Package Marketplace
**Purpose**: Customer-facing bundle offers

**Features**:
- Package cards (Starter, Business, Enterprise)
- Package details (numbers, minutes, SMS, data)
- Price with discount badge
- "Subscribe" button
- Comparison table
- Best value badge

**File**: `src/features/packages/PackageMarketplace.tsx`

#### 6.2 My Subscriptions
**Purpose**: User's active packages

**Features**:
- Active subscriptions
- Usage tracking (minutes, SMS, data used)
- Renewal date
- Auto-renew toggle
- Cancel subscription
- Upgrade/downgrade

**File**: `src/features/packages/MySubscriptions.tsx`

#### 6.3 Package Management (Admin)
**Purpose**: Create and manage packages

**Features**:
- Create package
- Set inclusions (numbers, minutes, SMS, data)
- Set price
- Set validity
- Discount percentage
- Enable/disable
- Sales statistics

**File**: `src/features/packages/PackageManagement.tsx`

---

### 7. Wallet & Payments

#### 7.1 My Wallet
**Purpose**: User wallet management

**Features**:
- Current balance (large display)
- Add funds button
- Transaction history
- Auto-recharge settings
- Payment methods
- Wallet statistics

**File**: `src/features/wallet/MyWallet.tsx`

#### 7.2 Add Funds
**Purpose**: Recharge wallet

**Features**:
- Amount selection (quick amounts: $10, $25, $50, $100)
- Custom amount input
- Payment method selection
- Stripe integration
- Promo code input
- Confirm payment

**File**: `src/features/wallet/AddFunds.tsx`

#### 7.3 Transaction History
**Purpose**: View all transactions

**Features**:
- Date range filter
- Transaction type filter (credit, debit)
- Amount
- Description
- Balance after
- Export to CSV

**File**: `src/features/wallet/TransactionHistory.tsx`

---

### 8. Promotions & Discounts

#### 8.1 Promo Codes (Admin)
**Purpose**: Create and manage promo codes

**Features**:
- Create promo code
- Code string
- Discount type (%, fixed)
- Discount value
- Min purchase amount
- Usage limit
- Validity period
- Active/inactive toggle
- Usage statistics

**File**: `src/features/promotions/PromoCodes.tsx`

#### 8.2 Active Promotions
**Purpose**: Customer view of available promos

**Features**:
- List of active promotions
- Promo code display
- Discount details
- Copy code button
- Apply at checkout

**File**: `src/features/promotions/ActivePromotions.tsx`

---

### 9. Referrals & Loyalty

#### 9.1 My Referrals
**Purpose**: User referral dashboard

**Features**:
- Unique referral code (large display)
- Share buttons (WhatsApp, Email, Copy)
- Total referrals count
- Successful referrals
- Rewards earned
- Referral list with status

**File**: `src/features/referrals/MyReferrals.tsx`

#### 9.2 Loyalty Program
**Purpose**: User loyalty status

**Features**:
- Current tier (Bronze, Silver, Gold, Platinum)
- Points balance
- Points to next tier
- Tier benefits
- Points history
- Redeem points

**File**: `src/features/loyalty/LoyaltyProgram.tsx`

#### 9.3 Leaderboard
**Purpose**: Gamification

**Features**:
- Top referrers
- Rank, name, referrals, points
- User's rank
- Prizes/rewards

**File**: `src/features/loyalty/Leaderboard.tsx`

---

### 10. Reseller Management (White-label)

#### 10.1 Reseller List (Super Admin)
**Purpose**: Manage reseller accounts

**Features**:
- List of resellers
- Reseller name, domain
- Commission percentage
- Total sales
- Status (active, suspended)
- Add new reseller

**File**: `src/features/resellers/ResellerList.tsx`

#### 10.2 Reseller Dashboard
**Purpose**: Reseller's own dashboard

**Features**:
- Sales overview
- Commission earned
- Customer count
- Custom branding settings
- Pricing rules
- Customer list

**File**: `src/features/resellers/ResellerDashboard.tsx`

---

### 11. Analytics & Reports

#### 11.1 Revenue Dashboard
**Purpose**: Financial analytics

**Features**:
- Revenue chart (daily, weekly, monthly)
- Revenue by service type
- Revenue by country
- Profit margin chart
- Provider cost breakdown
- Export reports

**File**: `src/features/analytics/RevenueDashboard.tsx`

#### 11.2 Usage Analytics
**Purpose**: Service usage statistics

**Features**:
- Call minutes used
- SMS sent
- Data consumed
- Peak usage hours
- Popular destinations
- Usage trends

**File**: `src/features/analytics/UsageAnalytics.tsx`

#### 11.3 Customer Analytics
**Purpose**: User behavior

**Features**:
- New users (daily, weekly, monthly)
- Active users
- Churn rate
- User lifetime value
- Acquisition sources
- Retention rate

**File**: `src/features/analytics/CustomerAnalytics.tsx`

---

### 12. User Management

#### 12.1 User List (Admin)
**Purpose**: Manage all users

**Features**:
- User table (name, email, role, status)
- Filter by role, status
- Search users
- View user details
- Suspend/activate user
- Reset password

**File**: `src/features/users/UserList.tsx`

#### 12.2 User Profile
**Purpose**: User's own profile

**Features**:
- Personal information
- Email, phone
- Change password
- Notification preferences
- Account settings
- Delete account

**File**: `src/features/users/UserProfile.tsx`

---

### 13. Settings

#### 13.1 General Settings
**Purpose**: Platform configuration

**Features**:
- Company name, logo
- Contact information
- Currency settings
- Timezone
- Language

**File**: `src/features/settings/GeneralSettings.tsx`

#### 13.2 Notification Settings
**Purpose**: Configure notifications

**Features**:
- Email notifications toggle
- SMS notifications toggle
- Low balance alerts
- Usage alerts
- Expiry alerts
- Marketing emails

**File**: `src/features/settings/NotificationSettings.tsx`

#### 13.3 API Settings
**Purpose**: API key management

**Features**:
- Generate API key
- View API keys
- Revoke API key
- API documentation link
- Webhook configuration

**File**: `src/features/settings/ApiSettings.tsx`

---

## 🎨 Navigation Structure

```
├── Dashboard
├── Marketplace
│   ├── Virtual Numbers
│   ├── eSIM Data Plans
│   └── Packages
├── My Services
│   ├── My Numbers
│   ├── My eSIMs
│   └── My Subscriptions
├── Wallet
│   ├── Balance
│   ├── Add Funds
│   └── Transactions
├── Promotions
│   ├── Active Offers
│   └── My Referrals
├── Loyalty
│   ├── My Status
│   └── Leaderboard
├── Admin (Admin only)
│   ├── Providers
│   ├── Pricing Rules
│   ├── Number Inventory
│   ├── eSIM Plans
│   ├── Package Management
│   ├── Promo Codes
│   ├── Resellers
│   ├── Users
│   └── Analytics
└── Settings
    ├── Profile
    ├── Notifications
    └── API Keys
```

---

## 🚀 Implementation Roadmap

### Phase 1: Core Marketplace (Week 1)
- [ ] Dashboard
- [ ] Number Marketplace
- [ ] eSIM Marketplace
- [ ] My Wallet
- [ ] Add Funds

### Phase 2: User Services (Week 2)
- [ ] My Numbers
- [ ] My eSIMs
- [ ] My Subscriptions
- [ ] Transaction History
- [ ] User Profile

### Phase 3: Admin Tools (Week 3)
- [ ] Provider Management
- [ ] Pricing Rules
- [ ] Price Calculator
- [ ] Number Inventory
- [ ] eSIM Plans

### Phase 4: Packages & Promotions (Week 4)
- [ ] Package Marketplace
- [ ] Package Management
- [ ] Promo Codes
- [ ] Active Promotions

### Phase 5: Referrals & Loyalty (Week 5)
- [ ] My Referrals
- [ ] Loyalty Program
- [ ] Leaderboard

### Phase 6: Reseller & Analytics (Week 6)
- [ ] Reseller List
- [ ] Reseller Dashboard
- [ ] Revenue Dashboard
- [ ] Usage Analytics
- [ ] Customer Analytics

### Phase 7: Settings & Polish (Week 7)
- [ ] General Settings
- [ ] Notification Settings
- [ ] API Settings
- [ ] User Management
- [ ] Final polish

---

## 📦 Component Library

### Reusable Components

1. **PriceCard** - Display service prices
2. **ServiceCard** - Virtual number/eSIM card
3. **PackageCard** - Bundle package display
4. **WalletBalance** - Balance widget
5. **TransactionRow** - Transaction list item
6. **StatCard** - Dashboard statistics
7. **ProviderBadge** - Provider indicator
8. **ProfitBadge** - Profit margin display
9. **UsageBar** - Usage progress bar
10. **QRCodeDisplay** - eSIM QR code

---

## 🎯 Key Differences from Current UI

**Current UI**: Generic admin panel  
**New UI**: Specialized reselling platform

**Changes**:
1. ✅ Add **Provider Management** pages
2. ✅ Add **Pricing & Markup** configuration
3. ✅ Add **Marketplace** pages (customer-facing)
4. ✅ Add **Profit Tracking** everywhere
5. ✅ Add **Reseller Management** (white-label)
6. ✅ Redesign **Dashboard** for reselling metrics
7. ✅ Add **Wallet-first** purchase flow
8. ✅ Add **On-demand** number purchasing
9. ✅ Add **QR code** generation for eSIM
10. ✅ Add **Commission tracking** for resellers

---

## ✅ Next Steps

1. **Approve this plan**
2. **Start with Phase 1** (Core Marketplace)
3. **Build incrementally** (one phase at a time)
4. **Test each phase** before moving to next

**Estimated Timeline**: 7 weeks for complete rebuild

**Ready to start?**
