import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/addProduct";
import ProductsList from "./components/productsList";
import Product from "./components/getProduct";

class App extends Component {
  render() {
    return (
        <Router>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/products"} className="navbar-brand">
              Xsolla-Backend-app
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/products"} className="nav-link">
                    Товары
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Добавить
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/products"]} component={ProductsList} />
              <Route exact path="/add" component={AddProduct} />
              <Route path="/products/:id" component={Product} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
