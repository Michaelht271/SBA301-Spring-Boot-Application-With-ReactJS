import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";



const { Content } = Layout;

const CustomerLayout = () => {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header layoutType="customer" />
      <Content style={{ padding: '0px 0px', backgroundColor: '#f5f5f5' }}>
        <div 
          className="site-layout-content" 
          style={{ 
            padding: '24px 50px', 
            minHeight: 'calc(100vh - 64px - 100px)',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
          }}
        >
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', minHeight: '100%' }}>
            <Outlet />
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default CustomerLayout;
