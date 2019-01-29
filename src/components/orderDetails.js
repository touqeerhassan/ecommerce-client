import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom'

const ORDER_QUERY = gql`
  query orderQuery ($id:ID!) {
    order(id:$id) {
      customerName
      customerEmail
      customerAddress
      products {
        id
        name
        price
      }
    }
  }
`;

export default class orderDetails extends Component {
  render() {
    let { id } = this.props.match.params;
    id = parseInt(id);
    return (
      <Fragment>
        <Query query={ORDER_QUERY} variables={{ id }}>
          {
            ({ loading, error, data }) => {
              if (loading) return <h4>Loading ...</h4>
              if (error) console.log(error);
              const { order } = data;

              return (<Fragment>
                <div>Customer Name : {order.customerName}</div>
                <div>Customer Email : {order.customerEmail}</div>
                <div>Customer Address : {order.customerAddress}</div>
                <h4>Products</h4>
                <ul>
                  {
                    order.products.map(item => {
                      return <li key={item.id}>{item.name} - {item.price}$</li>
                    })
                  }
                </ul>
                <Link to={`/admin/order`} className="btn btn-secondary">Back to orders</Link>
              </Fragment>)
            }
          }
        </Query>
      </Fragment>
    )
  }
}
