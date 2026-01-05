import { FaMapMarkerAlt, FaCopyright, FaWhatsapp } from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-item">
        <FaMapMarkerAlt className="footer-icon" />
            <a
                href="https://maps.app.goo.gl/jtj9v9HoTVmTchuJ7"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
            >
                D - 34, Pushkar Hill 1, Odhav, Ahmedabad, Gujarat
            </a>
        </div>

      <div className="footer-item">
        <FaWhatsapp className="footer-icon" />
        <a
          href="https://wa.me/919974143109"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          +91 99741 43109
        </a>
      </div>

      <div className="footer-item">
        <FaCopyright className="footer-icon" />
        <span>2026 Kabir General Store. All rights reserved.</span>
      </div>
    </footer>
  );
}
