import { createSlice } from "@reduxjs/toolkit";
import cartAPI from "../../mocks/cart";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingAddress: {},
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
      console.log(state.cartItems)

      localStorage.setItem("cartItems", JSON.stringify(action.payload));
    },
    removeCartItem(state, action) {
      const idToRemove = action.payload;
      const indexToRemove = state.cartItems.findIndex((item) => item._id === idToRemove);
    
      if (indexToRemove !== -1) {
        state.cartItems.splice(indexToRemove, 1);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    
    // setPaymentMethod(state, action) {
    //   state.paymentMethod = action.payload;
    //   localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    // },
  },
});

export const {
  setCartItems,
  removeCartItem,
  // setPaymentMethod,
} = cartSlice.actions;

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { cartItems } = getState().cart;
    const car = await cartAPI.fetchProduct(id);

    let existingItemIndex = -1;

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]._id === id) {
        existingItemIndex = i;
        break;
      }
    }

    if (existingItemIndex !== -1) {
      // If an item with the same product ID exists, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].qty += qty;
      dispatch(setCartItems(updatedCartItems));
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      dispatch(setCartItems([...cartItems, { ...car, qty }]));
    }
  } catch (error) {
    console.log("Error adding item to cart:", error);
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch(removeCartItem(id));
  } catch (error) {
    console.log("Error removing item from cart:", error);
  }
};

// export const savePaymentMethod = (data) => (dispatch) => {
//   dispatch(setPaymentMethod(data));
// };

export const { reducer } = cartSlice;
export default cartSlice;
