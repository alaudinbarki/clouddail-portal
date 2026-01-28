import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import { useAppSelector } from './store/hooks';
import { lightTheme, darkTheme } from './config/theme';
import { ROUTES } from './config/routes';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import UserList from './features/users/UserList';
import UserProfile from './features/users/UserProfile';
import ESIMInventory from './features/esim/eSIMInventory';
import ESIMProvisioning from './features/esim/eSIMProvisioning';
import PlansList from './features/pricing/PlansList';
import PlanBuilder from './features/pricing/PlanBuilder';
import PaymentDashboard from './features/payments/PaymentDashboard';
import TransactionList from './features/payments/TransactionList';
import ReportsHub from './features/reports/ReportsHub';
import AnalyticsDashboard from './features/reports/AnalyticsDashboard';
import SupportHub from './features/support/SupportHub';
import TicketList from './features/support/TicketList';
import SettingsHub from './features/settings/SettingsHub';
import SystemSettings from './features/settings/SystemSettings';
import AuditLogs from './features/settings/AuditLogs';
import APIConfiguration from './features/settings/APIConfiguration';
import NotificationCenter from './features/notifications/NotificationCenter';
import NotificationSettings from './features/notifications/NotificationSettings';
import ESIMDetails from './features/esims/eSIMDetails';
import TicketDetails from './features/support/TicketDetails';
import FinancialReports from './features/reports/FinancialReports';
import TransactionDetails from './features/payments/TransactionDetails';
import DataProviderManagement from './features/providers/DataProviderManagement';
import PricingMarkupManagement from './features/pricing/PricingMarkupManagement';
import WalletManagement from './features/wallet/WalletManagement';
import PaymentGatewayManagement from './features/payments/PaymentGatewayManagement';
import VirtualNumberManagement from './features/virtual-numbers/VirtualNumberManagement';
import QRCodeGenerator from './features/esims/QRCodeGenerator';
import KYCManagement from './features/users/KYCManagement';
import ActiveeSIMs from './features/esims/ActiveeSIMs';
import DataUsage from './features/esims/DataUsage';
import Invoices from './features/payments/Invoices';
import Refunds from './features/payments/Refunds';
import SalesReports from './features/reports/SalesReports';
import TwilioConfig from './features/integrations/TwilioConfig';
import KnowledgeBase from './features/support/KnowledgeBase';
import AdminUsers from './features/settings/AdminUsers';
import Webhooks from './features/integrations/Webhooks';
import CostManagement from './features/pricing/CostManagement';
import PaymentAnalytics from './features/payments/PaymentAnalytics';
import Promotions from './features/pricing/Promotions';
import PriceHistory from './features/pricing/PriceHistory';
import QRCodesList from './features/esims/QRCodesList';
import TransactionLogs from './features/reports/TransactionLogs';
import TaxReports from './features/reports/TaxReports';
import UserGrowth from './features/reports/UserGrowth';
import DataUsageReports from './features/reports/DataUsageReports';
import CustomReports from './features/reports/CustomReports';
import DataProvidersIntegration from './features/integrations/DataProvidersIntegration';
import APIKeys from './features/settings/APIKeys';
import Branding from './features/settings/Branding';
import Compliance from './features/settings/Compliance';
import EmailTemplates from './features/notifications/EmailTemplates';
import SMSNotifications from './features/notifications/SMSNotifications';
import PushNotifications from './features/notifications/PushNotifications';
import BulkMessaging from './features/notifications/BulkMessaging';
import AutomatedAlerts from './features/notifications/AutomatedAlerts';

// Phase 1: Reselling Platform Pages
import ResellerDashboard from './features/dashboard/ResellerDashboard';
import NumberMarketplace from './features/marketplace/NumberMarketplace';
import EsimMarketplace from './features/marketplace/EsimMarketplace';
import MyWallet from './features/wallet/MyWallet';

// Phase 2: User Services Pages
import MyNumbers from './features/my-services/MyNumbers';
import MyEsims from './features/my-services/MyEsims';
import MySubscriptions from './features/my-services/MySubscriptions';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
};

const AppContent: React.FC = () => {
  const { themeMode } = useAppSelector((state) => state.ui);
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path={ROUTES.LOGIN} element={<Login />} />
            </Route>

            {/* Dashboard Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

              {/* Phase 1: Reselling Platform Routes */}
              <Route path="/reseller-dashboard" element={<ResellerDashboard />} />
              <Route path="/marketplace/numbers" element={<NumberMarketplace />} />
              <Route path="/marketplace/esim" element={<EsimMarketplace />} />
              <Route path="/my-wallet" element={<MyWallet />} />

              {/* Phase 2: User Services Routes */}
              <Route path="/my-numbers" element={<MyNumbers />} />
              <Route path="/my-esims" element={<MyEsims />} />
              <Route path="/my-subscriptions" element={<MySubscriptions />} />

              {/* User Management Routes */}
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<UserProfile />} />
              <Route path="/users/kyc" element={<KYCManagement />} />

              {/* eSIM Management Routes */}
              <Route path="/esims" element={<ESIMInventory />} />
              <Route path="/esim/active" element={<ActiveeSIMs />} />
              <Route path="/esims/provision" element={<ESIMProvisioning />} />
              <Route path="/esims/:id" element={<ESIMDetails />} />
              <Route path="/esims/qr-generator" element={<QRCodeGenerator />} />
              <Route path="/esim/qr-codes" element={<QRCodesList />} />
              <Route path="/esim/data-usage" element={<DataUsage />} />

              {/* Pricing & Plans Routes */}
              <Route path="/plans" element={<PlansList />} />
              <Route path="/plans/create" element={<PlanBuilder />} />
              <Route path="/pricing/markup" element={<PricingMarkupManagement />} />
              <Route path="/pricing/costs" element={<CostManagement />} />
              <Route path="/pricing/promotions" element={<Promotions />} />
              <Route path="/pricing/history" element={<PriceHistory />} />

              {/* Payment Management Routes */}
              <Route path="/payments" element={<PaymentDashboard />} />
              <Route path="/payments/transactions" element={<TransactionList />} />
              <Route path="/payments/transactions/:id" element={<TransactionDetails />} />
              <Route path="/payments/invoices" element={<Invoices />} />
              <Route path="/payments/refunds" element={<Refunds />} />
              <Route path="/payments/analytics" element={<PaymentAnalytics />} />
              <Route path="/payments/gateways" element={<PaymentGatewayManagement />} />
              <Route path="/payments/wallet" element={<WalletManagement />} />

              {/* Reports & Analytics Routes */}
              <Route path="/reports" element={<ReportsHub />} />
              <Route path="/reports/financial" element={<FinancialReports />} />
              <Route path="/reports/sales" element={<SalesReports />} />
              <Route path="/reports/transactions" element={<TransactionLogs />} />
              <Route path="/reports/tax" element={<TaxReports />} />
              <Route path="/reports/user-growth" element={<UserGrowth />} />
              <Route path="/reports/data-usage" element={<DataUsageReports />} />
              <Route path="/reports/custom" element={<CustomReports />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />

              {/* Integrations Routes */}
              <Route path="/integrations/twilio" element={<TwilioConfig />} />
              <Route path="/integrations/data-providers" element={<DataProvidersIntegration />} />
              <Route path="/integrations/webhooks" element={<Webhooks />} />

              {/* Support & Ticketing Routes */}
              <Route path="/support" element={<SupportHub />} />
              <Route path="/support/tickets" element={<TicketList />} />
              <Route path="/support/tickets/:id" element={<TicketDetails />} />
              <Route path="/support/knowledge-base" element={<KnowledgeBase />} />

              {/* Settings & Configuration Routes */}
              <Route path="/settings" element={<SettingsHub />} />
              <Route path="/settings/admin-users" element={<AdminUsers />} />
              <Route path="/settings/system" element={<SystemSettings />} />
              <Route path="/settings/api" element={<APIConfiguration />} />
              <Route path="/settings/api-keys" element={<APIKeys />} />
              <Route path="/settings/branding" element={<Branding />} />
              <Route path="/settings/compliance" element={<Compliance />} />
              <Route path="/settings/audit" element={<AuditLogs />} />

              {/* Provider & Virtual Number Management */}
              <Route path="/providers" element={<DataProviderManagement />} />
              <Route path="/virtual-numbers" element={<VirtualNumberManagement />} />

              {/* Notifications & Alerts Routes */}
              <Route path="/notifications" element={<NotificationCenter />} />
              <Route path="/notifications/settings" element={<NotificationSettings />} />
              <Route path="/notifications/email-templates" element={<EmailTemplates />} />
              <Route path="/notifications/sms" element={<SMSNotifications />} />
              <Route path="/notifications/push" element={<PushNotifications />} />
              <Route path="/notifications/bulk" element={<BulkMessaging />} />
              <Route path="/notifications/alerts" element={<AutomatedAlerts />} />

              {/* Placeholder routes - will be implemented in later phases */}
              <Route path={ROUTES.TWILIO_CONFIG} element={<div>Twilio Config - Coming Soon</div>} />
              <Route path={ROUTES.EMAIL_TEMPLATES} element={<div>Email Templates - Coming Soon</div>} />
            </Route>

            {/* Redirect to dashboard */}
            <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
