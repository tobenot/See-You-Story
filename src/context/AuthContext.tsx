import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../api/services';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 从本地存储中获取用户信息
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await authService.login(username, password);
      const userData = response.data;
      
      // 保存token和用户信息到本地存储
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error) {
      console.error('登录失败', error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await authService.register(username, password);
      // 注册成功后自动登录
      await login(username, password);
    } catch (error) {
      console.error('注册失败', error);
      throw error;
    }
  };

  const logout = () => {
    // 清除本地存储和状态
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 