import { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";

const Login = () => {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e:any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setMsg("");
    try {
      const url =
        tab === 0
          ? "http://localhost:5000/api/signup"
          : "http://localhost:5000/api/login";

      const payload =
        tab === 0 ? form : { email: form.email, password: form.password };

      const res = await axios.post(url, payload);
      setMsg(res.data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setMsg(err.response?.data?.message || "Error");
      } else {
        setMsg("Error");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      <Paper sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
          <Tab label="Signup" />
          <Tab label="Login" />
        </Tabs>

        {tab === 0 && (
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            onChange={handleChange}
          />
        )}

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          margin="normal"
          onChange={handleChange}
        />

        {msg && (
          <Typography color="primary" mt={2}>
            {msg}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          {tab === 0 ? "SIGN UP" : "LOGIN"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
