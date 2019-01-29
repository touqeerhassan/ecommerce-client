import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class admin extends Component {
  render() {
    return (
      <div>
        <Link to={`admin/product`} className="btn btn-primary">Products</Link>
        <Link to={`admin/order`} className="ml-1 btn btn-primary">Orders</Link>
      </div>
    )
  }
}
