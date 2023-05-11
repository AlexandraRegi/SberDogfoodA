const onResponse = (res) => {
    return res.json()
}

class Api {
    constructor(data) {
        this.baseUrl = data.baseUrl;
        this.headers = data.headers
    }

    getProductList() {
        return fetch(`${this.baseUrl}/products`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }

    searchProducts(path) {
        return fetch(`${this.baseUrl}/products/search?query=${path}`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }
    
    changeProductLike(productId, isLiked) {
        return fetch(`${this.baseUrl}/products/likes/${productId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this.headers,
        }).then(onResponse);
    }

    getProductById(id) {
        return fetch(`${this.baseUrl}/products/${id}`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }
}

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        "Content-Type": "application/json",
        authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRhNzlhZDhmYmM0NzNmYTg5ZWIyNjAiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyNjA0OTEyLCJleHAiOjE3MTQxNDA5MTJ9.5X9tNueAH1aKolFazhoNiyzDDL0EhPtpHqFYqKXddHo"
    }

}

export const api = new Api(config);