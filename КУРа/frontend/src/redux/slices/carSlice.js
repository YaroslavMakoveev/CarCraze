import carAPI from '../../mocks/car';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {   
  carList: { cars: [], loading: false, error: null, page: 0, pages: 0 },
  carDetails: { cars: [], loading: false, error: null },
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    carListRequest(state) {
      state.carList.loading = true;
      state.carList.error = null;
    },
    carListSuccess(state, action) {
      state.carList.loading = false;
      state.carList.cars = action.payload.cars;
      state.carList.page = action.payload.page;
      state.carList.pages = action.payload.pages;
    },
    carListFailure(state, action) {
      state.carList.loading = false;
      state.carList.error = action.payload;
    },
    carDetailsRequest(state) {
      state.carDetails.loading = true;
      state.carDetails.error = null;
    },
    carDetailsSuccess(state, action) {
      state.carDetails.loading = false;
      state.carDetails.car = action.payload;
    },
    carDetailsFailure(state, action) {
      state.carDetails.loading = false;
      state.carDetails.error = action.payload;
    },
  },
});

export const {
  carListRequest,
  carListSuccess,
  carListFailure,
  carDetailsRequest,
  carDetailsSuccess,
  carDetailsFailure,
} = carSlice.actions;

export const fetchCarList = (keyword ,pageNumber='') => async (dispatch) => {
  try {
    dispatch(carListRequest());
    const carList = await carAPI.getCarList(keyword , pageNumber);
    dispatch(carListSuccess(carList));
  } catch (error) {
    dispatch(carListFailure(error.response?.data.detail || error.message));
  }
};

export const fetchCarDetails = (id) => async (dispatch) => {
  try {
    dispatch(carDetailsRequest());
    const carDetails = await carAPI.getCarDetails(id);
    dispatch(carDetailsSuccess(carDetails));
  } catch (error) {
    dispatch(carDetailsFailure(error.response?.data.detail || error.message));
  }
};


export const { reducer } = carSlice;
export default carSlice;
