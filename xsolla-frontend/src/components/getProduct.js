import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProduct, deleteProduct } from "../actions/products";
import ProductDataService from "../services/product.service";

class Product extends Component {
    constructor(props) {
        super(props);
        this.onChangeSKU = this.onChangeSKU.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.getProduct = this.getProduct.bind(this);
        // this.updateStatus = this.updateStatus.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.removeProduct = this.removeProduct.bind(this);

        this.state = {
            currentProduct: {
                id: null,
                SKU: "",
                name: "",
                type: "",
                cost: 0,
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getProduct(this.props.match.params.id);
    }

    onChangeSKU(e) {
        const SKU = e.target.value;

        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    SKU: SKU,
                },
            };
        });
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    name: name,
                },
            };
        });
    }

    onChangeType(e) {
        const type = e.target.value;

        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    type: type,
                },
            };
        });
    }

    onChangeCost(e) {
        const cost = e.target.value;

        this.setState((prevState) => ({
            currentProduct: {
                ...prevState.currentProduct,
                cost: cost,
            },
        }));
    }

    getProduct(id) {
        ProductDataService.get(id)
            .then((response) => {
                this.setState({
                    currentProduct: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateContent() {
        this.props
            .updateProduct(this.state.currentProduct.id, this.state.currentProduct)
            .then((reponse) => {
                console.log(reponse);

                this.setState({ message: "Товар обновлен." });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    removeProduct() {
        this.props
            .deleteProduct(this.state.currentProduct.id)
            .then(() => {
                this.props.history.push("/products");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentProduct } = this.state;

        return (
            <div>
                {currentProduct ? (
                    <div className="edit-form">
                        <h4>Товар</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="SKU">SKU</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="SKU"
                                    value={currentProduct.SKU}
                                    onChange={this.onChangeSKU}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Наименование</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentProduct.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Тип</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="type"
                                    value={currentProduct.type}
                                    onChange={this.onChangeType}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cost">Цена</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cost"
                                    value={currentProduct.cost}
                                    onChange={this.onChangeCost}
                                />
                            </div>
                        </form>

                        <button
                            // className="badge badge-danger mr-2"
                            onClick={this.removeProduct}
                        >
                            Удалить
                        </button>

                        <button
                            type="submit"
                            // className="badge badge-success"
                            onClick={this.updateContent}
                        >
                            Обновить
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Пожалуйста, выберите товар</p>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(null, { updateProduct, deleteProduct })(Product);