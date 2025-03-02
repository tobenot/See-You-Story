import React, { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';
import * as membershipApi from '../api/membership';

interface MembershipInfo {
  active: boolean;
  type: string;
  expiresAt: string | null;
  remainingDays: number;
}

const Membership: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentPeriod, setPaymentPeriod] = useState<'monthly' | 'quarterly'>('monthly');
  const [redeemCode, setRedeemCode] = useState('');
  const [membershipInfo, setMembershipInfo] = useState<MembershipInfo | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [redeeming, setRedeeming] = useState(false);

  useEffect(() => {
    // 获取当前会员信息
    const fetchMembershipInfo = async () => {
      try {
        setLoading(true);
        const response = await membershipApi.getMembershipInfo();
        setMembershipInfo(response.data);
        
        // 设置当前选中的计划
        if (response.data && response.data.active && response.data.type) {
          setSelectedPlan(response.data.type);
        } else {
          setSelectedPlan('free');
        }
      } catch (error) {
        console.error('获取会员信息失败:', error);
        // 如果获取失败，默认设置为免费会员
        setSelectedPlan('free');
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipInfo();
  }, []);

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };
  
  const handleSubscribe = async () => {
    if (!selectedPlan || selectedPlan === 'free') return;
    
    try {
      setLoading(true);
      await membershipApi.subscribePlan(selectedPlan, paymentPeriod);
      message.success(`已成功订阅${selectedPlan}，${paymentPeriod === 'monthly' ? '月付' : '季付'}`);
      
      // 刷新会员信息
      const response = await membershipApi.getMembershipInfo();
      setMembershipInfo(response.data);
    } catch (error) {
      console.error('订阅失败:', error);
      message.error('订阅失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRedeem = async () => {
    if (!redeemCode.trim()) {
      message.warning('请输入兑换码');
      return;
    }
    
    try {
      setRedeeming(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await membershipApi.redeemCode(redeemCode);
      message.success('兑换成功，会员权益已更新');
      
      // 刷新会员信息
      const membershipResponse = await membershipApi.getMembershipInfo();
      setMembershipInfo(membershipResponse.data);
      setRedeemCode(''); // 清空兑换码输入框
    } catch (error) {
      console.error('兑换失败:', error);
      // 显示更详细的错误信息
      if (error instanceof Error && 'response' in error) {
        const apiError = error as { response?: { data?: { error?: string } } };
        if (apiError.response?.data?.error) {
          message.error(`兑换失败: ${apiError.response.data.error}`);
        } else {
          message.error('兑换失败，请检查兑换码是否有效');
        }
      } else {
        message.error('兑换失败，请检查兑换码是否有效');
      }
    } finally {
      setRedeeming(false);
    }
  };

  // 渲染会员状态信息
  const renderMembershipStatus = () => {
    if (!membershipInfo) return null;
    
    // 免费会员或会员已过期
    if (!membershipInfo.active || membershipInfo.type === 'free') {
      return null;
    }
    
    // 显示有效会员信息
    const memberType = membershipInfo.type === 'premium' ? '高级会员' : 
                       membershipInfo.type === 'basic' ? '基础会员' : '免费会员';
    
    const expiryDate = membershipInfo.expiresAt 
      ? new Date(membershipInfo.expiresAt).toLocaleDateString('zh-CN')
      : '未知';
      
    return (
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
        <h3 className="text-lg font-medium text-blue-800 mb-2">当前会员状态</h3>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="mb-2 sm:mb-0">
            <span className="text-gray-600 mr-2">会员类型:</span>
            <span className="font-medium">{memberType}</span>
          </div>
          <div className="mb-2 sm:mb-0">
            <span className="text-gray-600 mr-2">到期时间:</span>
            <span className="font-medium">{expiryDate}</span>
          </div>
          <div>
            <span className="text-gray-600 mr-2">剩余天数:</span>
            <span className="font-medium text-orange-500">{membershipInfo.remainingDays} 天</span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">选择适合你的会员级别</h1>
          <p className="text-gray-500">解锁更多功能，获得更好的故事体验</p>
        </div>
        
        {/* 会员状态信息 */}
        {renderMembershipStatus()}
        
        {/* 会员计划选择 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 免费会员 */}
          <div 
            className={`border rounded-lg p-6 bg-white hover:shadow-md transition ${selectedPlan === 'free' ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}
            onClick={() => handlePlanSelect('free')}
          >
            <h2 className="text-xl font-bold mb-2">免费会员</h2>
            <div className="text-2xl font-bold mb-4">¥0</div>
            <p className="text-gray-500 mb-4">永久免费</p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckOutlined className="text-green-500 mt-1 mr-2" />
                <span>每日3个故事生成</span>
              </li>
              <li className="flex items-start">
                <CheckOutlined className="text-green-500 mt-1 mr-2" />
                <span>每日10次角色对话</span>
              </li>
              <li className="flex items-start">
                <CheckOutlined className="text-green-500 mt-1 mr-2" />
                <span>角色刷新1次/天</span>
              </li>
            </ul>
            
            <div className="text-center">
              {!membershipInfo?.active && (
                <div className="text-blue-500 font-medium">当前级别</div>
              )}
            </div>
          </div>
          
          {/* 基础会员 */}
          <div 
            className={`border rounded-lg p-6 bg-white hover:shadow-md transition ${selectedPlan === 'basic' ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}
            onClick={() => handlePlanSelect('basic')}
          >
            <h2 className="text-xl font-bold mb-2">基础会员</h2>
            <div className="flex justify-center space-x-4 mb-4">
              <div className={`text-2xl font-bold ${paymentPeriod === 'monthly' ? 'text-black' : 'text-gray-400'}`}>
                ¥28
              </div>
              <div className={`text-2xl font-bold ${paymentPeriod === 'quarterly' ? 'text-black' : 'text-gray-400'}`}>
                ¥78
              </div>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              <div 
                className={`cursor-pointer ${paymentPeriod === 'monthly' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPaymentPeriod('monthly');
                }}
              >
                月付
              </div>
              <div 
                className={`cursor-pointer ${paymentPeriod === 'quarterly' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPaymentPeriod('quarterly');
                }}
              >
                季付
              </div>
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckOutlined className="text-green-500 mt-1 mr-2" />
                <span>每日10个故事生成</span>
              </li>
              <li className="flex items-start">
                <CheckOutlined className="text-green-500 mt-1 mr-2" />
                <span>每日30次角色对话</span>
              </li>
              <li className="flex items-start">
                <CheckOutlined className="text-green-500 mt-1 mr-2" />
                <span>角色刷新3次/天</span>
              </li>
            </ul>
            
            <Button 
              type="default" 
              block 
              onClick={(e) => {
                e.stopPropagation();
                if (selectedPlan === 'basic') {
                  handleSubscribe();
                } else {
                  handlePlanSelect('basic');
                }
              }}
            >
              {membershipInfo?.active && membershipInfo.type === 'basic' ? '当前级别' : '选择'}
            </Button>
          </div>
          
          {/* 高级会员 */}
          <div 
            className={`border rounded-lg p-6 bg-gray-50 hover:shadow-md transition ${selectedPlan === 'premium' ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}
            onClick={() => handlePlanSelect('premium')}
          >
            <h2 className="text-xl font-bold mb-2">高级会员</h2>
            <div className="flex justify-center space-x-4 mb-4">
              <div className={`text-2xl font-bold ${paymentPeriod === 'monthly' ? 'text-black' : 'text-gray-400'}`}>
                ¥58
              </div>
              <div className={`text-2xl font-bold ${paymentPeriod === 'quarterly' ? 'text-black' : 'text-gray-400'}`}>
                ¥158
              </div>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              <div 
                className={`cursor-pointer ${paymentPeriod === 'monthly' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPaymentPeriod('monthly');
                }}
              >
                月付
              </div>
              <div 
                className={`cursor-pointer ${paymentPeriod === 'quarterly' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPaymentPeriod('quarterly');
                }}
              >
                季付
              </div>
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckOutlined className="text-green-500 mt-1 mr-2" />
                <span>每日20个故事生成</span>
              </li>
              <li className="flex items-start">
                <CheckOutlined className="text-green-500 mt-1 mr-2" />
                <span>每日50次角色对话</span>
              </li>
              <li className="flex items-start">
                <CheckOutlined className="text-green-500 mt-1 mr-2" />
                <span>无限角色刷新</span>
              </li>
            </ul>
            
            <Button 
              type={selectedPlan === 'premium' ? 'primary' : 'default'} 
              block 
              onClick={(e) => {
                e.stopPropagation();
                if (selectedPlan === 'premium') {
                  handleSubscribe();
                } else {
                  handlePlanSelect('premium');
                }
              }}
            >
              {membershipInfo?.active && membershipInfo.type === 'premium' ? '当前级别' : '选择'}
            </Button>
          </div>
        </div>
        
        {/* 兑换码部分 */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">使用兑换码</h2>
          <p className="text-gray-600 mb-4">如果你有兑换码，请在下方输入以激活相应的会员权益</p>
          <div className="flex space-x-2">
            <Input 
              placeholder="请输入兑换码" 
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              className="flex-1"
              disabled={redeeming}
            />
            <Button 
              type="default" 
              onClick={handleRedeem}
              loading={redeeming}
            >
              兑换
            </Button>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>注意: 我们仅支持兑换码方式订阅。兑换码可通过官方渠道购买。</p>
        </div>
      </div>
    </Layout>
  );
};

export default Membership; 