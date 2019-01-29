import React, { Component } from 'react';
import Products from "./components/products";
import ProductList from "./components/productList";
import AddProduct from "./components/addProduct";
import OrderList from "./components/orderList";
import OrderDetails from "./components/orderDetails";
import Product from "./components/product";
import CheckoutForm from "./components/checkoutForm";
import Admin from "./components/admin";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.png';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import store from './store';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <div className="container">
              <img src={logo} alt="ecommerce" width="200px" height="150px" style={{ display: 'block', margin: "auto" }}></img>
              <Route exact path="/" component={Products} />
              <Route exact path="/checkout" component={CheckoutForm} />
              <Route exact path="/product/:id" component={Product} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin/product" component={ProductList} />
              <Route exact path="/admin/product/add" component={AddProduct} />
              <Route exact path="/admin/order" component={OrderList} />
              <Route exact path="/admin/order/:id" component={OrderDetails} />
            </div>
          </Router>
        </Provider>
      </ApolloProvider >
    );
  }
}

export default App;
