const onResponse = (res) => {
    return res.json()
}

class Api {
    constructor(data, freshHeaders) {
        this.baseUrl = data.baseUrl;
        this.headers = data.headers
        this.freshHeaders = freshHeaders;
    }

    getProductList() {
        return fetch(`${this.baseUrl}/products`, {
            method: 'GET',
            ...this.freshHeaders(),
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            ...this.freshHeaders(),
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    updateUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            ...this.freshHeaders(),
          method: "PATCH",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    updateUserAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            ...this.freshHeaders(),
          method: "PATCH",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    searchProducts(path) {
        return fetch(`${this.baseUrl}/products/search?query=${path}`, {
            method: 'GET',
            ...this.freshHeaders(),
        }).then(onResponse).catch(err => alert('ERROR',err));
    }
    
    changeProductLike(productId, isLiked) {
        return fetch(`${this.baseUrl}/products/likes/${productId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            ...this.freshHeaders(),
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    getProductById(id) {
        return fetch(`${this.baseUrl}/products/${id}`, {
            method: 'GET',
            ...this.freshHeaders(),
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    addProductReview(productId, data) {
        return fetch(`${this.baseUrl}/products/review/${productId}`, {
            ...this.freshHeaders(),
          method: "POST",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    deleteProductReview(productId, reviewId) {
        return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
            ...this.freshHeaders(),
          method: "DELETE",
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    signin(data) {
        return fetch(`${this.baseUrl}/signin`, {
            ...this.freshHeaders(),
          method: "POST",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
    }
    
    signup(data) {
        return fetch(`${this.baseUrl}/signup`, {
            ...this.freshHeaders(),
          method: "POST",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    resetPass(data) {
        return fetch(`${this.baseUrl}/forgot-password`, {
            ...this.freshHeaders(),
          method: "POST",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
    }

    resetPassWithToken(token, data) {
        return fetch(`${this.baseUrl}/password-reset/${token}`, {
            ...this.freshHeaders(),
          method: "PATCH",
          body: JSON.stringify(data)
        }).then(onResponse).catch(err => alert('ERROR',err));
    }
}

const freshHeaders = () => {
    return {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('token')
      }
    }
  };

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        "Content-Type": "application/json",
        authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRhNzlhZDhmYmM0NzNmYTg5ZWIyNjAiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgyNjA0OTEyLCJleHAiOjE3MTQxNDA5MTJ9.5X9tNueAH1aKolFazhoNiyzDDL0EhPtpHqFYqKXddHo"
    }
};

export const api = new Api(config, freshHeaders);