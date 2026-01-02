import "../styles/ProductBar.css";
import brush from "../assets/products/brush.png";
import color from "../assets/products/color.png";
import rubber from "../assets/products/ruber.png";
import temp from "../assets/products/tem.png";
import sharp from "../assets/products/sharpner.png";

const products = [
  {
    id: 1,
    name: "Color Pencils",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350"
  },
  {
    id: 2,
    name: "Kids stationary",
    image: brush
  },
  {
    id: 3,
    name: "Drawing",
    image: temp
  },
  {
    id: 4,
    name: "Craft Glue",
    image: rubber
  },
  {
    id: 5,
    name: "Educational Toys",
    image: color
  },
  {
    id: 6,
    name: "Note pads",
    image: sharp
  }
];

export default function ProductBar() {
  return (
    <section className="product-hover-section">
      <div className="product-hover-row">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <span className="product-name">{item.name}</span>
          </div>
        ))}
      </div>

       <h2>Everything Kids Love, All in One Place</h2>
      <p className="subtitle">
        Stationery, toys & seasonal essentials — beautifully displayed.
      </p>
    </section>
  );
}
