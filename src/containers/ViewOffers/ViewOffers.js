import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Lendroid } from 'lendroid'

class ViewOffers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: []
        }
    }

    componentDidMount() {
        const hostServer = window.location.origin
        const lendroid = new Lendroid(hostServer+'/offers?address=' + this.props.lenderAddress);
        lendroid.getLoanOffers()
            .then(response =>  {
                console.log(response)
                this.setState({ offers: response.offers || [] })
            })
            .catch(console.error);
    }

    render() {
        const { offers } = this.state;
        const offerNodes = offers.map(function (offer, index) {
            return (
                <tr key={index}>
                    <td>{offer.market}</td>
                    <td>{offer.loanTokenSymbol}</td>
                    <td>{offer.loanTokenAmount}</td>
                    <td>{offer.loanCostTokenAmount} {offer.loanCostTokenSymbol}</td>
                </tr>
            );
        });
        return (
            <Table striped hover responsive>
                <thead>
                <tr>
                    <th>Market</th>
                    <th>Loan Token</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                </tr>
                </thead>
                <tbody>
                {offerNodes}
                </tbody>
            </Table>
        );
    }
}

export default ViewOffers;
