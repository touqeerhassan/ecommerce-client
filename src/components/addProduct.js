import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: Int!, $color: String!, $brand: String!) {
    addProduct(name: $name, price: $price, color: $color, brand: $brand) {
      id
      name
    }
  }
`;

export class addProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
      color: '',
      brand: ''
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if(e.target.name === "price"){
      this.setState({ [e.target.name]: parseInt(e.target.value) });
    }else{
      this.setState({ [e.target.name]: e.target.value });
    }
  }


  render() {
    return (
      <Mutation mutation={ADD_PRODUCT}>
        {(addProduct, { data }) => (
          <div>
            <h1>Enter details</h1>
            <form
              onSubmit={e => {
                e.preventDefault();
                addProduct({ variables: this.state });
              }}
            >
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name" placeholder="Enter name" onChange={this.onChange} value={this.state.name} />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input type="number" className="form-control" name="price" placeholder="Enter price" onChange={this.onChange} value={this.state.price} />
              </div>

              <div className="form-group">
                <label>Color</label>
                <input type="text" className="form-control" name="color" placeholder="Enter color" onChange={this.onChange} value={this.state.color} />
              </div>

              <div className="form-group">
                <label>Brand</label>
                <input type="text" className="form-control" name="brand" placeholder="Enter brand" onChange={this.onChange} value={this.state.brand} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default addProduct
