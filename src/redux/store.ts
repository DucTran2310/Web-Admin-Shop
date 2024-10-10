import { authReducer } from "@/redux/reducers/authReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    authReducer
  }
})

export default store
 