import React, { PureComponent } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import ViewOffers from '../ViewOffers/ViewOffers';
import CommitFunds from '../CommitFunds/CommitFunds';
import CreateOffer from '../CreateOffer/CreateOffer';
import DepositFunds from '../DepositFunds/DepositFunds';
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
                  <span className="web3-provider">
                    Meta Mask
                  </span>
                  <br/>
                  <span className="web3-address">
                    0x0980248324...1321
                  </span>
                </div>
                <Icon
                  type="down"
                  className="menu-icon"
                />
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
            >
              <Menu.Item key="1">
                <NavLink to="/view-offers" activeClassName="active">
                  <Icon type="bars" />
                  <span>View Offers</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="2">
                <NavLink to="/create-offer" activeClassName="active">
                  <Icon type="plus-square-o" />
                  <span>Create Offer</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="3">
                <NavLink to="/commit-funds" activeClassName="active">
                  <Icon type="upload" />
                  <span>Commit Funds</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="4">
                <NavLink to="/deposit-funds" activeClassName="active">
                  <Icon type="wallet" />
                  <span>Deposit Funds</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>

          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            <Switch>
              <Route exact path="/view-offers" render={ (routeProps)=> <ViewOffers {...routeProps} {...this.props}/> } />
              <Route exact path="/commit-funds" render={ (routeProps)=> <CommitFunds {...routeProps} {...this.props}/> } />
              <Route exact path="/create-offer" render={ (routeProps)=> <CreateOffer {...routeProps} {...this.props}/> } />
              <Route exact path="/deposit-funds" render={ (routeProps)=> <DepositFunds {...routeProps} {...this.props}/> } />
              <Redirect to="/view-offers"/>
            </Switch>
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
