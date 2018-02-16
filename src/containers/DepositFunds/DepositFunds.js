import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap'
import { Form, Select, InputNumber, Button } from 'antd';
import './DepositFunds.css';
import { TokenSymbol } from 'lendroid/dist/constants/tokens'

class DepositFunds extends Component {

    constructor(props) {
        super(props);
        this.lendroid = this.props.lendroid;
        this.state = {
            ethBalance: 0,
            omgBalance: 0,
            withdrawableEthBalance: 0,
            withdrawableOmgBalance: 0
        }
    }

    handleApproval = (e) => {
        e.preventDefault();
        this.lendroid.approveWalletForTransfer(this.lendroid.getTokenAddress('WETH'))
        this.lendroid.approveWalletForTransfer(this.lendroid.getTokenAddress('OMG'))
    }

    handleSubmitDeposit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values.quantity, values.loanToken)
            if (!err) {
                this.lendroid.depositFunds(values.quantity, values.loanToken)
            }
        });
    }

    componentWillMount = () => {
        const state = this.state

        this.lendroid.getWithdrawableBalance(this.lendroid.getTokenAddress('WETH'))
            .then(balance => {
                state.withdrawableEthBalance = balance
                this.setState(state)
            }).catch(console.error)

        this.lendroid.getWithdrawableBalance(this.lendroid.getTokenAddress('OMG'))
            .then(balance => {
                state.withdrawableOmgBalance = balance
                this.setState(state)
            }).catch(console.error)
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 }
            }
        };

        return (
            <Row className="deposit-funds">
                <Col md="12">
                    <h4>Approve use of funds</h4>
                    <Table>
                        <thead>
                        <tr>
                            <th>Token Name</th>
                            <th>Amount</th>
                            <th>Allowance</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key={'WETH'}>
                            <td><strong>WETH</strong></td>
                            <td>{this.state.ethBalance}</td>
                            <td><Button type="primary" htmlType="submit" onClick={this.handleApproval}>Approve</Button>
                            </td>
                        </tr>
                        <tr key={'OMG'}>
                            <td><strong>OMG</strong></td>
                            <td>{this.state.omgBalance}</td>
                            <td><Button type="primary" htmlType="submit" onClick={this.handleApproval}>Approve</Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md="12" className="loan-submit-form">
                    <h4>Deposit funds</h4>
                    <Form onSubmit={this.handleSubmitDeposit} className="deposit-form">
                        <Form.Item
                            {...formItemLayout}
                            label="Loan Token"
                        >
                            {
                                getFieldDecorator('loanToken', {
                                    rules: [
                                        { required: true, message: 'Please select a token to deposit' }
                                    ]
                                })(
                                    <Select
                                        placeholder="Select a token"
                                        size="large"
                                    >
                                        {
                                            this.lendroid.getTokenNames().map(token => (
                                                <Select.Option
                                                    key={token}
                                                    value={token}>
                                                    {token}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="Loan Amount"
                        >
                            {
                                getFieldDecorator('quantity', {
                                    initialValue: 1,
                                    rules: [
                                        {
                                            required: true, message: 'Please input token amount to deposit'
                                        }
                                    ]
                                })(
                                    <InputNumber
                                        min={0}
                                        size="large"
                                        style={{ width: '100%' }}
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 20, offset: 4 }}
                        >
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>

                <Col md="12" className="available-tokens-table">
                    <h4> Deposited Tokens </h4>
                    <Table>
                        <thead>
                        <tr>
                            <th>Token Name</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key={'WETH'}>
                            <td><strong>WETH</strong></td>
                            <td>{this.state.withdrawableEthBalance}</td>
                        </tr>
                        <tr key={'OMG'}>
                            <td><strong>OMG</strong></td>
                            <td>{this.state.withdrawableOmgBalance}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }
}

const WrappedDepositFunds = Form.create()(DepositFunds);

export default WrappedDepositFunds;
