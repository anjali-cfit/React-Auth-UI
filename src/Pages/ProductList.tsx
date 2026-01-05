import { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaSearch, FaTimes } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  image?: string;
}

// Static demo data
const demoProducts: Product[] = [
  {
    id: 1,
    name: "Basmati Rice (5kg)",
    price: 450,
    category: "grocery",
    stock: 25,
    description: "Premium quality aged basmati rice, perfect for biryani and pulao.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
  },
  {
    id: 2,
    name: "Tata Salt (1kg)",
    price: 28,
    category: "grocery",
    stock: 50,
    description: "Iodized salt for daily cooking needs.",
  },
  {
    id: 3,
    name: "Amul Butter (500g)",
    price: 280,
    category: "dairy",
    stock: 15,
    description: "Fresh and creamy butter made from pure milk.",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300",
  },
  {
    id: 4,
    name: "Britannia Bread",
    price: 45,
    category: "snacks",
    stock: 30,
    description: "Soft and fresh sandwich bread.",
  },
  {
    id: 5,
    name: "Surf Excel (1kg)",
    price: 220,
    category: "household",
    stock: 18,
    description: "Powerful stain remover detergent powder.",
  },
  {
    id: 6,
    name: "Coca Cola (2L)",
    price: 96,
    category: "beverages",
    stock: 40,
    description: "Refreshing cold drink.",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300",
  },
  {
    id: 7,
    name: "Colgate Toothpaste",
    price: 120,
    category: "personal-care",
    stock: 22,
    description: "Cavity protection toothpaste with fluoride.",
  },
  {
    id: 8,
    name: "Maggi Noodles (Pack of 12)",
    price: 168,
    category: "snacks",
    stock: 0,
    description: "Instant noodles - 2 minute preparation.",
  },
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Product Inventory</h1>
        <p>View and manage all your products</p>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">{products.length}</span>
          <span className="stat-label">Total Products</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {products.filter((p) => p.stock > 0).length}
          </span>
          <span className="stat-label">In Stock</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {products.filter((p) => p.stock === 0).length}
          </span>
          <span className="stat-label">Out of Stock</span>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products found</p>
        </div>
      ) : (
        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-thumb">
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                  </td>
                  <td className="product-name">{product.name}</td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td className="price">₹{product.price.toFixed(2)}</td>
                  <td>
                    <span
                      className={`stock-badge ${
                        product.stock > 10
                          ? "in-stock"
                          : product.stock > 0
                          ? "low-stock"
                          : "out-of-stock"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn view"
                        onClick={() => handleView(product)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button className="action-btn edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(product.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <FaTimes />
            </button>
            <div className="product-detail">
              <div className="product-detail-image">
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                ) : (
                  <div className="no-image-large">No Image Available</div>
                )}
              </div>
              <div className="product-detail-info">
                <h2>{selectedProduct.name}</h2>
                <span className="category-badge">{selectedProduct.category}</span>
                <div className="detail-row">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value price-large">
                    ₹{selectedProduct.price.toFixed(2)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Stock:</span>
                  <span className="detail-value">{selectedProduct.stock} units</span>
                </div>
                {selectedProduct.description && (
                  <div className="detail-row">
                    <span className="detail-label">Description:</span>
                    <p className="detail-description">{selectedProduct.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
