export const getEndings = (numb, field = "товар") => {
  numb %= 100;
  if (numb >= 5 && numb <= 20) {
    return ` ${field}ов`;
  }
  numb %= 10;
  if (numb === 1) {
    return ` ${field}`;
  }
  if (numb > 1 && numb < 5) {
    return ` ${field}а`;
  }
  return ` ${field}ов`;
};

export const findLiked = (product, id) => {
  return product.likes.some((e) => e === id);
};

export const summaryProductRating = (reviews) => {
  if (!reviews || !reviews.length) {
    return 0;
  }
  const res = reviews.reduce((acc, el) => (acc += el.rating), 0);
  return res / reviews.length;
};

export function parseJwt(token) {
  if (!token) return null
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export const productRating = (reviews) => {
  if (!reviews || !reviews.length) {
      return 0;
  }
  const res = reviews.reduce((acc, el) => acc += el.rating, 0);
  return Math.floor(res / reviews.length)
}