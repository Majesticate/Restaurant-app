import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import DeliveryOrders from "./delivery/DeliveryOrdersPage";
import CartInitializer from "./pages/cart/CartInitializer"; // Import CartInitializer

const App = () => {
  const [cart, setCart] = useState<any[]>([]);

  // Ensure the cart is initialized correctly when the app loads
  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      setCart(JSON.parse(localCart)); // Initialize cart with data from localStorage
    }
  }, []);

  // Update the cart in localStorage whenever the cart state changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    }
  }, [cart]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Initialize cart data */}
      <CartInitializer setCart={setCart} /> {/* Initialize cart on app load */}
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
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="/admin/add-product" element={<AddProductPage />} />
            <Route path="/admin/new-orders" element={<AdminNewOrders />} />
            <Route path="/admin/past-orders" element={<AdminPastOrders />} />
          </Route>
          <Route path="/delivery/orders" element={<DeliveryOrders />} />
        </Routes>
      </main>
      <Footer /> {/* This will always stay at the bottom */}
    </div>
  );
};

export default App;
