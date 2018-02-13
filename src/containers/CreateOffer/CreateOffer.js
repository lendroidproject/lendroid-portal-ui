import React, { Component } from 'react';
import {
Col,
Button,
Form,
FormGroup,
Label,
InputGroup,
InputGroupAddon,
InputGroupText,
Input,
FormText,
Row
} from 'reactstrap';
import {BigNumber} from 'bignumber.js';
import { default as Web3 } from 'web3';
import axios from 'axios';

class CreateOffer extends Component {
    constructor(props) {
        super(props);
        const defaultMarket = this.props.markets[0];
        this.tokens = this.props.tokens;
        this.state = {
            tokenPair: defaultMarket.pair,
            loanTokenSymbol: defaultMarket.baseTokenSymbol,
            loanTokenAddress: defaultMarket.baseTokenAddress,
            loanTokenAmount: 1,
            loanCostTokenSymbol: defaultMarket.quoteTokenSymbol,
            loanCostTokenAddress: defaultMarket.quoteTokenAddress,
            loanCostTokenAmount: 1,
            loanInterestTokenSymbol: defaultMarket.quoteTokenAddress,
            loanInterestTokenAddress: defaultMarket.quoteTokenAddress,
            loanInterestTokenAmount: 0,
            totalCostAmount: 0,
        }

        this.handleQuantityChange = this.handleLoanTokenAmountChange.bind(this);
        this.handleMarketChange = this.handleMarketChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toBigNumber(tokenAmount, tokenAddress) {
        return (new BigNumber(tokenAmount)).times('10e+' + this.tokens[tokenAddress].decimals).toString(10);
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
        state['totalCostAmount'] = state['loanTokenAmount'] * this.state.loanCostTokenAmount;
        state['loanInterestTokenAmount'] = state['totalCostAmount'] * 0.01;
        this.setState(state);
    }

    handleCostAmountChange = (event) => {
        const state = this.state;
        state['loanCostTokenAmount'] = parseFloat(event.target.value);
        state['totalCostAmount'] = state['loanCostTokenAmount'] * this.state.loanTokenAmount;
        state['loanInterestTokenAmount'] = state['totalCostAmount'] * 0.001;
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        const lenderAddress = this.props.lenderAddress;
        const { tokenPair, loanTokenAmount, loanTokenAddress, loanCostTokenAddress,
                loanCostTokenAmount, loanInterestTokenAddress, loanInterestTokenAmount
              } = this.state;
        const payload =  {
            market: tokenPair,
            lenderAddress: lenderAddress,
            loanTokenAddress: loanTokenAddress,
            loanTokenAmount: this.toBigNumber(loanTokenAmount, loanInterestTokenAddress),
            loanCostTokenAddress: loanCostTokenAddress,
            loanCostTokenAmount: this.toBigNumber(loanCostTokenAmount, loanInterestTokenAddress),
            loanInterestTokenAddress: loanInterestTokenAddress,
            loanInterestTokenAmount: this.toBigNumber(loanInterestTokenAmount, loanInterestTokenAddress)
        };

        const web3 = new Web3(window.web3.currentProvider);
        web3.eth.getAccounts().then((accounts) => {
            return web3.eth.personal.sign(JSON.stringify(payload), accounts[0])
            .then((result) => {
                payload['ecSignature'] = result;
                return axios.post('http://localhost:8080/offers', payload).then((result) => {
                    console.log(result);
                });
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        const { tokenPair, loanTokenAmount, loanTokenAddress, loanCostTokenAddress,
                loanCostTokenAmount, loanInterestTokenAddress, loanInterestTokenAmount,
                totalCostAmount } = this.state;
        return (
            <Form className="offer-form" onSubmit={this.handleSubmit}>
                <FormGroup row>
                <Label for="market" sm={2}>Market</Label>
                <Col sm={10}>
                    <Input type="select" name="market" id="market" onChange={this.handleMarketChange}>
                        {this.props.markets.map(function(market, index){
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
                               placeholder="0" onChange={this.handleLoanTokenAmountChange} />
                           <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <strong>{ this.tokens[loanTokenAddress].symbol }</strong>
                                </InputGroupText>
                           </InputGroupAddon>
                       </InputGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Cost" sm={2}>Cost (<i>per <strong>{this.tokens[loanTokenAddress].symbol}</strong></i>)</Label>
                    <Col>
                        <InputGroup>
                            <Input value={loanCostTokenAmount} type="number" name="costAmount" id="costAmount"
                               placeholder="0" step="0.01" onChange={this.handleCostAmountChange} />
                            <InputGroupAddon addonType="prepend">
                                 <InputGroupText>
                                     <strong>{this.tokens[loanCostTokenAddress].symbol}</strong>
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
                               placeholder="0" step="any" disabled />
                            <InputGroupAddon addonType="prepend">
                                 <InputGroupText>
                                     <strong>{this.tokens[loanCostTokenAddress].symbol}</strong>
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
                               placeholder="0.01" step="0.01" disabled />
                            <InputGroupAddon addonType="prepend">
                                 <InputGroupText>
                                     <strong>{this.tokens[loanInterestTokenAddress].symbol}</strong>
                                 </InputGroupText>
                            </InputGroupAddon>
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

export default CreateOffer;
