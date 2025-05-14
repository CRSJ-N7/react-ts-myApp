import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import { store } from "./store/store";
import App from "./App/App";
import "./App/styles/globalStyles.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        preventDuplicate={true}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);
