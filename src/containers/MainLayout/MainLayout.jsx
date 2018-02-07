import React, { PureComponent } from 'react';
import {
  Layout,
  Menu,
  Icon
} from 'antd';
import './MainLayout.css';

const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    }
  }

  render() {
    return (
      <Layout className="main-layout">
        <Header
          className="header"
          style={{ background: '#fff', padding: 0 }}
        >
          <span className="app-logo">
            <h1>Lendroid</h1>
          </span>
        </Header>

        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
            >
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>

          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            Contents
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;