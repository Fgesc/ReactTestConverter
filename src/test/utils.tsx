import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../components/app/store.ts";

export function renderWithRedux(ui: React.ReactElement, options = {}) {
  const newStore = createStore(); 
  return render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => <Provider store={newStore}>{children}</Provider>, // Передаём уникальное хранилище
    ...options,
  });
}

//Это изначальная конфигурация (если вдруг я приду к тому, что тесты в app должны сохранять предыдущее состояние)
// import { ReactNode } from "react";
// import { render } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { store } from "../components/app/store.ts";

// export function renderWithRedux(ui: React.ReactElement, options = {}) {
//   return render(ui, {
//     wrapper: ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>,
//     ...options,
//   });
// }


