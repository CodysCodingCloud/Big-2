import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import gameReducer from "./gameSlice";
export default configureStore({
	reducer: {
		user: userReducer,
		chat: chatReducer,
		game: gameReducer,
	},
	middleware: (getDefaultMiddleware) => {
		if (process.env.NODE_ENV === "production") {
			return getDefaultMiddleware();
		} else {
			return getDefaultMiddleware().concat(loggerMiddleware);
		}
	},
});
