import { api } from "../../utils/api";
import { findLiked, summaryProductRating } from "../../utils/utils";
import { isError, isLoading } from "../utilsStore";
import { openNotification } from "../../components/Notification/Notification";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  products: [],
  loading: false,
  total: 0,
  favorites: [],
  currentProduct: {},
  search: null,
  chartsData: [] 
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async function (id, { fulfillWithValue, getState, rejectWithValue }) {
    try {
      const state = getState();
      const data = await api.getProductList();
      return fulfillWithValue({ ...data, userId: state.user.data?._id });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchChangeProductLike = createAsyncThunk(
  "products/fetchChangeProductLike",
  async function (data, arg) {
    try {
      const updatedCard = await api.changeProductLike(
        data.product._id,
        data.wasLiked
      );
      return arg.fulfillWithValue({ updatedCard, wasLiked: data.wasLiked });
    } catch (error) {
      return arg.rejectWithValue(error);
    }
  }
);

export const searchProductsByQuery = createAsyncThunk(
  'products/searchProductsByQuery', 
  async function (search, {fulfillWithValue, rejectWithValue}) {
  try {
    const result = await api.searchProducts(search);
    return fulfillWithValue(result)
  } catch (error) {
    return rejectWithValue(error)
  }
})

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortedProducts: (state, action) => {
      switch (action.payload) {
        case 'cheapest':
          state.products = state.products.sort((a, b) => a.price - b.price);
          break;
        case 'most-expensive':
          state.products = state.products.sort((a, b) => b.price - a.price);
          break;
        case 'popular':
          state.products = state.products.sort((a, b) => b.likes.length - a.likes.length);
          break;
        case 'new':
          state.products = state.products.sort((a, b) =>new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'sale':
          state.products = state.products.sort((a, b) => b.discount - a.discount);
          break;
        case 'rate':
          state.products = state.products.sort((a, b) => summaryProductRating(b.reviews) - summaryProductRating(a.reviews))
          break;
        default:
          state.products = state.products.sort((a, b) => a.price - b.price);
      }
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    getChartData: (state, action) => {
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products= (action.payload.products) ?? [];
      state.favorites = state.products.filter((e) =>
        findLiked(e, action.payload.userId)
      );
      state.total = action.payload.total;
    });
    
    builder.addCase(fetchChangeProductLike.fulfilled, (state, action) => {
      
      const updatedCard = action.payload.updatedCard;
      const wasLiked = action.payload.wasLiked;
      
      state.products = state.products.map((e) =>
        e._id === updatedCard?._id ? updatedCard : e
      );
      
      if (wasLiked) { 
        state.favorites = state.favorites.filter((f) => f._id !== updatedCard._id);
      } else {
        state.favorites =[...state.favorites, updatedCard];
      }
    });
    builder.addCase(searchProductsByQuery.fulfilled, (state, {payload})=>{
      state.products = payload;
    });

    builder.addMatcher(isError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      openNotification("error", "Error", action.payload.message);
    });
    builder.addMatcher(isLoading, (state) => {
      // state.loading = true;
    });
  },
});

export const { sortedProducts, setSearch, getChartData } = products.actions;
export default products.reducer;
