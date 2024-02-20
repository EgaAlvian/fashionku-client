import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    totalPages: 1,
    product: {
      id: "",
      name: "",
      price: "",
      quantity: "",
      image: "",
    },
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setProducts: (state, action) => {
      state.productsList = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setProduct, setProducts, setTotalPages } = productSlice.actions;
export default productSlice.reducer;

export function addProduct(data) {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:5000/product", data);
    dispatch(setProduct(response.data));
  };
}

export function getAllProductsByFilter({
  name = "",
  limit = 6,
  orderBy = "asc",
  sortBy = "id",
  page = 1,
}) {
  return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:5000/product?name=${name}&orderBy=${orderBy}&sortBy=${sortBy}&limit=${limit}&page=${page}`
    );
    dispatch(setProducts(response.data.products));
    dispatch(setTotalPages(response.data.totalPages));
  };
}

export function getProductById(id) {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:5000/product/" + id);
    dispatch(setProduct(response.data));
    return response.data;
  };
}

export function editProduct(id, data) {
  return async (dispatch) => {
    const response = await axios.put(
      `http://localhost:5000/product/${id}`,
      data
    );
    dispatch(setProduct(response.data));
  };
}

export function deleteProductById(id, productsList) {
  return async (dispatch) => {
    await axios
      .delete("http://localhost:5000/product/" + id)
      .then(() => {
        alert("Delete success");
        dispatch(getAllProductsByFilter(productsList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
