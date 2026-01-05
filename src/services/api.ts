const API = "http://localhost:5000/api";

// Products
export const getProducts = async () => {
  const res = await fetch(`${API}/products`);
  return res.json();
};

export const addProduct = async (product: {
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  image?: string;
}) => {
  const res = await fetch(`${API}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`${API}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
};

// Payments
export const getPayments = async () => {
  const res = await fetch(`${API}/payments`);
  return res.json();
};

// Sales Analytics
export const getSalesData = async (timeRange: string) => {
  const res = await fetch(`${API}/sales?range=${timeRange}`);
  return res.json();
};
