import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import ShopScreen from "./components/ShopScreen";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "/profile",
      element: <ProfileScreen />,
    },
    {
      path: "/shop",
      element: <ShopScreen />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  ) ;
}

export default App;