import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct } from "../actions/products";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeSKU = this.onChangeSKU.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.newProduct = this.newProduct.bind(this);

        this.state = {
            id: null,
            SKU: "",
            name: "",
            type: "",
            cost: 0,
            submitted: false,
        };
    }

    onChangeSKU(e) {
        this.setState({
            SKU: e.target.value,
        });
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }
    onChangeType(e) {
        this.setState({
            type: e.target.value,
        });
    }

    onChangeCost(e) {
        this.setState({
            cost: e.target.value,
        });
    }

    saveProduct() {
        const { SKU, name, type, cost } = this.state;

        this.props
            .createProduct(SKU, name, type, cost)
            .then((data) => {
                this.setState({
                    id: data.id,
                    SKU: data.SKU,
                    name: data.name,
                    type: data.type,
                    cost: data.cost,

                    submitted: true,
                });
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newProduct() {
        this.setState({
            id: null,
            SKU: "",
            name: "",
            type: "",
            cost: 0,

            submitted: false,
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Товар добавлен</h4>
                        <button className="btn btn-success" onClick={this.newProduct}>
                            Добавить
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="SKU">SKU</label>
                            <input
                                type="text"
                                className="form-control"
                                id="SKU"
                                required
                                value={this.state.SKU}
                                onChange={this.onChangeSKU}
                                name="SKU"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Наименование</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Тип товара</label>
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                required
                                value={this.state.type}
                                onChange={this.onChangeType}
                                name="type"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Цена</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cost"
                                required
                                value={this.state.cost}
                                onChange={this.onChangeCost}
                                name="cost"
                            />
                        </div>

                        <button onClick={this.saveProduct} className="btn btn-success">
                            Сохранить
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(null, { createProduct })(AddProduct);