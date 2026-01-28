# Business Requirements - Confirmed Decisions
## Virtual Number & eSIM Reselling Platform

---

## ✅ Confirmed Business Model

### 1. Payment Flow: PREPAY (Wallet-Based)

**Implementation**:
- Users must have sufficient wallet balance before purchasing
- All purchases deduct from wallet immediately
- Usage (calls, SMS, data) deducts from wallet in real-time
- Low balance alerts when balance < threshold
- Auto-recharge option available

**Wallet Flow**:
```
User adds $50 to wallet
  ↓
Wallet balance: $50.00
  ↓
User purchases virtual number ($2.00)
  ↓
Wallet balance: $48.00
  ↓
User makes 10-minute call ($3.00)
  ↓
Wallet balance: $45.00
  ↓
Low balance alert (< $10)
  ↓
Auto-recharge triggers (if enabled): +$50
  ↓
Wallet balance: $95.00
```

**Database Changes**:
- `user_wallets.balance` - Always checked before transactions
- `user_wallets.auto_recharge_enabled` - User preference
- `user_wallets.auto_recharge_threshold` - Trigger amount
- `user_wallets.auto_recharge_amount` - Recharge amount
- Add `insufficient_balance` error handling

---

### 2. Number Pooling: BUY ON-DEMAND

**Implementation**:
- NO pre-purchased inventory
- When user requests a number:
  1. Show available numbers from provider API
  2. User selects number
  3. Check wallet balance
  4. Purchase from provider immediately
  5. Assign to user
  6. Deduct from wallet

**Purchase Flow**:
```
User browses available numbers
  ↓
Calls provider API (Twilio/Telnyx/Telna)
  ↓
Shows available numbers with YOUR price
  ↓
User selects number
  ↓
Check wallet balance >= price
  ↓
Purchase from provider
  ↓
Assign to user
  ↓
Deduct from wallet
  ↓
Number active
```

**Benefits**:
- No upfront inventory costs
- No unused number expenses
- Always fresh number availability
- Lower risk

**Database Changes**:
- Remove `status = 'available'` (no pre-purchased inventory)
- Numbers go directly from provider → assigned
- Add `purchase_timestamp` for tracking
- Track which provider was cheapest at purchase time

---

### 3. Data Provider: TELNA (for eSIM)

**Implementation**:
- Primary eSIM data provider: **Telna**
- Integrate Telna API for:
  - Data plan pricing
  - eSIM provisioning
  - QR code generation
  - Data usage tracking

**Telna Integration**:
```csharp
public class TelnaClient
{
    public async Task<List<DataPlan>> GetDataPlans(string region)
    {
        // Fetch available data plans from Telna
    }
    
    public async Task<EsimActivation> ProvisionEsim(string planId)
    {
        // Provision eSIM and get ICCID + LPA string
    }
    
    public async Task<DataUsage> GetDataUsage(string iccid)
    {
        // Get current data usage
    }
}
```

**Database Changes**:
- `esim_data_plans.provider_id` - References Telna provider
- Add Telna-specific fields if needed
- Store Telna API credentials in `providers` table

**Note**: Keep architecture flexible to add more eSIM providers later (Airalo, Airhub, etc.)

---

### 4. Multi-tenancy: WHITE-LABEL (Multiple Resellers)

**Implementation**:
- Platform supports multiple reseller accounts
- Each reseller has:
  - Own branding (logo, colors, domain)
  - Own pricing rules
  - Own customers
  - Own commission structure
  - Isolated data

**Multi-tenant Architecture**:
```
Super Admin (You)
  ├── Reseller 1 (Company A)
  │   ├── Custom pricing
  │   ├── 500 customers
  │   └── 10% commission to you
  ├── Reseller 2 (Company B)
  │   ├── Custom pricing
  │   ├── 300 customers
  │   └── 15% commission to you
  └── Reseller 3 (Company C)
      ├── Custom pricing
      ├── 200 customers
      └── 12% commission to you
```

**Database Changes**:
```sql
-- Add new table for resellers
CREATE TABLE resellers (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    domain VARCHAR(255) UNIQUE, -- custom-domain.com
    logo_url VARCHAR(255),
    primary_color VARCHAR(7), -- #FF5733
    secondary_color VARCHAR(7),
    commission_percentage DECIMAL(5, 2), -- % you take from their sales
    status ENUM('active', 'suspended', 'trial') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add reseller_id to relevant tables
ALTER TABLE users ADD COLUMN reseller_id CHAR(36);
ALTER TABLE virtual_numbers ADD COLUMN reseller_id CHAR(36);
ALTER TABLE esim_activations ADD COLUMN reseller_id CHAR(36);
ALTER TABLE pricing_rules ADD COLUMN reseller_id CHAR(36);
ALTER TABLE packages ADD COLUMN reseller_id CHAR(36);

-- Add foreign keys
ALTER TABLE users ADD FOREIGN KEY (reseller_id) REFERENCES resellers(id);
-- ... add for all other tables
```

**Features**:
- Reseller dashboard showing their sales
- Commission tracking and payouts
- Reseller can set their own markup on top of your base price
- Data isolation (resellers can't see each other's customers)

**Pricing Model**:
```
Provider base price: $0.18/min
  ↓
Your markup: +$0.07 → Your price: $0.25/min
  ↓
Reseller markup: +$0.05 → Reseller price: $0.30/min
  ↓
End user pays: $0.30/min
  ↓
Revenue split:
- Provider gets: $0.18
- You get: $0.07 (your profit)
- Reseller gets: $0.05 (their profit)
```

---

### 5. Auto-renewal: USER CHOICE (Optional)

**Implementation**:
- Users can enable/disable auto-renewal per service
- Auto-renewal options:
  - Virtual numbers (monthly fee)
  - eSIM data plans
  - Package subscriptions
  - Wallet auto-recharge

**User Controls**:
```typescript
interface AutoRenewalSettings {
  virtualNumbers: {
    enabled: boolean;
    renewalDay: number; // 1-28
  };
  esimPlans: {
    enabled: boolean;
    renewBeforeDays: number; // renew 3 days before expiry
  };
  packages: {
    enabled: boolean;
  };
  wallet: {
    autoRecharge: boolean;
    threshold: number; // trigger when balance < $10
    amount: number; // add $50
  };
}
```

**Database Changes**:
```sql
-- Virtual numbers
ALTER TABLE virtual_numbers 
ADD COLUMN auto_renew BOOLEAN DEFAULT FALSE;

-- eSIM activations
ALTER TABLE esim_activations 
ADD COLUMN auto_renew BOOLEAN DEFAULT FALSE;

-- Package subscriptions (already has this)
-- package_subscriptions.auto_renew

-- Wallet (already has this)
-- user_wallets.auto_recharge_enabled
```

**Auto-renewal Logic**:
```
Daily cron job runs at 00:00 UTC
  ↓
Check services expiring in next 24 hours
  ↓
Filter services with auto_renew = TRUE
  ↓
For each service:
  - Check wallet balance
  - If sufficient: Renew service
  - If insufficient: Send notification
  - Log renewal attempt
```

**User Notifications**:
- 7 days before expiry: "Your service expires soon. Auto-renew is ON/OFF"
- 1 day before expiry: "Your service expires tomorrow"
- On renewal: "Service renewed successfully. $X deducted from wallet"
- Failed renewal: "Auto-renewal failed. Insufficient balance. Please add funds"

---

## 🔄 Updated Purchase Flows

### Virtual Number Purchase (On-Demand)
```
1. User clicks "Get Virtual Number"
2. System shows country selection
3. User selects country (e.g., USA)
4. System calls provider APIs (Twilio, Telnyx, Telna)
5. System shows available numbers with YOUR prices
6. User selects number
7. System checks wallet balance >= price
8. If insufficient: Show "Add funds" prompt
9. If sufficient:
   a. Purchase number from provider
   b. Deduct from wallet
   c. Assign to user
   d. Activate number
10. User receives number details
```

### eSIM Data Purchase (Telna)
```
1. User browses data plans
2. System shows Telna plans with YOUR prices
3. User selects plan (e.g., 5GB Europe)
4. System checks wallet balance >= price
5. If insufficient: Show "Add funds" prompt
6. If sufficient:
   a. Purchase plan from Telna
   b. Deduct from wallet
   c. Generate QR code
   d. Create activation record
7. User receives QR code
```

### Reseller Purchase Flow
```
1. End user visits reseller's custom domain
2. Sees reseller's branding and prices
3. Makes purchase
4. Payment goes to reseller's account
5. Reseller's system calls YOUR API
6. YOUR system:
   a. Purchases from provider
   b. Charges reseller (your price)
   c. Keeps your profit
7. Reseller keeps their markup
```

---

## 📊 Updated Revenue Model

### Direct Sales (Your Platform)
```
User pays: $0.30/min
Provider cost: $0.18/min
Your profit: $0.12/min (67% margin)
```

### Reseller Sales (White-label)
```
End user pays reseller: $0.30/min
Reseller pays you: $0.25/min
Provider cost: $0.18/min

Revenue split:
- Your profit: $0.07/min (from reseller)
- Reseller profit: $0.05/min (their markup)
- Total margin: $0.12/min (same as direct)
```

---

## ✅ Implementation Priority Updates

### Phase 1: Core (Week 1-2)
1. Wallet system (prepay)
2. On-demand number purchase
3. Telna integration
4. Basic pricing

### Phase 2: Multi-tenancy (Week 3-4)
1. Reseller accounts
2. Data isolation
3. Custom branding
4. Commission tracking

### Phase 3: Auto-renewal (Week 5)
1. User preferences
2. Cron jobs
3. Notifications
4. Failed renewal handling

---

## 🎯 Next Steps

1. ✅ Update database schema with reseller tables
2. ✅ Implement wallet-first purchase flow
3. ✅ Create Telna API client
4. ✅ Build multi-tenant architecture
5. ✅ Add auto-renewal options

**Ready to proceed with implementation!**
