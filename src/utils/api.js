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
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    searchProducts(path) {
        return fetch(`${this.baseUrl}/products/search?query=${path}`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse).catch(err => alert('ERROR',err));
    }
    
    changeProductLike(productId, isLiked) {
        return fetch(`${this.baseUrl}/products/likes/${productId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this.headers,
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    getProductById(id) {
        return fetch(`${this.baseUrl}/products/${id}`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    addProductReview(productId, data) {
        return fetch(`${this.baseUrl}/products/review/${productId}`, {
          headers: this.headers,
          method: "POST",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    deleteProductReview(productId, reviewId) {
        return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
          headers: this.headers,
          method: "DELETE",
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    signin(data) {
        return fetch(`${this.baseUrl}/signin`, {
          headers: this.headers,
          method: "POST",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
    }
    
    signup(data) {
        return fetch(`${this.baseUrl}/signup`, {
          headers: this.headers,
          method: "POST",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    resetPass(data) {
        return fetch(`${this.baseUrl}/forgot-password`, {
          headers: this.headers,
          method: "POST",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    resetPassWithToken(token, data) {
        return fetch(`${this.baseUrl}/password-reset/${token}`, {
          headers: this.headers,
          method: "PATCH",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
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