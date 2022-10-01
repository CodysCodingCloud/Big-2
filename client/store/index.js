import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";
import userReducer from "./userSlice";
export default configureStore({
	reducer: {
		user: authReducer,
		chat: chatReducer,
	},
	middleware: (getDefaultMiddleware) => {
		if ((process.env.NODE_ENV = "production")) {
			return getDefaultMiddleware();
		} else {
			return getDefaultMiddleware().concat(loggerMiddleware);
		}
	},
});
