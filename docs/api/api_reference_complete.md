# Complete API Reference - Virtual Number & eSIM Reselling Platform

**Base URL**: `https://localhost:5001/api/v1` (Development)  
**Base URL**: `https://api.clouddail.com/api/v1` (Production)

**Authentication**: Bearer Token (JWT)  
**Header**: `Authorization: Bearer {token}`

---

## 1. Provider Integration APIs

### Get Provider Pricing
```http
GET /providers/pricing?serviceType=voice&countryCode=US
```

**Response**:
```json
{
  "success": true,
  "data": {
    "twilio": { "price": 0.0085, "currency": "USD" },
    "telnyx": { "price": 0.0079, "currency": "USD" },
    "telna": { "price": 0.0082, "currency": "USD" }
  }
}
```

### Search Available Numbers
```http
GET /providers/numbers/search?countryCode=US&numberType=local&limit=10
```

**Response**:
```json
{
  "success": true,
  "data": {
    "provider": "telnyx",
    "numbers": [
      {
        "phoneNumber": "+14155551234",
        "region": "California",
        "providerCost": 1.15,
        "yourPrice": 2.00
      }
    ]
  }
}
```

---

## 2. Pricing Engine APIs

### Get Pricing Rules
```http
GET /pricing/rules?serviceType=voice&countryCode=US
```

### Create Pricing Rule
```http
POST /pricing/rules
Content-Type: application/json

{
  "serviceType": "voice",
  "countryCode": "US",
  "markupType": "percentage",
  "markupValue": 50,
  "resellerId": null
}
```

### Calculate Price
```http
POST /pricing/calculate
Content-Type: application/json

{
  "serviceType": "voice",
  "countryCode": "US",
  "quantity": 100
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "providerCost": 0.85,
    "markup": 0.43,
    "sellingPrice": 1.28,
    "profitMargin": 50.59
  }
}
```

### Compare Provider Prices
```http
GET /pricing/compare?serviceType=voice&countryCode=US
```

### Sync Pricing from Providers
```http
POST /pricing/sync
```

---

## 3. Virtual Number APIs

### Search Numbers
```http
GET /virtual-numbers/search?countryCode=US&numberType=local&limit=10
```

### Purchase Number
```http
POST /virtual-numbers/purchase
Content-Type: application/json

{
  "phoneNumber": "+14155551234",
  "countryCode": "US",
  "numberType": "local",
  "userId": "user-guid"
}
```

### Get All Numbers
```http
GET /virtual-numbers?resellerId=guid&status=active
```

### Get User Numbers
```http
GET /virtual-numbers/user/{userId}
```

### Get Number Details
```http
GET /virtual-numbers/{id}
```

### Release Number
```http
POST /virtual-numbers/{id}/release
```

### Get Usage
```http
GET /virtual-numbers/{id}/usage?startDate=2024-01-01&endDate=2024-01-31
```

### Get Call Records (CDR)
```http
GET /virtual-numbers/{id}/cdr?startDate=2024-01-01&endDate=2024-01-31
```

### Get SMS Records
```http
GET /virtual-numbers/{id}/sms?startDate=2024-01-01&endDate=2024-01-31
```

### Toggle Auto-Renew
```http
PUT /virtual-numbers/{id}/auto-renew?enabled=true
```

---

## 4. eSIM Data APIs

### Get Data Plans
```http
GET /esim/plans?region=europe&resellerId=guid
```

### Purchase eSIM
```http
POST /esim/purchase
Content-Type: application/json

{
  "planId": "plan-guid",
  "userId": "user-guid",
  "autoRenew": false
}
```

### Get Activations
```http
GET /esim/activations?resellerId=guid&status=active
```

### Get User Activations
```http
GET /esim/activations/user/{userId}
```

### Get Activation Details
```http
GET /esim/activations/{id}
```

### Generate QR Code
```http
POST /esim/qr-code/generate
Content-Type: application/json

{
  "activationId": "activation-guid"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "qrCodeBase64": "data:image/png;base64,...",
    "lpaString": "LPA:1$...",
    "iccid": "8901234567890123456"
  }
}
```

### Get Data Usage
```http
GET /esim/activations/{id}/usage
```

### Activate eSIM
```http
POST /esim/activations/{id}/activate
```

### Suspend eSIM
```http
POST /esim/activations/{id}/suspend
```

### Renew eSIM
```http
POST /esim/activations/{id}/renew
```

---

## 5. Package & Bundle APIs

### Get Packages
```http
GET /packages?resellerId=guid&packageType=combo
```

### Get Package Details
```http
GET /packages/{id}
```

### Subscribe to Package
```http
POST /packages/subscribe
Content-Type: application/json

{
  "packageId": "package-guid",
  "userId": "user-guid",
  "autoRenew": true
}
```

### Get Subscriptions
```http
GET /packages/subscriptions?resellerId=guid&status=active
```

### Get User Subscriptions
```http
GET /packages/subscriptions/user/{userId}
```

### Cancel Subscription
```http
POST /packages/subscriptions/{id}/cancel
```

### Renew Subscription
```http
POST /packages/subscriptions/{id}/renew
```

### Compare Packages
```http
GET /packages/compare?estimatedMinutes=500&estimatedSms=200&estimatedDataGb=10
```

---

## 6. Promo Code APIs

### Get Promo Codes
```http
GET /promo-codes?resellerId=guid&isActive=true
```

### Create Promo Code
```http
POST /promo-codes
Content-Type: application/json

{
  "code": "SAVE20",
  "description": "20% off",
  "discountType": "percentage",
  "discountValue": 20,
  "minPurchaseAmount": 10,
  "maxDiscountAmount": 50,
  "usageLimit": 1000,
  "perUserLimit": 1,
  "validUntil": "2024-12-31T23:59:59Z"
}
```

### Validate Promo Code
```http
POST /promo-codes/validate
Content-Type: application/json

{
  "code": "SAVE20",
  "userId": "user-guid",
  "orderAmount": 100
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "valid": true,
    "discountAmount": 20,
    "finalAmount": 80,
    "message": "Promo code is valid"
  }
}
```

### Get User Usage
```http
GET /promo-codes/user/{userId}/usage
```

---

## 7. Referral & Loyalty APIs

### Generate Referral Code
```http
POST /referrals/generate
Content-Type: application/json

{
  "userId": "user-guid",
  "customCode": "JOHN2024"
}
```

### Get User Referral
```http
GET /referrals/user/{userId}
```

### Apply Referral Code
```http
POST /referrals/apply
Content-Type: application/json

{
  "referralCode": "JOHN2024",
  "refereeUserId": "user-guid"
}
```

### Get Rewards
```http
GET /referrals/rewards/{userId}
```

### Get Loyalty Tiers
```http
GET /referrals/loyalty/tiers
```

### Get User Loyalty
```http
GET /referrals/loyalty/user/{userId}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "userId": "user-guid",
    "totalPoints": 2500,
    "currentTier": "Silver",
    "nextTier": "Gold",
    "pointsToNextTier": 2500,
    "currentDiscount": 10,
    "bonusMultiplier": 1.2
  }
}
```

### Get Points History
```http
GET /referrals/loyalty/user/{userId}/history
```

### Get Leaderboard
```http
GET /referrals/loyalty/leaderboard?limit=100
```

---

## 8. Wallet & Payment APIs

### Get Wallet
```http
GET /wallets/{userId}
```

### Get Balance
```http
GET /wallets/{userId}/balance
```

**Response**:
```json
{
  "success": true,
  "data": {
    "balance": 125.50
  }
}
```

### Get Transactions
```http
GET /wallets/{userId}/transactions?startDate=2024-01-01&endDate=2024-01-31
```

### Get Wallet Stats
```http
GET /wallets/{userId}/stats?startDate=2024-01-01&endDate=2024-01-31
```

### Create Payment Intent (Stripe)
```http
POST /wallets/payment-intent
Content-Type: application/json

{
  "userId": "user-guid",
  "amount": 50,
  "currency": "USD"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "paymentIntentId": "pi_xxx",
    "amount": 50,
    "currency": "USD"
  }
}
```

### Confirm Payment
```http
POST /wallets/confirm-payment
Content-Type: application/json

{
  "paymentIntentId": "pi_xxx",
  "userId": "user-guid"
}
```

### Update Auto-Recharge
```http
PUT /wallets/{userId}/auto-recharge
Content-Type: application/json

{
  "enabled": true,
  "threshold": 10,
  "amount": 50
}
```

---

## 9. Authentication APIs

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-guid",
      "email": "user@example.com",
      "role": "user"
    }
  }
}
```

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

---

## Error Responses

All APIs return errors in this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

**Common HTTP Status Codes**:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

- **Limit**: 100 requests per minute per user
- **Header**: `X-RateLimit-Remaining: 95`
- **Exceeded**: Returns `429 Too Many Requests`

---

## Pagination

For list endpoints:

```http
GET /virtual-numbers?page=1&pageSize=20
```

**Response**:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 20,
    "totalPages": 5,
    "totalCount": 100
  }
}
```

---

**Total Endpoints**: 93+  
**Last Updated**: December 9, 2024
