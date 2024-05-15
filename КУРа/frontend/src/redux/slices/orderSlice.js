import { createSlice } from '@reduxjs/toolkit';
import orderAPI from '../../mocks/order';

const initialState = {
  listorder: [],
  orderDetails: {},
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrderDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getOrderDetailsSuccess(state, action) {
      state.orderDetails = action.payload;
      state.loading = false;
      state.error = null;
      console.log(action.payload)
    },
    getOrderDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createOrderStart(state) {
      console.log(state)
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess(state, action) {
      state.listorder.push(action.payload);
      state.orderDetails = action.payload;
      state.loading = false;
      state.error = null;
      console.log(state, action)

    },
    createOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      console.log(state, action)

    },
    listMyOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    listMyOrdersSuccess(state, action) {
      state.listorder = action.payload;
      state.loading = false;
      state.error = null;
    },
    listMyOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    listOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    listOrdersSuccess(state, action) {
      state.listorder = action.payload;
      state.loading = false;
      state.error = null;
    },
    listOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getOrderDetailsStart,
  getOrderDetailsSuccess,
  getOrderDetailsFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  listMyOrdersStart,
  listMyOrdersSuccess,
  listMyOrdersFailure,
  listOrdersStart,
  listOrdersSuccess,
  listOrdersFailure,
} = orderSlice.actions;

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderStart());
    const createdOrder = await orderAPI.createOrder(order);
    dispatch(createOrderSuccess(createdOrder));
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch(createOrderFailure(error.message));
  }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch(getOrderDetailsStart());
    const orderDetails = await orderAPI.getOrderDetails(orderId);
    console.log(orderId)
    dispatch(getOrderDetailsSuccess(orderDetails));
  } catch (error) {
    dispatch(getOrderDetailsFailure(error.message));
  }
};

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch(listMyOrdersStart());
    const myOrders = await orderAPI.listMyOrders();
    dispatch(listMyOrdersSuccess(myOrders));
  } catch (error) {
    dispatch(listMyOrdersFailure(error.message));
  }
};

export const listOrders = () => async (dispatch) => {
  try {
    dispatch(listOrdersStart());
    const allOrders = await orderAPI.listOrders();
    dispatch(listOrdersSuccess(allOrders));
  } catch (error) {
    dispatch(listOrdersFailure(error.message));
  }
};

export const { reducer } = orderSlice;
export default orderSlice;
