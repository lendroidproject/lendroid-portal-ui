import React, { Component } from 'react';
import { Row, Col, Table} from 'reactstrap'
import { Form, Select, InputNumber, Button } from 'antd';
import './DepositFunds.css';

const availableTokens = [
  {
    tokenName: 'ETH',
    amount: 10,
  },
  {
    tokenName: 'OMG',
    amount: 1000,
  }
];

class DepositFunds extends Component {
  
  handleSubmitDeposit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('------should integreate with api---------');
        console.log(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4}
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };

    return (
      <Row 
        className="deposit-funds"
      >
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
                    {required: true, message: 'Please select a loan token to deposit'}
                  ]
                })(
                  <Select
                    placeholder="Select a loan token"
                    size="large"
                  >
                    {
                      availableTokens.map((token) => (
                        <Select.Option 
                          key={token.tokenName}
                          value={token.tokenName}
                        >
                          {token.tokenName}
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
                    style={{width: '100%'}}
                  />
                )
              }
            </Form.Item>
            <Form.Item 
              wrapperCol={{span: 20, offset: 4}}
            >
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Col>

        <Col md="12" className="available-tokens-table">
          <h4> Available Tokens </h4>
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>Token Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                availableTokens.map((token, index) =>(
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{token.tokenName}</td>
                    <td>{token.amount}</td>
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

const WrappedDepositFunds = Form.create()(DepositFunds);

export default WrappedDepositFunds;