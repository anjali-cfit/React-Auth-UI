import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      {products.map(p => (
        <div key={p.id} className="card">
          <img src={p.image_url} alt={p.name} />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button>👍 Like</button>
        </div>
      ))}
    </div>
  );
}
