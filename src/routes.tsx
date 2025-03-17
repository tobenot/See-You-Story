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

// 获取基础路径
const getBasePath = () => {
  return '/See-You-Story';
};

// 验证是否已登录
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// 需要登录的路由
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to={`${getBasePath()}/auth`} state={{ from: location }} replace />;
  }
  return element;
};

// 路由配置
const routes: RouteObject[] = [
  {
    path: `${getBasePath()}`,
    element: <ProtectedRoute element={<Home />} />,
  },
  {
    path: `${getBasePath()}/auth`,
    element: <Auth />,
  },
  {
    path: `${getBasePath()}/story-journey`,
    element: <ProtectedRoute element={<StoryJourney />} />,
  },
  {
    path: `${getBasePath()}/story-result`,
    element: <ProtectedRoute element={<StoryResult />} />,
  },
  {
    path: `${getBasePath()}/story-chapter`,
    element: <ProtectedRoute element={<StoryChapter />} />,
  },
  {
    path: `${getBasePath()}/story-analysis`,
    element: <ProtectedRoute element={<StoryAnalysis />} />,
  },
  {
    path: `${getBasePath()}/character-extraction`,
    element: <ProtectedRoute element={<CharacterExtraction />} />,
  },
  {
    path: `${getBasePath()}/membership`,
    element: <ProtectedRoute element={<Membership />} />,
  },
  {
    path: `${getBasePath()}/user-center`,
    element: <ProtectedRoute element={<UserCenter />} />,
  },
  {
    path: '*',
    element: <Navigate to={`${getBasePath()}/auth`} replace />,
  },
];

export default routes; 