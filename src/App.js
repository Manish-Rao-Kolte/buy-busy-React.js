import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";


import Nav from './Components/Nav';
import RegisterUser from './pages/app/register/RegisterUser';
import LoginUser from './pages/app/login/LoginUser';
import Product from './pages/app/products/Product';
import Page404 from './pages/misc/page404/Page404';
import Order from './pages/app/orders/Order';
import Cart from './pages/app/cart/Cart';


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav />,
      errorElement: <Page404 />,
      children: [
        {
          index: true, element: <Product />
        },
        {
          path: 'login', element: <LoginUser />
        },
        {
          path: 'signup', element: <RegisterUser />
        },
        {
          path: 'user',
          children: [
            {
              index: true, element: <Product />
            },
            {
              path: 'order', element: <Order />
            },
            {
              path: 'cart', element: <Cart />
            }
          ]
        }
      ]
    }
  ]);


  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
