import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import SubscriptionPage from './pages/SubscriptionPage';
import { AuthProvider } from './context/AuthContext';
import { StoryProvider } from './context/StoryContext';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StoryProvider>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Content style={{ padding: '0', background: '#fff' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/stories" element={<StoriesPage />} />
                <Route path="/story/:id" element={<StoryDetailPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
              </Routes>
            </Content>
            <AppFooter />
          </Layout>
        </Router>
      </StoryProvider>
    </AuthProvider>
  );
};

export default App;
