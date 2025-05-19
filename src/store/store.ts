import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { useDispatch, useSelector } from "react-redux";

import { rootReducer } from "./rootReducer";
import { isDev } from "../config";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({ thunk: true });

    if (isDev) {
      const logger = createLogger({ collapsed: true });
      middlewares.push(logger);
    }

    return middlewares;
  },
  devTools: isDev,
});

// Почитать
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
