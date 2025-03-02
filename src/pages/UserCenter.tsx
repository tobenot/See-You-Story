import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Tabs, Button, Avatar, message } from 'antd';
import { LogoutOutlined, UserOutlined, BookOutlined, HistoryOutlined, CrownOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';
import * as authApi from '../api/auth';
import * as membershipApi from '../api/membership';

const { TabPane } = Tabs;

interface UserInfo {
  id: number;
  username: string;
  email: string;
  membershipType: string;
  membershipExpiry: string;
  remainingDays?: number;
}

const UserCenter: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从localStorage获取基本用户信息，并从API获取会员信息
    const fetchUserInfo = async () => {
      try {
        const userStr = localStorage.getItem('user');
        let userData = null;
        
        if (userStr) {
          userData = JSON.parse(userStr);
          
          // 默认会员信息
          let membershipInfo = {
            type: '免费会员',
            expiresAt: '永久',
            remainingDays: 0
          };
          
          try {
            // 从API获取会员信息
            const response = await membershipApi.getMembershipInfo();
            if (response.data) {
              const membership = response.data;
              
              // 根据会员类型设置显示名称
              let membershipType = '免费会员';
              if (membership.active && membership.type) {
                switch(membership.type) {
                  case 'premium':
                    membershipType = '高级会员';
                    break;
                  case 'basic':
                    membershipType = '基础会员';
                    break;
                  default:
                    membershipType = '免费会员';
                }
              }
              
              // 设置过期时间显示
              const expiryDate = membership.expiresAt 
                ? new Date(membership.expiresAt).toLocaleDateString('zh-CN') 
                : '永久';
              
              membershipInfo = {
                type: membershipType,
                expiresAt: membership.active ? expiryDate : '永久',
                remainingDays: membership.remainingDays || 0
              };
            }
          } catch (err) {
            console.error('获取会员信息失败', err);
          }
          
          setUserInfo({
            id: userData.id,
            username: userData.username,
            email: userData.email || '',
            membershipType: membershipInfo.type,
            membershipExpiry: membershipInfo.expiresAt,
            remainingDays: membershipInfo.remainingDays
          });
        }
      } catch (error) {
        console.error('解析用户信息失败', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('登出失败:', error);
    }
    
    // 无论API是否成功，都清除本地存储并跳转
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    message.success('退出登录成功');
    navigate('/auth');
  };

  const handleUpgradeMembership = () => {
    navigate('/membership');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 左侧用户信息卡片 */}
          <div className="w-full md:w-1/3">
            <Card className="mb-6">
              <div className="flex flex-col items-center">
                <Avatar size={64} icon={<UserOutlined />} className="mb-4" />
                <h2 className="text-xl font-bold mb-1">{userInfo?.username || '用户'}</h2>
                <p className="text-gray-500 mb-4">{userInfo?.email || ''}</p>
                
                <div className="w-full border-t pt-4 mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">会员类型:</span>
                    <span className="font-medium">{userInfo?.membershipType || '免费会员'}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">到期时间:</span>
                    <span>{userInfo?.membershipExpiry || '永久'}</span>
                  </div>
                  {userInfo?.remainingDays && userInfo.remainingDays > 0 && (
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">剩余天数:</span>
                      <span className="text-orange-500 font-medium">{userInfo.remainingDays}天</span>
                    </div>
                  )}
                  
                  <Button 
                    type="primary" 
                    icon={<CrownOutlined />} 
                    block
                    onClick={handleUpgradeMembership}
                  >
                    升级会员
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card>
              <Button 
                type="text" 
                danger 
                icon={<LogoutOutlined />} 
                block
                onClick={handleLogout}
              >
                退出登录
              </Button>
            </Card>
          </div>
          
          {/* 右侧内容区域 */}
          <div className="w-full md:w-2/3">
            <Card>
              <Tabs defaultActiveKey="stories">
                <TabPane tab={<span><BookOutlined />我的故事</span>} key="stories">
                  <div className="p-4 text-center text-gray-500">
                    您还没有创建故事
                  </div>
                </TabPane>
                <TabPane tab={<span><HistoryOutlined />历史记录</span>} key="history">
                  <div className="p-4 text-center text-gray-500">
                    暂无历史记录
                  </div>
                </TabPane>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserCenter; 