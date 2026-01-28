-- ============================================
-- Virtual Number & eSIM Reselling Platform
-- Complete MySQL Database Schema
-- ============================================

-- Drop existing tables (in reverse order of dependencies)
DROP TABLE IF EXISTS api_logs;
DROP TABLE IF EXISTS system_logs;
DROP TABLE IF EXISTS fraud_alerts;
DROP TABLE IF EXISTS blacklist;
DROP TABLE IF EXISTS call_recordings;
DROP TABLE IF EXISTS sms_messages;
DROP TABLE IF EXISTS call_detail_records;
DROP TABLE IF EXISTS number_porting_requests;
DROP TABLE IF EXISTS loyalty_transactions;
DROP TABLE IF EXISTS referrals;
DROP TABLE IF EXISTS promo_code_usage;
DROP TABLE IF EXISTS promo_codes;
DROP TABLE IF EXISTS package_subscriptions;
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS esim_data_usage;
DROP TABLE IF EXISTS esim_activations;
DROP TABLE IF EXISTS esim_data_plans;
DROP TABLE IF EXISTS virtual_number_usage;
DROP TABLE IF EXISTS virtual_numbers;
DROP TABLE IF EXISTS wallet_transactions;
DROP TABLE IF EXISTS user_wallets;
DROP TABLE IF EXISTS provider_payments;
DROP TABLE IF EXISTS pricing_rules;
DROP TABLE IF EXISTS base_prices;
DROP TABLE IF EXISTS providers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS support_tickets;

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20),
    country_code VARCHAR(3),
    language VARCHAR(10) DEFAULT 'en',
    currency VARCHAR(3) DEFAULT 'USD',
    status ENUM('active', 'inactive', 'suspended', 'banned') DEFAULT 'active',
    role ENUM('user', 'admin', 'super_admin', 'support') DEFAULT 'user',
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    kyc_status ENUM('not_submitted', 'pending', 'verified', 'rejected') DEFAULT 'not_submitted',
    loyalty_tier ENUM('bronze', 'silver', 'gold', 'platinum') DEFAULT 'bronze',
    loyalty_points INT DEFAULT 0,
    referral_code VARCHAR(20) UNIQUE,
    referred_by CHAR(36),
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_referral_code (referral_code),
    FOREIGN KEY (referred_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. PROVIDERS TABLE
-- ============================================
CREATE TABLE providers (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL,
    type ENUM('virtual_number', 'esim_data', 'both') NOT NULL,
    status ENUM('active', 'inactive', 'testing') DEFAULT 'active',
    api_credentials JSON, -- Encrypted credentials
    webhook_url VARCHAR(255),
    webhook_secret VARCHAR(255),
    priority INT DEFAULT 0, -- Lower number = higher priority
    last_sync_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_name (name),
    INDEX idx_status (status),
    INDEX idx_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. BASE PRICES (from providers)
-- ============================================
CREATE TABLE base_prices (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    provider_id CHAR(36) NOT NULL,
    service_type ENUM('voice', 'sms', 'data', 'number_purchase', 'number_monthly') NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    number_type ENUM('local', 'mobile', 'tollfree', 'national') DEFAULT 'local',
    price_per_unit DECIMAL(10, 4) NOT NULL,
    unit ENUM('minute', 'message', 'GB', 'number', 'month') NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    direction ENUM('inbound', 'outbound', 'both') DEFAULT 'both',
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE,
    INDEX idx_service_country (service_type, country_code),
    INDEX idx_provider (provider_id),
    INDEX idx_valid (valid_from, valid_until)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. PRICING RULES (your markup)
-- ============================================
CREATE TABLE pricing_rules (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    service_type ENUM('voice', 'sms', 'data', 'number_purchase', 'number_monthly') NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    number_type ENUM('local', 'mobile', 'tollfree', 'national') DEFAULT 'local',
    base_price DECIMAL(10, 4) NOT NULL,
    markup_type ENUM('percentage', 'fixed') NOT NULL,
    markup_value DECIMAL(10, 4) NOT NULL,
    selling_price DECIMAL(10, 4) NOT NULL,
    profit_margin DECIMAL(5, 2), -- Percentage
    min_charge DECIMAL(10, 4), -- Minimum charge per transaction
    is_active BOOLEAN DEFAULT TRUE,
    created_by CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_service_country (service_type, country_code),
    INDEX idx_active (is_active),
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. PACKAGES
-- ============================================
CREATE TABLE packages (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    package_type ENUM('starter', 'business', 'enterprise', 'custom') NOT NULL,
    includes JSON NOT NULL, -- {numbers: 1, minutes: 100, sms: 100, data_gb: 5}
    base_cost DECIMAL(10, 2) NOT NULL,
    selling_price DECIMAL(10, 2) NOT NULL,
    profit DECIMAL(10, 2) NOT NULL,
    discount_percentage DECIMAL(5, 2) DEFAULT 0,
    validity_days INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active),
    INDEX idx_featured (is_featured),
    INDEX idx_type (package_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 6. PACKAGE SUBSCRIPTIONS
-- ============================================
CREATE TABLE package_subscriptions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    package_id CHAR(36) NOT NULL,
    status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
    auto_renew BOOLEAN DEFAULT FALSE,
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    renewed_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,
    
    -- Usage tracking
    minutes_used INT DEFAULT 0,
    sms_used INT DEFAULT 0,
    data_used_gb DECIMAL(10, 2) DEFAULT 0,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,
    INDEX idx_user_status (user_id, status),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 7. PROMO CODES
-- ============================================
CREATE TABLE promo_codes (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type ENUM('percentage', 'fixed') NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    min_purchase_amount DECIMAL(10, 2) DEFAULT 0,
    max_discount_amount DECIMAL(10, 2),
    usage_limit INT, -- NULL = unlimited
    usage_count INT DEFAULT 0,
    per_user_limit INT DEFAULT 1,
    applicable_to ENUM('all', 'packages', 'numbers', 'esim', 'specific') DEFAULT 'all',
    applicable_ids JSON, -- Specific package/plan IDs
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_code (code),
    INDEX idx_active (is_active),
    INDEX idx_valid (valid_from, valid_until),
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 8. PROMO CODE USAGE
-- ============================================
CREATE TABLE promo_code_usage (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    promo_code_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    order_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) NOT NULL,
    final_amount DECIMAL(10, 2) NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (promo_code_id) REFERENCES promo_codes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_promo (promo_code_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 9. REFERRALS
-- ============================================
CREATE TABLE referrals (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    referrer_id CHAR(36) NOT NULL,
    referee_id CHAR(36) NOT NULL,
    status ENUM('pending', 'completed', 'rewarded') DEFAULT 'pending',
    referrer_reward_amount DECIMAL(10, 2),
    referee_reward_amount DECIMAL(10, 2),
    referrer_rewarded_at TIMESTAMP NULL,
    referee_rewarded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (referrer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (referee_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_referrer (referrer_id),
    INDEX idx_status (status),
    UNIQUE KEY unique_referral (referrer_id, referee_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 10. LOYALTY TRANSACTIONS
-- ============================================
CREATE TABLE loyalty_transactions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    type ENUM('earn', 'redeem', 'expire', 'bonus') NOT NULL,
    points INT NOT NULL,
    balance_after INT NOT NULL,
    description TEXT,
    reference_type VARCHAR(50), -- 'purchase', 'referral', 'birthday'
    reference_id CHAR(36),
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 11. VIRTUAL NUMBERS
-- ============================================
CREATE TABLE virtual_numbers (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    number_type ENUM('local', 'mobile', 'tollfree', 'national') NOT NULL,
    provider_id CHAR(36) NOT NULL,
    provider_number_id VARCHAR(100),
    purchase_cost DECIMAL(10, 2) NOT NULL,
    monthly_cost DECIMAL(10, 2) NOT NULL,
    selling_price DECIMAL(10, 2) NOT NULL,
    monthly_selling_price DECIMAL(10, 2) NOT NULL,
    status ENUM('available', 'reserved', 'assigned', 'active', 'released', 'porting') DEFAULT 'available',
    assigned_to_user_id CHAR(36),
    capabilities JSON, -- {voice: true, sms: true, mms: false}
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_at TIMESTAMP NULL,
    released_at TIMESTAMP NULL,
    next_billing_date DATE,
    
    FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE RESTRICT,
    FOREIGN KEY (assigned_to_user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_phone (phone_number),
    INDEX idx_status (status),
    INDEX idx_user (assigned_to_user_id),
    INDEX idx_country (country_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 12. CALL DETAIL RECORDS (CDR)
-- ============================================
CREATE TABLE call_detail_records (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    virtual_number_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    call_type ENUM('inbound', 'outbound') NOT NULL,
    from_number VARCHAR(20) NOT NULL,
    to_number VARCHAR(20) NOT NULL,
    duration_seconds INT NOT NULL,
    cost DECIMAL(10, 4) NOT NULL,
    charge DECIMAL(10, 4) NOT NULL,
    profit DECIMAL(10, 4) NOT NULL,
    call_status ENUM('completed', 'no-answer', 'busy', 'failed', 'cancelled') NOT NULL,
    provider_cdr_id VARCHAR(100),
    recording_url VARCHAR(255),
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (virtual_number_id) REFERENCES virtual_numbers(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_number (virtual_number_id),
    INDEX idx_started (started_at),
    INDEX idx_call_type (call_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 13. SMS MESSAGES
-- ============================================
CREATE TABLE sms_messages (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    virtual_number_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    message_type ENUM('inbound', 'outbound') NOT NULL,
    from_number VARCHAR(20) NOT NULL,
    to_number VARCHAR(20) NOT NULL,
    message_body TEXT,
    message_segments INT DEFAULT 1,
    cost DECIMAL(10, 4) NOT NULL,
    charge DECIMAL(10, 4) NOT NULL,
    profit DECIMAL(10, 4) NOT NULL,
    status ENUM('sent', 'delivered', 'failed', 'queued') NOT NULL,
    provider_message_id VARCHAR(100),
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP NULL,
    
    FOREIGN KEY (virtual_number_id) REFERENCES virtual_numbers(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_number (virtual_number_id),
    INDEX idx_sent (sent_at),
    INDEX idx_type (message_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 14. NUMBER PORTING REQUESTS
-- ============================================
CREATE TABLE number_porting_requests (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    port_type ENUM('port_in', 'port_out') NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    current_provider VARCHAR(100),
    account_number VARCHAR(100),
    pin_code VARCHAR(20),
    status ENUM('pending', 'submitted', 'in_progress', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    documents JSON, -- Array of document URLs
    estimated_completion_date DATE,
    completed_at TIMESTAMP NULL,
    failure_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_phone (phone_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 15. ESIM DATA PLANS
-- ============================================
CREATE TABLE esim_data_plans (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    data_amount_gb INT NOT NULL,
    region VARCHAR(50) NOT NULL,
    countries JSON NOT NULL,
    validity_days INT NOT NULL,
    provider_id CHAR(36) NOT NULL,
    base_cost DECIMAL(10, 2) NOT NULL,
    selling_price DECIMAL(10, 2) NOT NULL,
    profit DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE RESTRICT,
    INDEX idx_active (is_active),
    INDEX idx_region (region),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 16. ESIM ACTIVATIONS
-- ============================================
CREATE TABLE esim_activations (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    plan_id CHAR(36) NOT NULL,
    iccid VARCHAR(50) UNIQUE NOT NULL,
    qr_code_data TEXT NOT NULL,
    qr_code_image_url VARCHAR(255),
    status ENUM('generated', 'activated', 'active', 'suspended', 'expired', 'depleted') DEFAULT 'generated',
    data_used_gb DECIMAL(10, 2) DEFAULT 0,
    data_limit_gb INT NOT NULL,
    auto_renew BOOLEAN DEFAULT FALSE,
    activated_at TIMESTAMP NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES esim_data_plans(id) ON DELETE RESTRICT,
    INDEX idx_user (user_id),
    INDEX idx_iccid (iccid),
    INDEX idx_status (status),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 17. ESIM DATA USAGE
-- ============================================
CREATE TABLE esim_data_usage (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    esim_activation_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    data_used_mb INT NOT NULL,
    cost DECIMAL(10, 4) NOT NULL,
    charge DECIMAL(10, 4) NOT NULL,
    profit DECIMAL(10, 4) NOT NULL,
    session_start TIMESTAMP NOT NULL,
    session_end TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (esim_activation_id) REFERENCES esim_activations(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_esim (esim_activation_id),
    INDEX idx_user (user_id),
    INDEX idx_session (session_start)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 18. USER WALLETS
-- ============================================
CREATE TABLE user_wallets (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) UNIQUE NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    auto_recharge_enabled BOOLEAN DEFAULT FALSE,
    auto_recharge_threshold DECIMAL(10, 2),
    auto_recharge_amount DECIMAL(10, 2),
    status ENUM('active', 'suspended', 'frozen') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 19. WALLET TRANSACTIONS
-- ============================================
CREATE TABLE wallet_transactions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    wallet_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    type ENUM('credit', 'debit') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    balance_before DECIMAL(10, 2) NOT NULL,
    balance_after DECIMAL(10, 2) NOT NULL,
    description TEXT,
    reference_type VARCHAR(50),
    reference_id CHAR(36),
    payment_method VARCHAR(50),
    payment_reference VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (wallet_id) REFERENCES user_wallets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_wallet (wallet_id),
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 20. PROVIDER PAYMENTS
-- ============================================
CREATE TABLE provider_payments (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    provider_id CHAR(36) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_method VARCHAR(50),
    payment_reference VARCHAR(100),
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,
    invoice_url VARCHAR(255),
    paid_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE RESTRICT,
    INDEX idx_provider (provider_id),
    INDEX idx_status (status),
    INDEX idx_period (billing_period_start, billing_period_end)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 21. NOTIFICATIONS
-- ============================================
CREATE TABLE notifications (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36),
    type ENUM('usage_alert', 'balance_alert', 'expiry_alert', 'payment_alert', 'promo_alert', 'system_alert') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    channels JSON, -- ['email', 'sms', 'push', 'in_app']
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP NULL,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_read (is_read),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 22. SUPPORT TICKETS
-- ============================================
CREATE TABLE support_tickets (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('billing', 'technical', 'account', 'general') NOT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('open', 'in_progress', 'waiting_user', 'resolved', 'closed') DEFAULT 'open',
    assigned_to CHAR(36),
    attachments JSON,
    resolved_at TIMESTAMP NULL,
    closed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_assigned (assigned_to)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 23. BLACKLIST
-- ============================================
CREATE TABLE blacklist (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    type ENUM('phone_number', 'country', 'user', 'ip_address') NOT NULL,
    value VARCHAR(255) NOT NULL,
    reason TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_by CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_type_value (type, value),
    INDEX idx_active (is_active),
    UNIQUE KEY unique_blacklist (type, value)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 24. FRAUD ALERTS
-- ============================================
CREATE TABLE fraud_alerts (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36),
    alert_type ENUM('unusual_usage', 'multiple_failed_logins', 'suspicious_pattern', 'high_value_transaction') NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    description TEXT NOT NULL,
    metadata JSON,
    status ENUM('new', 'investigating', 'resolved', 'false_positive') DEFAULT 'new',
    resolved_by CHAR(36),
    resolved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resolved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_type (alert_type),
    INDEX idx_status (status),
    INDEX idx_severity (severity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 25. SYSTEM LOGS
-- ============================================
CREATE TABLE system_logs (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    log_type ENUM('api', 'transaction', 'usage', 'user_activity', 'error', 'security') NOT NULL,
    severity ENUM('debug', 'info', 'warning', 'error', 'critical') NOT NULL,
    message TEXT NOT NULL,
    metadata JSON,
    user_id CHAR(36),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_type (log_type),
    INDEX idx_severity (severity),
    INDEX idx_user (user_id),
    INDEX idx_created (created_at),
    INDEX idx_ip (ip_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 26. API LOGS
-- ============================================
CREATE TABLE api_logs (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36),
    api_key VARCHAR(100),
    endpoint VARCHAR(255) NOT NULL,
    method ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH') NOT NULL,
    request_body JSON,
    response_status INT NOT NULL,
    response_body JSON,
    response_time_ms INT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_endpoint (endpoint),
    INDEX idx_status (response_status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 27. CALL RECORDINGS
-- ============================================
CREATE TABLE call_recordings (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    cdr_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    recording_url VARCHAR(255) NOT NULL,
    duration_seconds INT NOT NULL,
    file_size_bytes BIGINT,
    storage_provider VARCHAR(50), -- 's3', 'azure', 'local'
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cdr_id) REFERENCES call_detail_records(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_cdr (cdr_id),
    INDEX idx_user (user_id),
    INDEX idx_deleted (is_deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INITIAL DATA
-- ============================================

-- Insert default providers
INSERT INTO providers (id, name, type, status) VALUES
(UUID(), 'Twilio', 'both', 'active'),
(UUID(), 'Telnyx', 'both', 'active'),
(UUID(), 'Telna', 'virtual_number', 'active');

-- Insert default admin user (password: admin123)
INSERT INTO users (id, email, password_hash, first_name, last_name, role, status, email_verified) VALUES
(UUID(), 'admin@clouddail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin', 'User', 'super_admin', 'active', TRUE);

-- ============================================
-- END OF SCHEMA
-- ============================================
