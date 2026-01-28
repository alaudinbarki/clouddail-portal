# eSIM Admin Portal

A comprehensive admin portal for managing eSIM operations, users, payments, and analytics built with React, TypeScript, and Material-UI.

## 🚀 Features

### Core Functionality
- **Authentication & Authorization** - JWT-based auth with RBAC
- **User Management** - Complete CRUD with KYC verification
- **eSIM Management** - Inventory, provisioning, data usage tracking
- **Pricing & Plans** - Dynamic pricing with markup calculations
- **Payment Processing** - Transactions, refunds, invoices
- **Reports & Analytics** - Financial reports, tax calculations
- **Support System** - Ticketing, knowledge base, FAQs
- **Notifications** - Email, SMS, push, in-app alerts
- **Integrations** - Twilio, Stripe, data providers
- **Advanced Analytics** - Trends, predictions, cohorts, funnels
- **Compliance** - GDPR, data retention, audit logs

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd clouddail

# Install dependencies (use --legacy-peer-deps for MUI compatibility)
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
├── features/         # Feature-specific components
├── hooks/            # Custom React hooks
├── services/         # API service layer (14 services)
├── store/            # Redux store and slices
├── types/            # TypeScript type definitions (14 type files)
├── utils/            # Utility functions and helpers
└── config/           # Configuration files
```

## 📦 Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **UI Library:** Material-UI v7
- **State Management:** Redux Toolkit
- **Data Fetching:** React Query
- **Routing:** React Router v6
- **Forms:** React Hook Form + Yup
- **Charts:** Recharts
- **Testing:** Vitest, React Testing Library

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables

Configure the following in `.env.production`:

- `VITE_API_BASE_URL` - Backend API URL
- `VITE_STRIPE_PUBLIC_KEY` - Stripe public key
- `VITE_TWILIO_ACCOUNT_SID` - Twilio account SID
- See `.env.production` for complete list

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 📚 Documentation

- [Implementation Plan](/.gemini/antigravity/brain/f0b3cedb-8a41-4b8f-8df9-93fb53e5e42a/implementation_plan.md)
- [Task Checklist](/.gemini/antigravity/brain/f0b3cedb-8a41-4b8f-8df9-93fb53e5e42a/task.md)
- [Walkthrough](/.gemini/antigravity/brain/f0b3cedb-8a41-4b8f-8df9-93fb53e5e42a/walkthrough.md)
- [Database Schema](/DATABASE_SCHEMA.md)

## 🔐 Default Credentials

**Admin Account:**
- Email: `admin@esimadmin.com`
- Password: `admin123`

**Support Account:**
- Email: `support@esimadmin.com`
- Password: `support123`

## 🎯 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Vitest for testing

## 📊 Mock Data

The application includes comprehensive mock data:
- 50 users with various roles
- 100 eSIMs across different statuses
- 200 payment transactions
- 100 support tickets
- Analytics and reports

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Material-UI for the component library
- Recharts for data visualization
- React community for excellent tools and libraries

---

**Status:** Production Ready  
**Version:** 1.0.0  
**Last Updated:** 2025-12-08
