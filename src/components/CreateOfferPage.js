import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';

const MARKETS = {
    'OMG_ETH': { pair: 'OMG/ETH', loanToken: 'OMG', cost: '100 szabo' },
    'ZRX_ETH': { pair: 'ZRX/ETH', loanToken: 'ZRX', cost: '150 szabo' },
}
class CreateOfferPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tokenPair: MARKETS['OMG_ETH'].pair,
            quantity: 0,
            loanToken: MARKETS['OMG_ETH'].loanToken,
            cost: MARKETS['OMG_ETH'].cost
        };
    
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleMarketChange = this.handleMarketChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleMarketChange = (event) => {
        const state = this.state;
        const market = MARKETS[event.target.value];
        state['tokenPair'] = market.tokenPair;
        state['loanToken'] = market.loanToken;
        state['cost'] = market.cost;
        this.setState(state);
      }
   
    handleQuantityChange = (event) => {
        const state = this.state;
        state['quantity'] = event.target.value;
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { tokenPair, quantity, loanToken, cost } = this.state;
    }

    render() {
        return (
            <Form className="offer-form" onSubmit={this.handleSubmit}>
                <FormGroup row>
                <Label for="market" sm={2}>Market</Label>
                <Col sm={10}>
                    <Input type="select" name="market" id="market" onChange={this.handleMarketChange}>
                        <option value="OMG_ETH">OMG/ETH</option>
                        <option value="ZRX_ETH">ZRX/ETH</option>
                    </Input>
                </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="quantity" sm={2}>Quantity</Label>
                <Col sm={10}>
                    <Input value={this.state.quantity} type="number" name="quantity" id="quantity" placeholder="1000" onChange={this.handleQuantityChange} />
                </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="loanToken" sm={2}>Loan Token</Label>
                <Col sm={10}>
                    <Input value={this.state.loanToken} type="text" name="loanToken" id="loan-token" placeholder="OMG"/>
                </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="cost" sm={2}>Cost</Label>
                <Col sm={10}>
                    <Input value={this.state.cost} type="text" name="cost" id="cost" placeholder="100 szabo"/>
                </Col>
                </FormGroup>
                <FormGroup row>
                    <Col className="text-center">
                        <Button>Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default CreateOfferPage;