import http from "../http-common";

class ProductsDataService {
    getAll() {
        return http.get("/products");
    }

    get(id) {
        return http.get(`/products/${id}`);
    }

    create(data) {
        return http.post("/products", data);
    }

    update(id, data) {
        return http.put(`/products/${id}`, data);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }

    deleteAll() {
        return http.delete(`/products`);
    }

    findByName(title) {
        return http.get(`/products?name=${title}`);
    }
}

export default new ProductsDataService();