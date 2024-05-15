import { reducer as userReducer } from "../slices/userSlice";
import { reducer as carReducer } from "../slices/carSlice";
import { reducer as orderReducer } from "../slices/orderSlice";
import { reducer as cartReducer } from "../slices/cartSlice";
import { reducer as testDriveReducer } from "../slices/testDriveSlice";
import { reducer as tradeInReducer } from "../slices/tradeInSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  user: userReducer,
  car: carReducer , // Update the import statement to use `.reducer`
  order: orderReducer,
  cart: cartReducer,
  testDrive: testDriveReducer,
  tradeIn: tradeInReducer

});
