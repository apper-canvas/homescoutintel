import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { store } from "@/store/store";
import { ToastContainer } from "react-toastify";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={3000} />
  </Provider>
);