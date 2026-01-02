import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image_url: "",
    description: ""
  });

  const navigate = useNavigate();

  const submit = async () => {
    const res = await fetch("http://localhost:5000/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);
    navigate("/products");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Product</h2>

      <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})} />
      <input placeholder="Category" onChange={e => setForm({...form, category:e.target.value})} />
      <input placeholder="Price" onChange={e => setForm({...form, price:e.target.value})} />
      <input placeholder="Image URL" onChange={e => setForm({...form, image_url:e.target.value})} />
      <textarea placeholder="Description" onChange={e => setForm({...form, description:e.target.value})} />

      <button onClick={submit}>Save Product</button>
    </div>
  );
};

export default AddProduct;
