import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Products from "./Pages/Products";  
import Dashboard from "./components/Dashboard";
function App() {
  const isLoggedIn = Boolean(localStorage.getItem("user"));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>);
}

export default App;
