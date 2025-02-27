import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Memoized API call using async thunk
export const fetchCarts = createAsyncThunk("cart/fetchCarts", async (page, { getState }) => {
  const { hasMore } = getState().cart;
  if (!hasMore) return [];

  const response = await axios.get(`https://dummyjson.com/carts?limit=5&skip=${(page - 1) * 5}`);
  return response.data.carts;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    loading: false,
    page: 1,
    hasMore: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.carts = [...state.carts, ...action.payload];
        state.hasMore = action.payload.length > 0;
        state.page += 1;
        state.loading = false;
      })
      .addCase(fetchCarts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
