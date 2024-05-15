import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import testDriveAPI from '../../mocks/testDrive';

const initialState = {
  testDriveList: [],
  loading: false,
  error: null,
};

const testDriveSlice = createSlice({
  name: "testDrive",
  initialState,
  reducers: {
    listMyTestDrivesStart(state) {
      state.loading = true;
      state.error = null;
    },
    listMyTestDrivesSuccess(state, action) {
      state.testDriveList = action.payload;
      state.loading = false;
      state.error = null;
    },
    listMyTestDrivesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createTestDriveStart(state) {
      state.loading = true;
      state.error = null;
    },
    createTestDriveSuccess(state, action) {
      state.testDriveList.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createTestDriveFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTestDriveStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteTestDriveSuccess(state, action) {
      state.testDriveList = state.testDriveList.filter(
        (testDrive) => testDrive._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteTestDriveFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  listMyTestDrivesStart,
  listMyTestDrivesSuccess,
  listMyTestDrivesFailure,
  createTestDriveStart,
  createTestDriveSuccess,
  createTestDriveFailure,
  deleteTestDriveStart,
  deleteTestDriveSuccess,
  deleteTestDriveFailure,
} = testDriveSlice.actions;

export const listMyTestDrives = () => async (dispatch) => {
  try {
    dispatch(listMyTestDrivesStart());
    const response = await testDriveAPI.listMyTestDrives();
    dispatch(listMyTestDrivesSuccess(response));
  } catch (error) {
    dispatch(listMyTestDrivesFailure(error.message));
  }
  
};

export const createTestDrive = (carId, userId, date, time) => async (dispatch) => {
    try {
      dispatch(createTestDriveStart());
      const response = await testDriveAPI.createTestDrive(carId, userId, date, time); // Предположим, что эндпоинт для создания записи на тест-драйв на сервере - /api/testdrives/:carId
      dispatch(createTestDriveSuccess(response));
    } catch (error) {
      dispatch(createTestDriveFailure(error.message));
    }
};

export const deleteTestDrive = (testDriveId) => async (dispatch) => {
    try {
      dispatch(deleteTestDriveStart());
      const response = await testDriveAPI.deleteTestDrive(testDriveId);
      dispatch(deleteTestDriveSuccess(response));
    } catch (error) {
      dispatch(deleteTestDriveFailure(error.message));
    }
};

export const { reducer } = testDriveSlice;
export default testDriveSlice.reducer;
