import { localDataNames } from "@/constants/appInfo"
import { syncLocalStorage } from "@/utils/commonFunction"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthData {
  token: string
  _id: string
  name: string
  rule: number
}

interface AuthSliceState {
  dataAuth: AuthData
}

const initialState: AuthSliceState = {
  dataAuth: {
    token: "",
    _id: "",
    name: "",
    rule: 0,
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action: PayloadAction<AuthData>) => {
      state.dataAuth = action.payload
      syncLocalStorage(localDataNames.authData, action.payload)
    },
    removeAuth: (state) => {
      state.dataAuth = initialState.dataAuth
      syncLocalStorage(localDataNames.authData, initialState.dataAuth)
    },
    refreshToken: (state, action) => {
      state.dataAuth.token = action.payload
    }
  },
})

export const authReducer = authSlice.reducer
export const { addAuth, removeAuth, refreshToken } = authSlice.actions

export const authSelector = (state: { authReducer: AuthSliceState }) => state.authReducer.dataAuth