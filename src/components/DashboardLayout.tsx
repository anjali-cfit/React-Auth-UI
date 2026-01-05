import { NavLink, Outlet } from "react-router-dom";
import { FaBoxOpen, FaList, FaCreditCard, FaChartLine } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Dashboard.css";

export default function DashboardLayout() {
  const menuItems = [
    { path: "/dashboard/add-product", icon: FaBoxOpen, label: "Add Product" },
    { path: "/dashboard/products", icon: FaList, label: "Product List" },
    { path: "/dashboard/payments", icon: FaCreditCard, label: "Payments" },
    { path: "/dashboard/analytics", icon: FaChartLine, label: "Sales Analytics" },
  ];

  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="sidebar-title">Store Manager</div>
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <item.icon className="sidebar-icon" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
