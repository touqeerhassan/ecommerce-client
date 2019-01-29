import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import connect from 'react-redux/es/connect/connect'

const ADD_ORDER = gql`
  mutation AddOrder($customerName: String!, $customerEmail: String!, $customerAddress: String!, $products: [Int]!) {
    addOrder(customerName: $customerName, customerEmail: $customerEmail, customerAddress: $customerAddress, products: $products) {
      id
      customerName
    }
  }
`;

export class checkoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: '',
      customerEmail: '',
      customerAddress: '',
      products: this.props.products
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    console.log("products:" + this.props.products);
    return (
      <Mutation mutation={ADD_ORDER}>
        {(addOrder, { data }) => (
          <div>
            <h1>Enter your details</h1>
            <form
              onSubmit={e => {
                e.preventDefault();
                addOrder({ variables: this.state });
              }}
            >
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="customerName" placeholder="Enter name" onChange={this.onChange} value={this.state.customerName} />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" name="customerEmail" placeholder="Enter email" onChange={this.onChange} value={this.state.customerEmail} />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control" name="customerAddress" placeholder="Enter address" onChange={this.onChange} value={this.state.customerAddress} />
                <small id="emailHelp" className="form-text text-muted">Products will be shipped to this address.</small>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps, {})(checkoutForm);
