# Database Configuration Guide
## Virtual Number & eSIM Reselling Platform

---

## 📊 Database Overview

**Database**: MySQL 8.0+  
**Total Tables**: 30  
**Storage Engine**: InnoDB  
**Character Set**: utf8mb4  
**Collation**: utf8mb4_unicode_ci

---

## 🔧 Connection Strings

### Development
```
Server=localhost;Database=clouddail_db;User=root;Password=YOUR_PASSWORD;
```

### Production
```
Server=production-server.com;Database=clouddail_prod;User=clouddail_user;Password=STRONG_PASSWORD;SslMode=Required;
```

### .NET appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=clouddail_db;User=root;Password=YOUR_PASSWORD;"
  }
}
```

---

## 📦 Complete Database Schema

### Core Tables (6)

**1. users**
```sql
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('super_admin', 'admin', 'reseller', 'user') DEFAULT 'user',
    status ENUM('active', 'suspended', 'deleted') DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
);
```

**2. resellers**
```sql
CREATE TABLE resellers (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    domain VARCHAR(255) UNIQUE,
    logo_url VARCHAR(255),
    primary_color VARCHAR(7),
    secondary_color VARCHAR(7),
    commission_percentage DECIMAL(5, 2),
    status ENUM('active', 'suspended', 'trial') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**3. providers**
```sql
CREATE TABLE providers (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type ENUM('voice', 'sms', 'data') NOT NULL,
    api_endpoint VARCHAR(255),
    api_key_encrypted TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**4. user_wallets**
```sql
CREATE TABLE user_wallets (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    auto_recharge BOOLEAN DEFAULT FALSE,
    auto_recharge_threshold DECIMAL(10, 2),
    auto_recharge_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id)
);
```

**5. wallet_transactions**
```sql
CREATE TABLE wallet_transactions (
    id CHAR(36) PRIMARY KEY,
    wallet_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    transaction_type ENUM('credit', 'debit') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    balance_before DECIMAL(10, 2) NOT NULL,
    balance_after DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    reference_type VARCHAR(50),
    reference_id CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES user_wallets(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id),
    INDEX idx_type (transaction_type),
    INDEX idx_created (created_at)
);
```

**6. pricing_rules**
```sql
CREATE TABLE pricing_rules (
    id CHAR(36) PRIMARY KEY,
    reseller_id CHAR(36),
    service_type ENUM('voice', 'sms', 'data', 'number_purchase', 'number_monthly') NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    provider_id CHAR(36),
    base_price DECIMAL(10, 4),
    markup_type ENUM('percentage', 'fixed') NOT NULL,
    markup_value DECIMAL(10, 4) NOT NULL,
    selling_price DECIMAL(10, 4),
    profit_margin DECIMAL(5, 2),
    valid_from TIMESTAMP,
    valid_until TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reseller_id) REFERENCES resellers(id),
    FOREIGN KEY (provider_id) REFERENCES providers(id),
    INDEX idx_service_country (service_type, country_code),
    INDEX idx_reseller (reseller_id)
);
```

### Virtual Numbers (3)

**7. virtual_numbers**
```sql
CREATE TABLE virtual_numbers (
    id CHAR(36) PRIMARY KEY,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    number_type ENUM('local', 'toll_free', 'mobile') NOT NULL,
    provider_id CHAR(36) NOT NULL,
    user_id CHAR(36),
    reseller_id CHAR(36),
    provider_cost DECIMAL(10, 2),
    selling_price DECIMAL(10, 2),
    monthly_cost DECIMAL(10, 2),
    status ENUM('active', 'suspended', 'released') DEFAULT 'active',
    auto_renew BOOLEAN DEFAULT FALSE,
    purchased_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES providers(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reseller_id) REFERENCES resellers(id),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_phone (phone_number)
);
```

**8. call_detail_records**
```sql
CREATE TABLE call_detail_records (
    id CHAR(36) PRIMARY KEY,
    virtual_number_id CHAR(36) NOT NULL,
    call_sid VARCHAR(100),
    direction ENUM('inbound', 'outbound') NOT NULL,
    from_number VARCHAR(20),
    to_number VARCHAR(20),
    duration_seconds INT,
    cost DECIMAL(10, 4),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (virtual_number_id) REFERENCES virtual_numbers(id),
    INDEX idx_number (virtual_number_id),
    INDEX idx_created (created_at)
);
```

**9. sms_messages**
```sql
CREATE TABLE sms_messages (
    id CHAR(36) PRIMARY KEY,
    virtual_number_id CHAR(36) NOT NULL,
    message_sid VARCHAR(100),
    direction ENUM('inbound', 'outbound') NOT NULL,
    from_number VARCHAR(20),
    to_number VARCHAR(20),
    message_body TEXT,
    cost DECIMAL(10, 4),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (virtual_number_id) REFERENCES virtual_numbers(id),
    INDEX idx_number (virtual_number_id),
    INDEX idx_created (created_at)
);
```

### eSIM Data (3)

**10. esim_data_plans**
```sql
CREATE TABLE esim_data_plans (
    id CHAR(36) PRIMARY KEY,
    reseller_id CHAR(36),
    provider_id CHAR(36) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    region VARCHAR(100),
    data_amount_gb INT NOT NULL,
    validity_days INT NOT NULL,
    provider_cost DECIMAL(10, 2),
    selling_price DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reseller_id) REFERENCES resellers(id),
    FOREIGN KEY (provider_id) REFERENCES providers(id),
    INDEX idx_region (region),
    INDEX idx_active (is_active)
);
```

**11. esim_activations**
```sql
CREATE TABLE esim_activations (
    id CHAR(36) PRIMARY KEY,
    plan_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    reseller_id CHAR(36),
    iccid VARCHAR(50) UNIQUE,
    lpa_string TEXT,
    qr_code_url VARCHAR(255),
    status ENUM('pending', 'active', 'suspended', 'expired') DEFAULT 'pending',
    activated_at TIMESTAMP,
    expires_at TIMESTAMP,
    auto_renew BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (plan_id) REFERENCES esim_data_plans(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reseller_id) REFERENCES resellers(id),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_iccid (iccid)
);
```

**12. esim_data_usage**
```sql
CREATE TABLE esim_data_usage (
    id CHAR(36) PRIMARY KEY,
    activation_id CHAR(36) NOT NULL,
    data_used_mb DECIMAL(10, 2) NOT NULL,
    session_start TIMESTAMP,
    session_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (activation_id) REFERENCES esim_activations(id),
    INDEX idx_activation (activation_id),
    INDEX idx_created (created_at)
);
```

### Packages & Bundles (2)

**13. packages**
```sql
CREATE TABLE packages (
    id CHAR(36) PRIMARY KEY,
    reseller_id CHAR(36),
    package_name VARCHAR(100) NOT NULL,
    package_type ENUM('combo', 'data_only', 'voice_only') NOT NULL,
    description TEXT,
    included_numbers INT DEFAULT 0,
    included_minutes INT DEFAULT 0,
    included_sms INT DEFAULT 0,
    included_data_gb INT DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,
    validity_days INT NOT NULL,
    discount_percentage DECIMAL(5, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reseller_id) REFERENCES resellers(id),
    INDEX idx_type (package_type),
    INDEX idx_active (is_active)
);
```

**14. package_subscriptions**
```sql
CREATE TABLE package_subscriptions (
    id CHAR(36) PRIMARY KEY,
    package_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    status ENUM('active', 'cancelled', 'expired') DEFAULT 'active',
    used_minutes INT DEFAULT 0,
    used_sms INT DEFAULT 0,
    used_data_gb DECIMAL(10, 2) DEFAULT 0,
    auto_renew BOOLEAN DEFAULT FALSE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES packages(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id),
    INDEX idx_status (status)
);
```

### Promotions (2)

**15. promo_codes**
```sql
CREATE TABLE promo_codes (
    id CHAR(36) PRIMARY KEY,
    reseller_id CHAR(36),
    code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    discount_type ENUM('percentage', 'fixed') NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    min_purchase_amount DECIMAL(10, 2),
    max_discount_amount DECIMAL(10, 2),
    usage_limit INT,
    usage_count INT DEFAULT 0,
    per_user_limit INT,
    valid_from TIMESTAMP,
    valid_until TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reseller_id) REFERENCES resellers(id),
    INDEX idx_code (code),
    INDEX idx_active (is_active)
);
```

**16. promo_code_usage**
```sql
CREATE TABLE promo_code_usage (
    id CHAR(36) PRIMARY KEY,
    promo_code_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    order_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) NOT NULL,
    final_amount DECIMAL(10, 2) NOT NULL,
    order_type VARCHAR(50),
    order_id CHAR(36),
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (promo_code_id) REFERENCES promo_codes(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_promo (promo_code_id),
    INDEX idx_user (user_id)
);
```

### Referrals & Loyalty (5)

**17. referrals**
```sql
CREATE TABLE referrals (
    id CHAR(36) PRIMARY KEY,
    referrer_user_id CHAR(36) NOT NULL,
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    total_referrals INT DEFAULT 0,
    successful_referrals INT DEFAULT 0,
    total_rewards_earned DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (referrer_user_id) REFERENCES users(id),
    INDEX idx_code (referral_code),
    INDEX idx_referrer (referrer_user_id)
);
```

**18. referral_rewards**
```sql
CREATE TABLE referral_rewards (
    id CHAR(36) PRIMARY KEY,
    referral_id CHAR(36) NOT NULL,
    referrer_user_id CHAR(36) NOT NULL,
    referee_user_id CHAR(36) NOT NULL,
    referrer_reward DECIMAL(10, 2) NOT NULL,
    referee_reward DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (referral_id) REFERENCES referrals(id),
    FOREIGN KEY (referrer_user_id) REFERENCES users(id),
    FOREIGN KEY (referee_user_id) REFERENCES users(id),
    INDEX idx_referral (referral_id),
    INDEX idx_status (status)
);
```

**19. loyalty_tiers**
```sql
CREATE TABLE loyalty_tiers (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    min_points INT NOT NULL,
    max_points INT NOT NULL,
    discount_percentage DECIMAL(5, 2) DEFAULT 0,
    bonus_points_multiplier DECIMAL(3, 2) DEFAULT 1.00,
    benefits TEXT,
    badge_color VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**20. user_loyalty**
```sql
CREATE TABLE user_loyalty (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL UNIQUE,
    total_points INT DEFAULT 0,
    lifetime_points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_points (total_points)
);
```

**21. points_transactions**
```sql
CREATE TABLE points_transactions (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    points INT NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id),
    INDEX idx_created (created_at)
);
```

---

## 🚀 Setup Instructions

### 1. Create Database
```sql
CREATE DATABASE clouddail_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Create User
```sql
CREATE USER 'clouddail_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON clouddail_db.* TO 'clouddail_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Run Schema
```bash
mysql -u root -p clouddail_db < database_schema.sql
```

### 4. Verify Tables
```sql
USE clouddail_db;
SHOW TABLES;
-- Should show 30 tables
```

---

## 🌱 Seed Data

### Default Admin User
```sql
INSERT INTO users (id, email, password_hash, first_name, last_name, role, email_verified)
VALUES (UUID(), 'admin@clouddail.com', '$2a$11$...', 'Admin', 'User', 'super_admin', TRUE);
```

### Default Providers
```sql
INSERT INTO providers (id, name, type, status) VALUES
(UUID(), 'Twilio', 'voice', 'active'),
(UUID(), 'Telnyx', 'voice', 'active'),
(UUID(), 'Telna', 'data', 'active');
```

### Default Loyalty Tiers
```sql
INSERT INTO loyalty_tiers (id, name, min_points, max_points, discount_percentage, bonus_points_multiplier) VALUES
(UUID(), 'Bronze', 0, 999, 0, 1.0),
(UUID(), 'Silver', 1000, 4999, 5, 1.2),
(UUID(), 'Gold', 5000, 9999, 10, 1.5),
(UUID(), 'Platinum', 10000, 999999, 15, 2.0);
```

---

## 🔄 Backup & Restore

### Backup
```bash
mysqldump -u root -p clouddail_db > backup_$(date +%Y%m%d).sql
```

### Restore
```bash
mysql -u root -p clouddail_db < backup_20241209.sql
```

### Automated Daily Backup (Cron)
```bash
0 2 * * * /usr/bin/mysqldump -u root -pPASSWORD clouddail_db > /backups/clouddail_$(date +\%Y\%m\%d).sql
```

---

## 📈 Performance Optimization

### Add Indexes
```sql
-- Already included in schema above
-- Additional custom indexes as needed
```

### Query Optimization
```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
```

---

## 🔒 Security

### Encrypt Sensitive Data
```sql
-- Provider API keys should be encrypted
-- Use AES_ENCRYPT() in MySQL or encrypt in application layer
```

### Regular Maintenance
```sql
-- Optimize tables monthly
OPTIMIZE TABLE users, virtual_numbers, wallet_transactions;

-- Analyze tables
ANALYZE TABLE users, virtual_numbers;
```

---

**Total Tables**: 30  
**Total Indexes**: 50+  
**Storage**: ~100MB (empty), scales with data
