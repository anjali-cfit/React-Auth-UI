import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import DashboardLayout from "./components/DashboardLayout";
import AddProduct from "./Pages/AddProduct";
import ProductList from "./Pages/ProductList";
import PaymentList from "./Pages/PaymentList";
import SalesAnalytics from "./Pages/SalesAnalytics";

function App() {
  const isLoggedIn = Boolean(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />

        {/* Dashboard Routes - Protected */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate to="/dashboard/products" replace />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />
          <Route path="payments" element={<PaymentList />} />
          <Route path="analytics" element={<SalesAnalytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
