import React from 'react';
import { Link } from 'react-router-dom';

export default function productItem({ product }) {
  let rand = Math.floor(Math.random() * (3 - 1) ) + 1;

  return (<div className="card" style={{ width: "18rem" }}>
    <img className="card-img-top" src={`http://localhost:4000/products/${rand}.png`} alt={product.name} />
    <div className="card-body">
      <h5 className="card-title">{product.name} - {product.price}$</h5>
      <p className="card-text">Brand : {product.brand}</p>
      <Link to={`product/${product.id}`} className="btn btn-primary">Show Details</Link>
    </div>
  </div>);

}
