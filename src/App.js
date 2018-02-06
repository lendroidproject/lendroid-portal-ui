import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';

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
      <div>
        <Container>
          <Row>
            <Col lg={{ size: 10, offset: 1}}>
              <Row style={{ backgroundColor: "white" }}>
                <Col lg={3} style={{ backgroundColor: "#343a40" }}>
                  <Navbar color="transparent" toggleable style={{  color: "white !important"}} >
                    <NavbarToggler right onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav vertical={true} navbar>
                        <NavItem>
                          <NavLink href="">Deposit Funds</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="">Commit Funds</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="">Create Offer</NavLink>
                        </NavItem>
                      </Nav>
                    </Collapse>
                  </Navbar>
                </Col>
                <Col lg={9}>
                  <div style={{ minHeight: "560px" }}></div>
                </Col>
              </Row>
            </Col>
          </Row>
      </Container>

      </div>
    );
  }
}

export default App;