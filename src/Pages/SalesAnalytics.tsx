import { useState, useEffect } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaShoppingCart,
  FaRupeeSign,
  FaBoxes,
  FaUsers,
} from "react-icons/fa";
import { getSalesData } from "../services/api";

interface SalesData {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  monthlySales: { month: string; amount: number }[];
  categorySales: { category: string; amount: number; percentage: number }[];
  recentSales: { product: string; amount: number; date: string }[];
}

export default function SalesAnalytics() {
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");

  useEffect(() => {
    fetchSalesData();
  }, [timeRange]);

  const fetchSalesData = async () => {
    try {
      const data = await getSalesData(timeRange);
      setSalesData(data);
    } catch (error) {
      // Using demo data if API fails
      setSalesData({
        totalSales: 125000,
        totalOrders: 342,
        totalProducts: 89,
        totalCustomers: 156,
        monthlySales: [
          { month: "Aug", amount: 18000 },
          { month: "Sep", amount: 22000 },
          { month: "Oct", amount: 19500 },
          { month: "Nov", amount: 28000 },
          { month: "Dec", amount: 35000 },
          { month: "Jan", amount: 42000 },
        ],
        categorySales: [
          { category: "Grocery", amount: 45000, percentage: 36 },
          { category: "Dairy", amount: 28000, percentage: 22 },
          { category: "Beverages", amount: 22000, percentage: 18 },
          { category: "Snacks", amount: 18000, percentage: 14 },
          { category: "Others", amount: 12000, percentage: 10 },
        ],
        recentSales: [
          { product: "Rice (5kg)", amount: 450, date: "Today" },
          { product: "Cooking Oil", amount: 180, date: "Today" },
          { product: "Milk (2L)", amount: 96, date: "Yesterday" },
          { product: "Sugar (1kg)", amount: 55, date: "Yesterday" },
          { product: "Bread", amount: 45, date: "2 days ago" },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !salesData) {
    return (
      <div className="dashboard-page">
        <div className="loading-spinner">Loading analytics...</div>
      </div>
    );
  }

  const maxMonthlySale = Math.max(...salesData.monthlySales.map((s) => s.amount));

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Sales Analytics</h1>
          <p>Track your store's performance</p>
        </div>
        <div className="time-range-selector">
          <button
            className={timeRange === "week" ? "active" : ""}
            onClick={() => setTimeRange("week")}
          >
            Week
          </button>
          <button
            className={timeRange === "month" ? "active" : ""}
            onClick={() => setTimeRange("month")}
          >
            Month
          </button>
          <button
            className={timeRange === "year" ? "active" : ""}
            onClick={() => setTimeRange("year")}
          >
            Year
          </button>
        </div>
      </div>

      <div className="overview-cards">
        <div className="overview-card">
          <div className="card-icon sales">
            <FaRupeeSign />
          </div>
          <div className="card-info">
            <span className="card-value">₹{salesData.totalSales.toLocaleString()}</span>
            <span className="card-label">Total Sales</span>
            <span className="card-trend up">
              <FaArrowUp /> 12.5%
            </span>
          </div>
        </div>
        <div className="overview-card">
          <div className="card-icon orders">
            <FaShoppingCart />
          </div>
          <div className="card-info">
            <span className="card-value">{salesData.totalOrders}</span>
            <span className="card-label">Total Orders</span>
            <span className="card-trend up">
              <FaArrowUp /> 8.2%
            </span>
          </div>
        </div>
        <div className="overview-card">
          <div className="card-icon products">
            <FaBoxes />
          </div>
          <div className="card-info">
            <span className="card-value">{salesData.totalProducts}</span>
            <span className="card-label">Products Sold</span>
            <span className="card-trend down">
              <FaArrowDown /> 3.1%
            </span>
          </div>
        </div>
        <div className="overview-card">
          <div className="card-icon customers">
            <FaUsers />
          </div>
          <div className="card-info">
            <span className="card-value">{salesData.totalCustomers}</span>
            <span className="card-label">Customers</span>
            <span className="card-trend up">
              <FaArrowUp /> 5.7%
            </span>
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Monthly Sales</h3>
          <div className="bar-chart">
            {salesData.monthlySales.map((sale, index) => (
              <div key={index} className="bar-item">
                <div className="bar-container">
                  <div
                    className="bar"
                    style={{ height: `${(sale.amount / maxMonthlySale) * 100}%` }}
                  >
                    <span className="bar-value">₹{(sale.amount / 1000).toFixed(0)}k</span>
                  </div>
                </div>
                <span className="bar-label">{sale.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Sales by Category</h3>
          <div className="category-chart">
            {salesData.categorySales.map((cat, index) => (
              <div key={index} className="category-item">
                <div className="category-header">
                  <span className="category-name">{cat.category}</span>
                  <span className="category-amount">₹{cat.amount.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <span className="category-percentage">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recent-sales-card">
        <h3>Recent Sales</h3>
        <div className="recent-sales-list">
          {salesData.recentSales.map((sale, index) => (
            <div key={index} className="recent-sale-item">
              <div className="sale-info">
                <span className="sale-product">{sale.product}</span>
                <span className="sale-date">{sale.date}</span>
              </div>
              <span className="sale-amount">₹{sale.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
