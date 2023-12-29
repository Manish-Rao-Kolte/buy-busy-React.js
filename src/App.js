import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Nav from "./Components/Nav";
import RegisterUser from "./pages/app/register/RegisterUser";
import LoginUser from "./pages/app/login/LoginUser";
import Product from "./pages/app/products/Product";
import Page404 from "./pages/misc/page404/Page404";
import Order from "./pages/app/orders/Order";
import Cart from "./pages/app/cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  //Routes implemented here.
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      errorElement: <Page404 />,
      children: [
        {
          index: true,
          element: <Product />,
        },
        {
          path: "login",
          element: <LoginUser />,
        },
        {
          path: "signup",
          element: <RegisterUser />,
        },
        {
          path: "user",
          children: [
            {
              index: true,
              element: <Product />,
            },
            {
              path: ":userId/orders",
              element: <Order />,
            },
            {
              path: ":userId/cart",
              element: <Cart />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer autoClose={1000} limit={3}>
        {" "}
      </ToastContainer>
    </div>
  );
}

export default App;
