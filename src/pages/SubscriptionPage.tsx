import React from 'react';
import { Card, Row, Col, Button, Typography, Divider, Tag, List } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  title: string;
  price: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  popular?: boolean;
}

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();

  const plans: PricingPlan[] = [
    {
      id: 'free',
      title: '免费版',
      price: '¥0',
      description: '适合初次体验的用户',
      features: [
        { text: '3个免费故事分析', included: true },
        { text: '基础故事库访问', included: true },
        { text: '分析卡片功能', included: true },
        { text: '无限角色讨论', included: false },
        { text: '高级故事解锁', included: false },
        { text: '自定义分析颜色', included: false },
      ],
      buttonText: '当前方案',
    },
    {
      id: 'standard',
      title: '标准版',
      price: '¥39/月',
      description: '适合故事爱好者',
      features: [
        { text: '无限故事分析', included: true },
        { text: '完整故事库访问', included: true },
        { text: '分析卡片功能', included: true },
        { text: '无限角色讨论', included: true },
        { text: '高级故事解锁', included: false },
        { text: '自定义分析颜色', included: false },
      ],
      buttonText: '立即订阅',
      popular: true,
    },
    {
      id: 'premium',
      title: '高级版',
      price: '¥99/月',
      description: '适合专业分析者',
      features: [
        { text: '无限故事分析', included: true },
        { text: '完整故事库访问', included: true },
        { text: '高级分析卡片功能', included: true },
        { text: '无限角色讨论', included: true },
        { text: '高级故事解锁', included: true },
        { text: '自定义分析颜色', included: true },
      ],
      buttonText: '立即订阅',
    },
  ];

  const handleSubscribe = (planId: string) => {
    // 这里应该跳转到实际的支付页面或集成支付功能
    console.log(`订阅方案: ${planId}`);
    alert(`订阅功能即将推出，敬请期待！`);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <Title level={1}>选择订阅方案</Title>
        <Paragraph style={{ fontSize: 18 }}>
          解锁更多故事分析功能，提升您的体验
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} justify="center">
        {plans.map((plan) => (
          <Col key={plan.id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              style={{
                height: '100%',
                borderColor: plan.popular ? '#1890ff' : undefined,
                transform: plan.popular ? 'scale(1.05)' : undefined,
                zIndex: plan.popular ? 1 : 0,
                boxShadow: plan.popular ? '0 4px 12px rgba(0,0,0,0.1)' : undefined,
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                  }}
                >
                  <Tag color="blue">最受欢迎</Tag>
                </div>
              )}
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Title level={3}>{plan.title}</Title>
                <Title level={2} style={{ margin: '16px 0' }}>
                  {plan.price}
                </Title>
                <Paragraph type="secondary">{plan.description}</Paragraph>
              </div>

              <Divider style={{ margin: '16px 0' }} />

              <List
                itemLayout="horizontal"
                dataSource={plan.features}
                renderItem={(feature) => (
                  <List.Item style={{ padding: '8px 0' }}>
                    {feature.included ? (
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: '#d9d9d9', marginRight: 8 }} />
                    )}
                    <span style={{ color: feature.included ? 'inherit' : '#d9d9d9' }}>
                      {feature.text}
                    </span>
                  </List.Item>
                )}
                style={{ marginBottom: 24 }}
              />

              <Button
                type={plan.popular ? 'primary' : 'default'}
                block
                size="large"
                onClick={() => handleSubscribe(plan.id)}
                disabled={plan.id === 'free'}
              >
                {plan.buttonText}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Button type="link" onClick={() => navigate(-1)}>
          返回上一页
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionPage; 