import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPage from './pages/ForgotPage';
import ResetPage from './pages/ResetPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import WidgetPage from './pages/WidgetPage';
import WidgetChatPage from './pages/WidgetChatPage';
import EmbedChatPage from './pages/EmbedChatPage';
import StoreChatPage from './pages/StoreChatPage';
import SyaratPage from './pages/SyaratPage';
import PrivasiPage from './pages/PrivasiPage';
import NotFoundPage from './pages/NotFoundPage';

import DashboardPage from './pages/DashboardPage';
import GettingStartedPage from './pages/GettingStartedPage';
import ChatPage from './pages/ChatPage';
import ChatbotPage from './pages/ChatbotPage';
import ChannelListPage from './pages/ChannelListPage';
import ChannelCreatePage from './pages/ChannelCreatePage';
import ChannelEditPage from './pages/ChannelEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import KnowledgePage from './pages/KnowledgePage';
import KnowledgeBuilderPage from './pages/KnowledgeBuilderPage';
import CustomersPage from './pages/CustomersPage';
import TeamListPage from './pages/TeamListPage';
import MemberFormPage from './pages/MemberFormPage';
import RegisterAdminPage from './pages/RegisterAdminPage';
import AuditPage from './pages/AuditPage';
import EmbedPage from './pages/EmbedPage';
import HistoryPage from './pages/HistoryPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import EditProfilePage from './pages/EditProfilePage';
import IntegrasiPage from './pages/IntegrasiPage';

import CsQueuePage from './pages/CsQueuePage';
import CsInboxPage from './pages/CsInboxPage';
import CsAnalyticsPage from './pages/CsAnalyticsPage';

import AppLayout from './components/AppLayout';
import CsLayout from './components/CsLayout';

export default function App() {
  return (
    <Routes>
      {/* Publik */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot" element={<ForgotPage />} />
      <Route path="/forgot-password" element={<ForgotPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/widget" element={<WidgetPage />} />
      <Route path="/chat/:slug" element={<WidgetChatPage />} />
      <Route path="/embed/:slug" element={<EmbedChatPage />} />
      <Route path="/syarat" element={<SyaratPage />} />
      <Route path="/privasi" element={<PrivasiPage />} />

      {/* Panel admin */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/getting-started" element={<GettingStartedPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />

        <Route path="/channels" element={<ChannelListPage />} />
        <Route path="/channels/new" element={<ChannelCreatePage />} />
        <Route path="/channels/:channelId/edit" element={<ChannelEditPage />} />

        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/new" element={<ProductFormPage />} />
        <Route path="/products/:productId/edit" element={<ProductFormPage />} />

        <Route path="/knowledge-base" element={<KnowledgePage />} />
        <Route path="/knowledge" element={<KnowledgeBuilderPage />} />
        <Route path="/flows" element={<Navigate to="/knowledge" replace />} />

        <Route path="/customers" element={<CustomersPage />} />

        <Route path="/team" element={<TeamListPage />} />
        <Route path="/team/new" element={<MemberFormPage />} />
        <Route path="/team/register-admin" element={<RegisterAdminPage />} />
        <Route path="/team/:memberId/edit" element={<MemberFormPage />} />

        <Route path="/audit" element={<AuditPage />} />
        <Route path="/embed" element={<EmbedPage />} />
        <Route path="/integrasi" element={<IntegrasiPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Route>

      {/* Customer service */}
      <Route path="/cs" element={<CsLayout />}>
        <Route index element={<Navigate to="/cs/queue" replace />} />
        <Route path="queue" element={<CsQueuePage />} />
        <Route path="inbox" element={<CsInboxPage />} />
        <Route path="analytics" element={<CsAnalyticsPage />} />
      </Route>

      {/* Halaman publik per organisasi, mis. /khb-bandung */}
      <Route path="/:slug" element={<StoreChatPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
