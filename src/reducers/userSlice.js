import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {
      id: null,
      fullname: "",
      username: "",
      email: "",
      password: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;

export function registerUser(data) {
  return async () => {
    const response = await axios.post("http://localhost:5000/register", data);
    return response.data;
  };
}

export function loginUser(data) {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:5000/login", data);
    dispatch(setUser(response.data.user));
    localStorage.setItem("acces_token", response.data.token);
    return response.data;
  };
}

export function fetchCurrentUser(token) {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:5000/current", {
      headers: {
        Authorization: token,
      },
    });

    dispatch(setUser(response.data.user));
  };
}
