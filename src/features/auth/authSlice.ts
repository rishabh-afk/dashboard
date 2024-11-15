import { getUrl } from "../../data/generalFunctions";
import { Fetch, Post, Put } from "../../utils/apiUtils";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id?: string;
  role: string;
  name: string;
  email: string;
  gender: string;
  mobile?: string;
  lastName?: string;
  firstName?: string;
  isActive?: boolean;
  profileImage?: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  allowedTabs: Array<{
    name: string;
    crudRoles: Array<string>;
  }>;
}

interface AuthState {
  user: User;
  isLoading: boolean;
  error: null | string;
  currentPage: null | object;
}

const initialState: AuthState = {
  user: {
    _id: "",
    role: "",
    email: "",
    gender: "",
    mobile: "",
    lastName: "",
    firstName: "",
    isActive: false,
    allowedTabs: [],
    profileImage: "",
    isEmailVerified: false,
    isMobileVerified: false,
    name: "Rishabh Gupta",
  },
  currentPage: {},
  isLoading: true,
  error: null,
};

const handleError = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong, please try again later.";
  return message;
};

interface LoginCredentials {
  email: string;
  password: string;
}

interface ResetCredentials {
  password: string;
}

interface UserPermission {
  id: string;
  allowedTabs: any;
}

export const loginUser = createAsyncThunk<
  {},
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    const { data, success }: any = await Post("auth/login", credentials, 5000);
    if (success) {
      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken;
      const url = getUrl(data?.user?.allowedTabs) ?? "/not-allowed";
      localStorage.setItem("previousPath", url);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return data?.user;
    }
  } catch (error: any) {
    const errorMessage = handleError(error);
    return rejectWithValue(errorMessage);
  }
});

export const resetPassword = createAsyncThunk<
  {},
  ResetCredentials,
  { rejectValue: string }
>("auth/reset", async (credentials: ResetCredentials, { rejectWithValue }) => {
  try {
    const { data, success }: any = await Post(
      "vendors/create-password",
      credentials,
      5000
    );
    if (success) {
      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken;
      const url = getUrl(data?.user?.allowedTabs) ?? "/not-allowed";
      localStorage.setItem("previousPath", url);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return data?.user;
    }
  } catch (error: any) {
    const errorMessage = handleError(error);
    return rejectWithValue(errorMessage);
  }
});

export const getCurrentUser = createAsyncThunk<
  {},
  void,
  { rejectValue: string }
>("auth/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await Fetch("auth/currentuser");
    return response;
  } catch (error: any) {
    const errorMessage = handleError(error);
    return rejectWithValue(errorMessage);
  }
});

export const updateUserPermission = createAsyncThunk<
  {},
  UserPermission,
  { rejectValue: string }
>(
  "auth/updateUserPermission",
  async (data: UserPermission, { rejectWithValue }) => {
    try {
      const response = await Put(`user/permission/${data?.id}`, data);
      return response;
    } catch (error: any) {
      const errorMessage = handleError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
    setLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = action.payload ?? null;
      })
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? "Login failed";
          state.user = initialState.user;
        }
      )
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = action.payload ?? null;
      })
      .addCase(
        resetPassword.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? "Login failed";
          state.user = initialState.user;
        }
      )
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.user = action.payload?.data ?? null;
        }
      )
      .addCase(
        getCurrentUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? "Login failed";
          state.user = initialState.user;
        }
      )
      .addCase(updateUserPermission.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateUserPermission.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.user = action.payload?.data ?? null;
        }
      )
      .addCase(
        updateUserPermission.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? "Login failed";
          state.user = initialState.user;
        }
      );
  },
});

export const { resetError, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
