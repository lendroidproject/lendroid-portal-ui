import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { BigNumber } from 'bignumber.js';
import { connect } from 'react-redux'

class CreateOffer extends Component {

    constructor(props) {
        super(props);
        this.tokens = this.props.tokens;
        this.lendroid = this.props.lendroid;

        this.state = {
            tokenPair: 'OMG/ETH',
            loanTokenSymbol: 'OMG',
            loanTokenAddress: this.lendroid.getTokenAddress('OMG'),
            loanTokenAmount: 1,
            loanCostTokenSymbol: 'ETH',
            loanCostTokenAddress: this.lendroid.getTokenAddress('ETH'),
            loanCostTokenAmount: 1,
            loanInterestTokenSymbol: 'ETH',
            loanInterestTokenAddress: this.lendroid.getTokenAddress('ETH'),
            loanInterestTokenAmount: 0,
            wranglerAddress: '',
            totalCostAmount: 0
        }

        this.handleWranglerAddressChange = this.handleWranglerAddressChange.bind(this);
        this.handleQuantityChange = this.handleLoanTokenAmountChange.bind(this);
        this.handleMarketChange = this.handleMarketChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toBigNumber(tokenAmount) {
        return (new BigNumber(tokenAmount)).times('10e+18').toString(10);
    }

    handleWranglerAddressChange(event) {
        const state = this.state;
        state['wranglerAddress'] = event.target.value;
        this.setState(state);
    }

    handleMarketChange = (event) => {
        const state = this.state;
        const market = this.props.markets[event.target.value];
        state['tokenPair'] = market.tokenPair;
        state['loanTokenSymbol'] = market.baseTokenSymbol;
        state['loanTokenAddress'] = market.baseTokenAddress;
        state['loanCostTokenSymbol'] = market.quoteTokenSymbol;
        state['loanCostTokenAddress'] = market.quoteTokenAddress;
        state['loanInterestTokenSymbol'] = market.loanInterestTokenSymbol;
        state['loanInterestTokenAddress'] = market.quoteTokenAddress;
        this.setState(state);
    }

    handleLoanTokenAmountChange = (event) => {
        const state = this.state;
        state['loanTokenAmount'] = parseFloat(event.target.value);
        state['totalCostAmount'] = (state['loanTokenAmount'] * this.state.loanCostTokenAmount).toFixed(10);
        state['loanInterestTokenAmount'] = (state['totalCostAmount'] * 0.01).toFixed(10);
        this.setState(state);
    }

    handleCostAmountChange = (event) => {
        const state = this.state;
        state['loanCostTokenAmount'] = parseFloat(event.target.value);
        state['totalCostAmount'] = (state['loanCostTokenAmount'] * this.state.loanTokenAmount).toFixed(10);
        state['loanInterestTokenAmount'] = (state['totalCostAmount'] * 0.001).toFixed(10);
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();

        const {
            loanTokenAmount, loanTokenSymbol, loanCostTokenSymbol, loanCostTokenAmount, loanInterestTokenAmount,
            wranglerAddress
        } = this.state

        this.lendroid.createLoanOffer(loanTokenSymbol, this.toBigNumber(loanTokenAmount),
            this.toBigNumber(loanCostTokenAmount), loanCostTokenSymbol, this.toBigNumber(loanInterestTokenAmount),
            wranglerAddress)
            .catch(console.error);
    }

    render() {
        const { loanTokenAmount, loanCostTokenAmount, loanInterestTokenAmount, totalCostAmount, wranglerAddress } = this.state;
        return (
            <Form className="offer-form" onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label for="market" sm={2}>Market</Label>
                    <Col sm={10}>
                        <Input type="select" name="market" id="market" onChange={this.handleMarketChange}>
                            {this.props.markets.map(function (market, index) {
                                return <option key={index} value={index}>{market.pair}</option>;
                            })}
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="quantity" sm={2}>Quantity</Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Input value={loanTokenAmount} type="number" name="quantity" id="quantity"
                                   placeholder="0"  step="0.0000001"  onChange={this.handleLoanTokenAmountChange}/>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <strong>{this.lendroid.getTokenNames()[0]}</strong>
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Cost" sm={2}>Cost
                        (<i>per <strong>{this.lendroid.getTokenNames()[1]}</strong></i>)</Label>
                    <Col>
                        <InputGroup>
                            <Input value={loanCostTokenAmount} type="number" name="costAmount" id="costAmount"
                                   placeholder="0" step="0.0000001" onChange={this.handleCostAmountChange}/>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <strong>{this.lendroid.getTokenNames()[1]}</strong>
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Cost" sm={2}>Total Cost</Label>
                    <Col>
                        <InputGroup>
                            <Input value={totalCostAmount} type="number" name="totalCostAmount" id="totalCostAmount"
                                   placeholder="0" step="0.0000001" step="any" disabled/>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <strong>{this.lendroid.getTokenNames()[1]}</strong>
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Interest" sm={2}>Interest</Label>
                    <Col>
                        <InputGroup>
                            <Input value={loanInterestTokenAmount} type="number" name="loandInterestAmount" id="loanInterestAmount"
                               placeholder="0.01" step="0.0000001" disabled />
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <strong>{this.lendroid.getTokenNames()[1]}</strong>
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Wrangler" sm={2}>Wrangler</Label>
                    <Col>
                        <InputGroup>
                            <Input value={wranglerAddress} type="text" name="wranglerAddress" id="wranglerAddress"
                               placeholder="0x0000000000000000000000000"
                               onChange={this.handleWranglerAddressChange} />
                        </InputGroup>
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

function mapStateToProps(state) {
    return {
        markets: state.markets.markets,
        tokens: state.tokens.tokens
    }
}

export default connect(mapStateToProps, null)(CreateOffer);
