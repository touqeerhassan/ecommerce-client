import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ProductItem from './productItem';
import Checkout from "./checkout";

const PRODUCTS_QUERY = gql`
  query ProductQuery {
    products {
      id
      name
      image
      price
      color
      brand
    }
  }
`;

export default class products extends Component {
  render() {
    return (
      <Fragment>

        <Checkout />
        <h1>Products</h1>
        <Query query={PRODUCTS_QUERY}>
          {
            ({ loading, error, data }) => {
              if (loading) return <h4>Loading ...</h4>
              if (error) console.log(error);

              return <div className="row">
                {
                  data.products.map(product => (
                    <div key={product.id} className="col-md-4 mb-2">
                      <ProductItem product={product} />
                    </div>
                  ))
                }
              </div>
            }
          }
        </Query>
      </Fragment>
    )
  }
}
