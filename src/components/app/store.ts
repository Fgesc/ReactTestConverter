import { configureStore } from "@reduxjs/toolkit";
import { getCurrenciesApi } from "../../services/getCurrencies.api";
import currenciesReducer from "../../services/currenciesSlice";

export const store = configureStore({
  reducer: {
    converter: currenciesReducer,
    [getCurrenciesApi.reducerPath]: getCurrenciesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getCurrenciesApi.middleware),
});

//Тут я добавил createStore, чтобы состояние при каждом тесте не захватывало предыдущий результат теста
export const createStore = () =>
  configureStore({
    reducer: {
      converter: currenciesReducer,
      [getCurrenciesApi.reducerPath]: getCurrenciesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(getCurrenciesApi.middleware),
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




//Это вариант с обновлением состояния, работает вроде бы нормально, но ломается при билде
// import { configureStore } from "@reduxjs/toolkit";
// import { getCurrenciesApi } from "../../services/getCurrencies.api";
// import currenciesReducer from "../../services/currenciesSlice";

// export const createStore = () =>
//   configureStore({
//     reducer: {
//       converter: currenciesReducer,
//       [getCurrenciesApi.reducerPath]: getCurrenciesApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(getCurrenciesApi.middleware),
//   });

// export type RootState = ReturnType<typeof createStore>;
// export type AppDispatch = typeof createStore.prototype.dispatch;
