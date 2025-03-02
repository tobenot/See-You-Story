import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';

const { Footer } = Layout;
const { Text, Link } = Typography;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ background: '#f5f5f5', padding: '24px 50px' }}>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center' }}>
            <h3>See You Story</h3>
            <Text type="secondary">
              故事解析工具，帮助你更深入地理解故事
            </Text>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center' }}>
            <h3>联系我们</h3>
            <Space direction="vertical">
              <Text type="secondary">邮箱: support@see-you-story.com</Text>
              <Text type="secondary">QQ群: 123456789</Text>
            </Space>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center' }}>
            <h3>快速链接</h3>
            <Space direction="vertical">
              <Link href="/">首页</Link>
              <Link href="/stories">故事库</Link>
              <Link href="/about">关于我们</Link>
            </Space>
          </div>
        </Col>
      </Row>
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Text type="secondary">© {new Date().getFullYear()} See You Story. 保留所有权利.</Text>
      </div>
    </Footer>
  );
};

export default AppFooter; 