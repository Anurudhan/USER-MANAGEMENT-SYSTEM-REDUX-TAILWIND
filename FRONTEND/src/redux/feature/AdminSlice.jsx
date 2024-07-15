import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminData: JSON.parse(localStorage.getItem("adminData")) || null,
};

const AdminSlice = createSlice({
    name: 'admins',
    initialState: initialState,
    reducers: {
        setAdminData: (state, action) => {
            state.adminData = action.payload;
            localStorage.setItem("adminData", JSON.stringify(action.payload));
        },
        clearAdminData: (state) => {
            state.adminData = null;
            localStorage.removeItem("adminData");
        },
        updateAdminData: (state, action) => {
            state.adminData = { ...state.adminData, ...action.payload };
            localStorage.setItem("adminData", JSON.stringify(state.adminData));
        },
    },
});

export const { setAdminData, clearAdminData, updateAdminData } = AdminSlice.actions;
export default AdminSlice.reducer;
