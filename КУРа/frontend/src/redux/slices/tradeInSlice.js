import { createSlice } from "@reduxjs/toolkit";
import tradeInAPI from '../../mocks/tradeIn';

const initialState = {
  tradeInList: [],
  loading: false,
  error: null,
};

const tradeInSlice = createSlice({
  name: "tradeIn",
  initialState,
  reducers: {
    listMyTradeInsStart(state) {
      state.loading = true;
      state.error = null;
    },
    listMyTradeInsSuccess(state, action) {
      state.tradeInList = action.payload;
      state.loading = false;
      state.error = null;
    },
    listMyTradeInsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createTradeInStart(state) {
      state.loading = true;
      state.error = null;
    },
    createTradeInSuccess(state, action) {
      state.tradeInList.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createTradeInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTradeInStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteTradeInSuccess(state, action) {
      state.tradeInList = state.tradeInList.filter(
        (tradeIn) => tradeIn._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteTradeInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  listMyTradeInsStart,
  listMyTradeInsSuccess,
  listMyTradeInsFailure,
  createTradeInStart,
  createTradeInSuccess,
  createTradeInFailure,
  deleteTradeInStart,
  deleteTradeInSuccess,
  deleteTradeInFailure,
} = tradeInSlice.actions;

export const listMyTradeIns = () => async (dispatch) => {
  try {
    dispatch(listMyTradeInsStart());
    const response = await tradeInAPI.listMyTradeIns();
    dispatch(listMyTradeInsSuccess(response));
  } catch (error) {
    dispatch(listMyTradeInsFailure(error.message));
  }
};

export const createTradeIn = (carId, userCarId, userId) => async (dispatch) => {
    try {
      dispatch(createTradeInStart());
      const response = await tradeInAPI.createTradeIn(carId, userCarId, userId);
      dispatch(createTradeInSuccess(response));
    } catch (error) {
      dispatch(createTradeInFailure(error.message));
    }
};

export const deleteTradeIn = (tradeInId) => async (dispatch) => {
    try {
      dispatch(deleteTradeInStart());
      const response = await tradeInAPI.deleteTradeIn(tradeInId);
      dispatch(deleteTradeInSuccess(response));
    } catch (error) {
      dispatch(deleteTradeInFailure(error.message));
    }
};

export const { reducer } = tradeInSlice;
export default tradeInSlice.reducer;