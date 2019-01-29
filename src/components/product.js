import React, { Component, Fragment } from 'react';
import connect from 'react-redux/es/connect/connect'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions'

const PRODUCT_QUERY = gql`
  query productQuery ($id:ID!) {
    product(id:$id) {
      id
      name
      image
      price
      color
      brand
    }
  }
`;

class Product extends Component {
  render() {
    let rand = Math.floor(Math.random() * (3 - 1) ) + 1;
    let { id } = this.props.match.params;
    id = parseInt(id);
    return (
      <Fragment>
        <Query query={PRODUCT_QUERY} variables={{ id }}>
          {
            ({ loading, error, data }) => {
              if (loading) return <h4>Loading ...</h4>
              if (error) console.log(error);
              const { product } = data;

              return (<Fragment>
                <img className="card-img-top" src={`http://localhost:4000/products/${rand}.png`} width="400px" height="400px" alt={product.name} />
                <div>{product.name} - {product.price}$</div>
                <div>Brand : {product.brand}</div>
                <div>Color : {product.color}</div>

                <Link to={`/`} className="btn btn-secondary">Back to products</Link>

                <button onClick={() => this.props.addToCart(parseInt(product.id))} className=" ml-1 btn btn-primary">Add to cart</button>
              </Fragment>)
            }
          }
        </Query>
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps, { addToCart })(Product);
