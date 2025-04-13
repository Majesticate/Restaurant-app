import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home/Home";
import Header from "./header/header";
import Footer from "./footer/Footer";
import "./App.css"; // Custom CSS if needed
import ContactPage from "./pages/contact/Contact";
import AboutPage from "./pages/about/about";
import MenuPage from "./pages/menu/MenuPage";
import CartPage from "./pages/cart/CartPage"; // Cart page component
import OrderConfirmation from "./pages/cart/OrderConfirmation";
import LoginForm from "./login/LoginForm";
import RegisterForm from "./register/Register";
import Orders from "./pages/order/Orders";
import AddProductPage from "./admin/AddProductPage";
import AdminRoute from "./admin/AdminRoute";
import AdminNewOrders from "./admin/AdminNewOrders";
import AdminPastOrders from "./admin/AdminPastOrders";
// import Delivery from "./pages/cart/Delivery";

const App = () => {
  const [cart, setCart] = useState<any[]>([]); // Cart state to manage items in the cart

  return (
    <div className="flex flex-col min-h-screen">
      {/* This ensures the page takes full height */}
      <Header
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
      />
      <main className="flex-grow">
        {/* This will make the main content flexible */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/menu"
            element={<MenuPage cart={cart} setCart={setCart} />} // Pass cart and setCart to MenuPage
          />
          <Route
            path="/cart"
            element={<CartPage cart={cart} setCart={setCart} />} // Pass cart and setCart to CartPage
          />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/orders" element={<Orders />} />
          {/* <Route path="/delivery" element={<Delivery />} /> */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="/admin/add-product" element={<AddProductPage />} />
            <Route path="/admin/new-orders" element={<AdminNewOrders />} />
            <Route path="/admin/past-orders" element={<AdminPastOrders />} />
          </Route>
        </Routes>
      </main>
      <Footer /> {/* This will always stay at the bottom */}
    </div>
  );
};

export default App;
