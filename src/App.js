import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem 
} from 'reactstrap';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import DepositFundsPage from './components/DepositFundsPage';
import CommitFundsPage from './components/CommitFundsPage';
import CreateOfferPage from './components/CreateOfferPage';

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
              <Row style={{ backgroundColor: "white" }}>
                <Col lg={3} style={{ backgroundColor: "#343a40", padding: '0' }}>
                  <ListGroup>
                    <ListGroupItem tag="a" href="/deposit_funds">Deposit Funds</ListGroupItem>
                    <ListGroupItem tag="a" href="/commit_funds">Commit Funds</ListGroupItem>
                    <ListGroupItem tag="a" href="/create_offer">Create Order</ListGroupItem>
                  </ListGroup>    
                </Col>
                <Col lg={9} style={{ minHeight: "560px", paddingTop: "30px" }}>
                  <Route exact path="/deposit_funds" component={DepositFundsPage}/>
                  <Route exact path="/commit_funds" component={CommitFundsPage}/>
                  <Route exact path="/create_offer" component={CreateOfferPage}/>
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