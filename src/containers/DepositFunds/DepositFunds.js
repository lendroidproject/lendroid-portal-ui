import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap'
import { Form, Select, InputNumber, Button } from 'antd';
import './DepositFunds.css';

class DepositFunds extends Component {

    constructor(props) {
        super(props)
        this.lendroid = this.props.lendroid
        this.state = {
            ethBalance: 0,
            omgBalance: 0,
            withdrawablEthBalance: 0,
            withdrawablOmgBalance: 0
        }
    }

    handleApproval(e) {
        e.preventDefault();
        const target = e.target;
     //   this.lendroid.getApproval('ETH')
    }

    handleSubmitDeposit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.lendroid.depositFunds(values.quantity, values.loanToken)
            }
        });
    }

    componentWillMount() {
        const state = this.state

        this.lendroid.getWithdrawableBalance(this.lendroid.getTokenAddress('ETH'))
            .then(balance => {
                state.withdrawablEthBalance = balance
                this.setState(state)
            }).catch(console.error)

        this.lendroid.getWithdrawableBalance(this.lendroid.getTokenAddress('OMG'))
            .then(balance => {
                state.withdrawablOmgBalance = balance
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
                    <Table>
                        <thead>
                        <tr>
                            <th>Token Name</th>
                            <th>Amount</th>
                            <th>Allowance</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key={'ETH'}>
                            <td><strong>ETH</strong></td>
                            <td>{this.state.ethBalance}</td>
                            <td><Button type="primary" htmlType="submit" onClick={ this.handleApproval }>Approve</Button></td>
                        </tr>
                        <tr key={'OMG'}>
                            <td><strong>OMG</strong></td>
                            <td>{this.state.omgBalance}</td>
                            <td><Button type="primary" htmlType="submit" onClick={ this.handleApproval }>Approve</Button></td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md="12" className="loan-submit-form">
                    <h4>Submit your loan</h4>
                    <Form onSubmit={this.handleSubmitDeposit} className="deposit-form">
                        <Form.Item
                            {...formItemLayout}
                            label="Loan Token"
                        >
                            {
                                getFieldDecorator('loanToken', {
                                    rules: [
                                        { required: true, message: 'Please select a loan token to deposit' }
                                    ]
                                })(
                                    <Select
                                        placeholder="Select a loan token"
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
                        <tr key={'ETH'}>
                            <td><strong>ETH</strong></td>
                            <td>{this.state.withdrawablEthBalance}</td>
                        </tr>
                        <tr key={'OMG'}>
                            <td><strong>OMG</strong></td>
                            <td>{this.state.withdrawablOmgBalance}</td>
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
