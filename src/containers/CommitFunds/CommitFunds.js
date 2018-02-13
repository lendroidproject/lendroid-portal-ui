import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap'
import { Form, Select, InputNumber, Button } from 'antd';
import './CommitFunds.css';

class CommitFunds extends Component {

    constructor(props) {
        super(props);
        this.lendroid = this.props.lendroid;
    }

    handleSubmitCommit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.lendroid.commitFunds(values.quantity, values.loanToken)
            }
        });
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
            <Row
                className="commit-funds"
            >
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
                        {
                            this.lendroid.getTokenNames().map(token=> (
                                <tr key={token}>
                                    <td>{token}</td>
                                    <td>{token}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }

}

const WrappedCommitFunds = Form.create()(CommitFunds);

export default WrappedCommitFunds;