import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavbarBrand
} from 'reactstrap';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

import DepositFundsPage from './components/DepositFundsPage';
import CommitFundsPage from './components/CommitFundsPage';
import CreateOfferPage from './components/CreateOfferPage';
import ViewOffersPage from './components/ViewOffersPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Router>
        <Container>
          <Row>
            <Col lg={{ size: 10, offset: 1}}>
              <Row>
                <Navbar color="faded" expand="xs">
                  <NavbarBrand >Lender Portal</NavbarBrand>
                    <Nav horizontal="end">
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          Accounts
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem>
                            Account 1
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>
                            Account 2
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                </Navbar>
              </Row>
              <Row style={{ backgroundColor: "white" }}>
                <Col lg={3} style={{ backgroundColor: "#343a40", padding: '0' }}>
                  <Nav className="App-sidebar-nav" vertical={true}>
                    <NavItem>
                      <br />
                    </NavItem>
                    <NavItem>
                      <NavLink href="/offers">Pending Offers</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/create_offer">Create Offers</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/deposit_funds">Deposit Funds</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/commit_funds">Commit Funds</NavLink>
                    </NavItem>
                  </Nav>    
                </Col>
                <Col lg={9} style={{ minHeight: "480px", paddingTop: "30px" }}>
                  <Route exact path="/offers" component={ViewOffersPage}/>
                  <Route exact path="/create_offer" component={CreateOfferPage}/>
                  <Route exact path="/deposit_funds" component={DepositFundsPage}/>
                  <Route exact path="/commit_funds" component={CommitFundsPage}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default App;