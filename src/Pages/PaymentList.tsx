import { useState, useEffect } from "react";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaMobileAlt,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { getPayments } from "../services/api";

interface Payment {
  id: number;
  productName: string;
  amount: number;
  paymentMethod: "online" | "offline" | "cash";
  status: "completed" | "pending" | "failed";
  customerName: string;
  date: string;
  transactionId?: string;
}

const paymentMethodIcons = {
  online: FaCreditCard,
  offline: FaMobileAlt,
  cash: FaMoneyBillWave,
};

const paymentMethodLabels = {
  online: "Online Payment",
  offline: "Offline (UPI/Card)",
  cash: "Cash",
};

export default function PaymentList() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      // Using demo data if API fails
      setPayments([
        {
          id: 1,
          productName: "Rice (5kg)",
          amount: 450,
          paymentMethod: "cash",
          status: "completed",
          customerName: "Ramesh Kumar",
          date: "2026-01-05",
        },
        {
          id: 2,
          productName: "Cooking Oil",
          amount: 180,
          paymentMethod: "online",
          status: "completed",
          customerName: "Priya Sharma",
          date: "2026-01-05",
          transactionId: "TXN123456",
        },
        {
          id: 3,
          productName: "Milk (2L)",
          amount: 96,
          paymentMethod: "offline",
          status: "completed",
          customerName: "Amit Patel",
          date: "2026-01-04",
        },
        {
          id: 4,
          productName: "Bread",
          amount: 45,
          paymentMethod: "cash",
          status: "completed",
          customerName: "Sita Devi",
          date: "2026-01-04",
        },
        {
          id: 5,
          productName: "Sugar (1kg)",
          amount: 55,
          paymentMethod: "online",
          status: "pending",
          customerName: "Vijay Singh",
          date: "2026-01-04",
          transactionId: "TXN123457",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod =
      filterMethod === "all" || payment.paymentMethod === filterMethod;
    const matchesStatus =
      filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const completedAmount = filteredPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const paymentStats = {
    online: payments.filter((p) => p.paymentMethod === "online").length,
    offline: payments.filter((p) => p.paymentMethod === "offline").length,
    cash: payments.filter((p) => p.paymentMethod === "cash").length,
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-spinner">Loading payments...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Payment Records</h1>
        <p>Track all payments and transactions</p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">₹{totalAmount.toFixed(2)}</span>
          <span className="stat-label">Total Amount</span>
        </div>
        <div className="stat-card success">
          <span className="stat-value">₹{completedAmount.toFixed(2)}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{payments.length}</span>
          <span className="stat-label">Total Transactions</span>
        </div>
      </div>

      <div className="payment-method-stats">
        <div className="method-stat">
          <FaCreditCard className="method-icon online" />
          <div className="method-info">
            <span className="method-count">{paymentStats.online}</span>
            <span className="method-label">Online</span>
          </div>
        </div>
        <div className="method-stat">
          <FaMobileAlt className="method-icon offline" />
          <div className="method-info">
            <span className="method-count">{paymentStats.offline}</span>
            <span className="method-label">Offline</span>
          </div>
        </div>
        <div className="method-stat">
          <FaMoneyBillWave className="method-icon cash" />
          <div className="method-info">
            <span className="method-count">{paymentStats.cash}</span>
            <span className="method-label">Cash</span>
          </div>
        </div>
      </div>

      <div className="filter-row">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by product or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <FaFilter className="filter-icon" />
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
          >
            <option value="all">All Methods</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="cash">Cash</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {filteredPayments.length === 0 ? (
        <div className="empty-state">
          <p>No payments found</p>
        </div>
      ) : (
        <div className="payment-list">
          {filteredPayments.map((payment) => {
            const Icon = paymentMethodIcons[payment.paymentMethod];
            return (
              <div key={payment.id} className="payment-card">
                <div className="payment-icon-wrapper">
                  <Icon className={`payment-icon ${payment.paymentMethod}`} />
                </div>
                <div className="payment-details">
                  <div className="payment-header">
                    <h3>{payment.productName}</h3>
                    <span className={`status-badge ${payment.status}`}>
                      {payment.status}
                    </span>
                  </div>
                  <p className="customer-name">{payment.customerName}</p>
                  <div className="payment-meta">
                    <span className="payment-method">
                      {paymentMethodLabels[payment.paymentMethod]}
                    </span>
                    <span className="payment-date">{payment.date}</span>
                  </div>
                  {payment.transactionId && (
                    <p className="transaction-id">ID: {payment.transactionId}</p>
                  )}
                </div>
                <div className="payment-amount">
                  <span className="amount">₹{payment.amount.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
