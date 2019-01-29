import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect'
import { Link } from 'react-router-dom';

export class Checkout extends Component {
  render() {
    return (
      <div>
        <Link to={`checkout`} className="btn btn-primary float-right">
          Checkout <span className="badge badge-light">{this.props.products.length}</span>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps, {})(Checkout);

