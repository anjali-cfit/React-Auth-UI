import React, { useState } from "react";
import "../styles/Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

type Mode = "login" | "signup" | "forgot";

interface ApiResponse {
  message: string;
  user?: any;
}

const Login: React.FC = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setFieldErrors({});

    const errors: { name?: string; email?: string; password?: string } = {};

    if (mode === "signup" && !name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(email)) errors.email = "Invalid email format";
    if ((mode === "signup" || mode === "login") && !password.trim()) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    const api_base = "http://localhost:5000/api/";
    try {
      let res: Response;
      if (mode === "signup") {
        res = await fetch(`${api_base}signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
      } else if (mode === "login") {
        res = await fetch(`${api_base}login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      } else {
        res = await fetch(`${api_base}forgot`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      }

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        if (data.message.includes("email")) setFieldErrors({ email: data.message });
        else if (data.message.includes("password")) setFieldErrors({ password: data.message });
        else if (data.message.includes("name")) setFieldErrors({ name: data.message });
        else toast.error(data.message || "Something went wrong");
      } else {
        toast.success(data.message || "Success");
        
        // Clear fields on success
        setName("");
        setEmail("");
        setPassword("");

        if(mode === "login"){
          navigate("/");
        }
     
        // If signup was successful, switch to login
        if (mode === "signup") {
            setMode("login");
        }
      }
    } catch (err) {
      toast.error("Network error, please try again");
      console.error(err);
    }

    setLoading(false);
  };

  const handleChange = (field: "name" | "email" | "password", value: string) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* LEFT */}
        <div className="auth-left">
          {mode === "login" && (
            <>
              <h2>Sign In</h2>

              <label>EMAIL</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={fieldErrors.email ? "error-input" : ""}
              />
              {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}

              <label>PASSWORD</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={fieldErrors.password ? "error-input" : ""}
              />
              {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}

              <button className="primary-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="links">
                <span onClick={() => setMode("forgot")}>Forgot Password?</span>
              </div>
            </>
          )}

          {mode === "signup" && (
            <>
              <h2>Create Account</h2>

              <label>NAME</label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={fieldErrors.name ? "error-input" : ""}
              />
              {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}

              <label>EMAIL</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={fieldErrors.email ? "error-input" : ""}
              />
              {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}

              <label>PASSWORD</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={fieldErrors.password ? "error-input" : ""}
              />
              {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}

              <button className="primary-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </>
          )}

          {mode === "forgot" && (
            <>
              <h2>Forgot Password</h2>

              <label>EMAIL</label>
              <input
                type="email"
                placeholder="Registered Email"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={fieldErrors.email ? "error-input" : ""}
              />
              {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}

              <button className="primary-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="links">
                <span onClick={() => setMode("login")}>Back to Login</span>
              </div>
            </>
          )}

          {/* Toast Container */}
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          {mode === "login" && (
            <>
              <h1>Welcome Back</h1>
              <p>Don't have an account?</p>
              <button className="outline-btn" onClick={() => setMode("signup")}>
                Sign Up
              </button>
            </>
          )}

          {mode === "signup" && (
            <>
              <h1>Hello Friend</h1>
              <p>Already have an account?</p>
              <button className="outline-btn" onClick={() => setMode("login")}>
                Sign In
              </button>
            </>
          )}

          {mode === "forgot" && (
            <>
              <h1>Need Help?</h1>
              <p>Password reset assistance</p>
              <button className="outline-btn" onClick={() => setMode("login")}>
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
