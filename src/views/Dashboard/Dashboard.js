import React, { Component } from 'react';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
		}
		this.fetchAPI();
	}

  fetchAPI() {
  	fetch('https://api.nanopool.org/v1/eth/payments/0x2bedd2529f550c2cc2146633c738cbb7945adaef').then((Response) => Response.json()).then((findresponse) => {
  		console.log(findresponse);
  		this.setState({
  			data: [findresponse.data],
  		});
  	})
  }

  render() {
    return (
      <div className="animated fadeIn">
      <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Etherscan.io (<a href="https://api.nanopool.org/v1/eth/payments/0x2bedd2529f550c2cc2146633c738cbb7945adaef" title="API" target="_blank">https://api.nanopool.org/v1/eth/payments/0x2bedd2529f550c2cc2146633c738cbb7945adaef</a>)
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Date</th>
                    <th>TxHash</th>
                    <th>Amount</th>
                    <th>Confirmed</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
		          	this.state.data.map((dynamicData, Key) => {
			            let keys = Object.keys(dynamicData);
			            return keys.map(data => {
			              let date = new Date(dynamicData[data].date * 1000);
			              let hashLink = "https://etherscan.io/tx/" + dynamicData[data].txHash;
			              return (
			              	<tr key={ dynamicData[data].txHash }>
			                  <td>{ String(date).substring(4,15) }</td>
			                  <td><a href={ hashLink } target="_blank">{ dynamicData[data].txHash }</a></td>
			                  <td>{ dynamicData[data].amount }</td>
			                  <td class="text-center">{ String(dynamicData[data].confirmed).toUpperCase() }</td>
			                </tr>
			              );
			            });
			          })
			        }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard;
