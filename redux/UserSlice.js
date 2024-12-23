import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      console.log(action);
      state.value = action.payload;
    },
    logoutUser: (state, action) => {
      state.value = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUserDetail, logoutUser } = userSlice.actions;
export default userSlice.reducer;
