// import { createSlice } from '@reduxjs/toolkit';
import userAPI from '../../mocks/user';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const storedUserInfo = localStorage.getItem("userInfo");

const initialState = {
  userDetails: storedUserInfo ? JSON.parse(storedUserInfo) : null,
  userCars: [],
  loading: false,
  error: null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.userDetails = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getUserDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserDetailsSuccess(state, action) {
      state.userDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess(state, action) {
      state.userDetails = { ...action.payload };
      state.loading = false;
      state.error = null;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    createUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action) {
      state.userDetails = { ...state.userDetails, ...action.payload };
      state.loading = false;
      state.error = null;
      localStorage.setItem("userInfo", JSON.stringify(state.userDetails));
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state) {
      state.userDetails = {};
      state.loading = false;
      state.error = null;
      localStorage.removeItem("userInfo");

    },
    deleteUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.userDetails = {};
      state.loading = false;
      state.error = null;
      localStorage.removeItem("userInfo");
    },
  },

  extraReducers: (builder) => {
    // Существующие extraReducers
    builder
      .addCase(getUserCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCars.fulfilled, (state, action) => {
        state.loading = false;
        state.userCars = action.payload;
      })
      .addCase(getUserCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUserCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserCar.fulfilled, (state, action) => {
        state.loading = false;
        state.userCars.push(action.payload);
      })
      .addCase(createUserCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserCar.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userCars.findIndex((car) => car._id === action.payload._id);
        state.userCars[index] = action.payload;
      })
      .addCase(updateUserCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserCar.fulfilled, (state, action) => {
        state.loading = false;
        state.userCars = state.userCars.filter((car) => car._id !== action.payload);
      })
      .addCase(deleteUserCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },

});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  getUserDetailsStart,
  getUserDetailsSuccess,
  getUserDetailsFailure,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logoutSuccess,
} = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const user = await userAPI.login(email, password);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const fetchUserDetails = (userId) => async (dispatch) => {
  try {
    dispatch(getUserDetailsStart());
    const userDetails = await userAPI.getUserDetails( );
    dispatch(getUserDetailsSuccess(userDetails));
  } catch (error) {
    dispatch(getUserDetailsFailure(error.message));
  }
};

export const createUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch(createUserStart());
    const user = await userAPI.createUser(name, email, password);
    dispatch(createUserSuccess(user));
    dispatch(loginSuccess(user));  
  } catch (error) {
    dispatch(createUserFailure(error.message));
  }
};

export const updateUser = (userId, updateData) => async (dispatch) => {
  try {
    dispatch(updateUserStart());
    const updatedUser = await userAPI.updateUser(userId, updateData);
    dispatch(updateUserSuccess(updatedUser));
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch(deleteUserStart());
    await userAPI.deleteUser(userId);
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  } 

};

export const logout = () => (dispatch) => {
  dispatch(userSlice.actions.logoutSuccess());
};

export const getUserCars = createAsyncThunk('user/getUserCars', async (_, thunkAPI) => {
  try {
    const userDetails = thunkAPI.getState().user.userDetails;
    const response = await userAPI.getUserCars(userDetails.token);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const createUserCar = createAsyncThunk(
  'user/createUserCar',
  async (carData, thunkAPI) => {
    try {
      const userDetails = thunkAPI.getState().user.userDetails;
      const response = await userAPI.createUserCar(userDetails.token, carData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserCar = createAsyncThunk('user/updateUserCar', async ({carId, carData}, thunkAPI) => {
  try {
    const userDetails = thunkAPI.getState().user.userDetails;
    const response = await userAPI.updateUserCar(userDetails.token, carId, carData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteUserCar = createAsyncThunk('user/deleteUserCar', async (carId, thunkAPI) => {
  try {
    const userDetails = thunkAPI.getState().user.userDetails;
    await userAPI.deleteUserCar(userDetails.token, carId);
    return carId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export default userSlice.reducer;

export const { reducer } = userSlice;
// export default userSlice;
