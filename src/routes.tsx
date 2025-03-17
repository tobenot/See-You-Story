import React from 'react';
import { Navigate, RouteObject, useLocation } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import StoryResult from './pages/StoryResult';
import StoryJourney from './pages/StoryJourney';
import StoryChapter from './pages/StoryChapter';
import StoryAnalysis from './pages/StoryAnalysis';
import CharacterExtraction from './pages/CharacterExtraction';
import Membership from './pages/Membership';
import UserCenter from './pages/UserCenter';

// 验证是否已登录
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// 需要登录的路由
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return element;
};

// 路由配置
const routes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedRoute element={<Home />} />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/story-journey',
    element: <ProtectedRoute element={<StoryJourney />} />,
  },
  {
    path: '/story-result',
    element: <ProtectedRoute element={<StoryResult />} />,
  },
  {
    path: '/story-chapter',
    element: <ProtectedRoute element={<StoryChapter />} />,
  },
  {
    path: '/story-analysis',
    element: <ProtectedRoute element={<StoryAnalysis />} />,
  },
  {
    path: '/character-extraction',
    element: <ProtectedRoute element={<CharacterExtraction />} />,
  },
  {
    path: '/membership',
    element: <ProtectedRoute element={<Membership />} />,
  },
  {
    path: '/user-center',
    element: <ProtectedRoute element={<UserCenter />} />,
  },
  {
    path: '*',
    element: <Navigate to="/auth" replace />,
  },
];

export default routes; 