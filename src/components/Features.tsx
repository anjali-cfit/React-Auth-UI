import {
  FaSchool,
  FaRupeeSign,
  FaStar,
  FaCreditCard,
} from "react-icons/fa";
import "../styles/Footer.css";

export default function Features() {
  return (
    <section className="features" id="features">
      <h2>Why Choose Our Store App?</h2>

      <div className="feature-grid">
        <div className="feature-card">
          <FaSchool className="footer-icon" />
          <h3>Quality Products Kids Love</h3>
          <p>
            Carefully selected toys, stationery, and essentials that children
            enjoy using every day.
          </p>
        </div>

        <div className="feature-card">
          <FaRupeeSign className="footer-icon" />
          <h3>Affordable & Fair Pricing</h3>
          <p>
            Get quality products at reasonable prices, with special seasonal
            offers for festivals.
          </p>
        </div>

        <div className="feature-card">
          <FaStar className="footer-icon" />
          <h3>Trusted by Parents</h3>
          <p>
            Parents choose us for safe, useful, and reliable products for their
            kids.
          </p>
        </div>

        <div className="feature-card">
          <FaCreditCard className="footer-icon" />
          <h3>Online & Offline Payments</h3>
          <p>Paytm, Cash, and more.</p>
        </div>
      </div>
    </section>
  );
}
