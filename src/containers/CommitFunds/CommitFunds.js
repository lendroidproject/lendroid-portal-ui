import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap'
import { Form, Select, InputNumber, Button } from 'antd';
import './CommitFunds.css';

class CommitFunds extends Component {

    constructor(props) {
        super(props);
        this.lendroid = this.props.lendroid;
        this.state = {
            ethBalance: 0,
            omgBalance: 0
        }
    }

    handleSubmitCommit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.lendroid.commitFunds(values.quantity, values.loanToken)
            }
        });
    }

    componentWillMount() {
        const state = this.state

        this.lendroid.getCashBalance(this.lendroid.getTokenAddress('WETH'))
            .then(balance => {
                state.ethBalance = balance
                this.setState(state)
            }).catch(console.error)

        this.lendroid.getCashBalance(this.lendroid.getTokenAddress('OMG'))
            .then(balance => {
                state.omgBalance = balance
                this.setState(state)
            }).catch(console.error)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const tokenSymbols = this.lendroid.getTokenNames()

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
            <Row className="commit-funds">
                <Col md="12" className="loan-commit-form">
                    <h4>Commit your loan</h4>
                    <Form onSubmit={this.handleSubmitCommit} className="commit-form">
                        <Form.Item
                            {...formItemLayout}
                            label="Commit Token">
                            {
                                getFieldDecorator('loanToken', {
                                    rules: [
                                        { required: true, message: 'Please select a loan token to commit' }
                                    ]
                                })(
                                    <Select
                                        placeholder="Select a loan token"
                                        size="large">
                                        {
                                            tokenSymbols.map((token) => (
                                                <Select.Option
                                                    key={token}
                                                    value={token}
                                                >
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
                            label="Commit Amount"
                        >
                            {
                                getFieldDecorator('quantity', {
                                    initialValue: 1,
                                    rules: [
                                        {
                                            required: true, message: 'Please input token amount to commit'
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
                    <h4> Committed Tokens </h4>
                    <Table>
                        <thead>
                        <tr>
                            <th>Token Name</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key={'WETH'}>
                            <td>WETH</td>
                            <td>{this.state.ethBalance}</td>
                        </tr>
                        <tr key={'OMG'}>
                            <td>OMG</td>
                            <td>{this.state.omgBalance}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }

}

const WrappedCommitFunds = Form.create()(CommitFunds);

export default WrappedCommitFunds;