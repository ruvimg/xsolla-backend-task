import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveProducts, findProductsByName, deleteAllProducts } from "../actions/products";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchText = this.onChangeSearchText.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        this.findByName = this.findByName.bind(this);
        this.removeAllProducts = this.removeAllProducts.bind(this);

        this.state = {
            currentProduct: null,
            currentIndex: -1,
            searchText: "",
        };
    }

    componentDidMount() {
        this.props.retrieveProducts();
    }

    onChangeSearchText(e) {
        const searchText = e.target.value;

        this.setState({
            searchText: searchText,
        });
    }

    refreshData() {
        this.setState({
            currentProduct: null,
            currentIndex: -1,
        });
    }

    setActiveProduct(product, index) {
        this.setState({
            currentProduct: product,
            currentIndex: index,
        });
    }

    removeAllProducts() {
        this.props
            .deleteAllProducts()
            .then((response) => {
                console.log(response);
                this.refreshData();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    findByName() {
        this.refreshData();

        this.props.findProductsByName(this.state.searchText);
    }

    render() {
        const { searchText, currentProduct, currentIndex } = this.state;
        const { products } = this.props;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="?????????? ???? ????????????????????????"
                            value={searchText}
                            onChange={this.onChangeSearchText}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.findByName}
                            >
                                ??????????
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>???????????? ??????????????</h4>

                    <ul className="list-group">
                        {products &&
                        products.map((product, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveProduct(product, index)}
                                key={index}
                            >
                                {product.SKU} - {product.name}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllProducts}
                    >
                       ?????????????? ??????
                    </button>
                </div>
                <div className="col-md-6">
                    {currentProduct ? (
                        <div>
                            <h4>??????????</h4>
                            <div>
                                <label>
                                    <strong>SKU:</strong>
                                </label>{" "}
                                {currentProduct.SKU}
                            </div>
                            <div>
                                <label>
                                    <strong>????????????????????????:</strong>
                                </label>{" "}
                                {currentProduct.name}
                            </div>
                            <div>
                                <label>
                                    <strong>?????? ????????????:</strong>
                                </label>{" "}
                                {currentProduct.type}
                            </div>
                            <div>
                                <label>
                                    <strong>????????:</strong>
                                </label>{" "}
                                {currentProduct.cost}
                            </div>
                            <Link
                                to={"/products/" + currentProduct.id}
                                // className="badge badge-warning"
                            >
                                ??????????????????????????
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>???????????????? ??????????...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
    };
};

export default connect(mapStateToProps, { retrieveProducts, findProductsByName, deleteAllProducts })(ProductsList);