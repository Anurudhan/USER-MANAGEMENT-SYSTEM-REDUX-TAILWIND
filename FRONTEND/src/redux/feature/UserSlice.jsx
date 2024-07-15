import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: JSON.parse(localStorage.getItem("userData")) || null,
    changeName: null,
};

const UserSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem("userData", JSON.stringify(action.payload));
        },
        clearUserData: (state) => {
            state.userData = null;
            localStorage.removeItem("userData");
        },
        updateUserData: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
            localStorage.setItem("userData", JSON.stringify(state.userData));
        },
    },
});

export const { setUserData , clearUserData , updateUserData } = UserSlice.actions;
export default UserSlice.reducer;