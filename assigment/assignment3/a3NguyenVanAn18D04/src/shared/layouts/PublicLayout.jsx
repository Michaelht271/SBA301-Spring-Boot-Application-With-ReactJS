import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";


const { Content } = Layout;

const PublicLayout = () => {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header layoutType="public" />
      <Content style={{ padding: '0px 0px', minHeight: 'calc(100vh - 64px - 100px)' }}>
        <div className="site-layout-content" style={{ padding: '24px 50px' }}>
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default PublicLayout;
