import React, { PureComponent } from 'react';
import {
  Layout,
  Menu,
  Icon,
  Dropdown,
  Avatar
} from 'antd';
import './MainLayout.css';

const { Header, Content, Footer, Sider } = Layout;

const UserMenu = (props) => (
  <Menu {...props}>
    <Menu.Item key="1">
      User Wallet
    </Menu.Item>
    <Menu.Item key="2">
      User Wallet
    </Menu.Item>
    <Menu.Item key="3">
      User Wallet
    </Menu.Item>
  </Menu>
);

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
        <Header className="header">
          <div className="app-logo">
            <h1>Lendroid</h1>
          </div>

          <div className="user-menu">
            <Dropdown overlay={<UserMenu/>}>
              <div className="user-avatar">
                <Avatar size="large">
                  <Icon type="user"/>
                </Avatar>
                <div className="wallet-info">
                  <span className="web3-provider">Meta Mask</span><br/>
                  <span className="web3-address">0x0980248324...1321</span>
                </div>
                <Icon type="down" className="menu-icon"/>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Layout>
          <Sider  
            collapsible
            onCollapse={this.handleSidebarCollapse}
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
                <span>Commit Funds</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>Create Offer</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>Deposit Funds</span>
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

  handleSidebarCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
}

export default MainLayout;