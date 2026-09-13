import { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState({});
  const [filter, setFilter] = useState("all");

  const products = [
    {
      id: 1,
      name: "Wireless Mouse",
      description: "Comfortable mouse for everyday use",
      price: 15,
      available: true
    },
    {
      id: 2,
      name: "Keyboard",
      description: "Compact keyboard with smooth keys",
      price: 30,
      available: true
    },
    {
      id: 3,
      name: "USB-C Hub",
      description: "Useful hub with multiple ports",
      price: 40,
      available: true
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      description: "Portable speaker with clear sound",
      price: 45,
      available: true
    },
    {
      id: 5,
      name: "Smartwatch",
      description: "Fitness tracking and notifications",
      price: 80,
      available: true
    },
    {
      id: 6,
      name: "Gaming Headset",
      description: "Headset with microphone and surround sound",
      price: 60,
      available: false
    }
  ];

  const addToCart = (id) => {
    setCart({
      ...cart,
      [id]: (cart[id] || 0) + 1
    });
  };

  const removeFromCart = (id) => {
    const updatedCart = { ...cart };

    if (updatedCart[id] > 1) {
      updatedCart[id]--;
    } else {
      delete updatedCart[id];
    }

    setCart(updatedCart);
  };

  const getFilteredProducts = () => {
    if (filter === "low") {
      return products.filter((product) => product.price < 30);
    }

    if (filter === "medium") {
      return products.filter(
        (product) => product.price >= 30 && product.price < 60
      );
    }

    if (filter === "high") {
      return products.filter((product) => product.price >= 60);
    }

    return products;
  };

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  return (
    <div className="app">
      <header>
        <h1>Tech Store</h1>
        <div className="cart">Cart: {cartCount}</div>
      </header>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("low")}>Under $30</button>
        <button onClick={() => setFilter("medium")}>$30 - $59</button>
        <button onClick={() => setFilter("high")}>$60+</button>
      </div>

      <div className="products">
        {getFilteredProducts().map((product) => (
          <div className="card" key={product.id}>
            <div className="image">
              {product.name}
            </div>

            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>${product.price}</h3>

            <span className={product.available ? "available" : "unavailable"}>
              {product.available ? "Available" : "Out of Stock"}
            </span>

            {product.available && (
              <div className="actions">
                <button onClick={() => addToCart(product.id)}>
                  Add to Cart
                </button>

                {cart[product.id] > 0 && (
                  <div className="quantity">
                    <button onClick={() => removeFromCart(product.id)}>
                      -
                    </button>

                    <span>{cart[product.id]}</span>

                    <button onClick={() => addToCart(product.id)}>
                      +
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;