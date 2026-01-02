const API = "http://localhost:5000/api";

export const getProducts = async () => {
  const res = await fetch(`${API}/products`);
  return res.json();
};
