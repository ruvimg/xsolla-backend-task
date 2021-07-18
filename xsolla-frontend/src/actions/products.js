import {
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    DELETE_ALL_PRODUCTS
} from "./types";

import ProductDataService from "../services/product.service";

export const createProduct = (SKU, name, type, cost) => async (dispatch) => {
    try {
        const res = await ProductDataService.create({ SKU, name, type, cost });

        dispatch({
            type: CREATE_PRODUCT,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveProducts = () => async (dispatch) => {
    try {
        const res = await ProductDataService.getAll();

        dispatch({
            type: RETRIEVE_PRODUCTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateProduct = (id, data) => async (dispatch) => {
    try {
        const res = await ProductDataService.update(id, data);

        dispatch({
            type: UPDATE_PRODUCT,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await ProductDataService.delete(id);

        dispatch({
            type: DELETE_PRODUCT,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllProducts = () => async (dispatch) => {
    try {
        const res = await ProductDataService.deleteAll();

        dispatch({
            type: DELETE_ALL_PRODUCTS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const findProductsByName = (name) => async (dispatch) => {
    try {
        const res = await ProductDataService.findByName(name);

        dispatch({
            type: RETRIEVE_PRODUCTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};