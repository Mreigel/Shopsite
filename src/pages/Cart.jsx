import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  // Modal & guest checkout state
  const [showCheckoutPrompt, setShowCheckoutPrompt] = useState(false);
  const [guestCheckout, setGuestCheckout] = useState(false);

  if (!cart) {
    console.warn("Cart is undefined or null!");
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  // Remove entire product from cart
  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  // Remove a specific size from product completely
  const removeSizeFromProduct = (productIndex, size) => {
    const updated = [...cart];
    const product = updated[productIndex];
    if (!product || !product.sizes) return;

    const newSizes = { ...product.sizes };
    delete newSizes[size];

    if (Object.keys(newSizes).length === 0) {
      updated.splice(productIndex, 1);
    } else {
      updated[productIndex] = { ...product, sizes: newSizes };
    }
    setCart(updated);
  };

  // Decrement qty of a size by 1, removing size if qty reaches 0
  const decrementQty = (productIndex, size) => {
    const updated = [...cart];
    const product = updated[productIndex];
    if (!product || !product.sizes || !product.sizes[size]) return;

    const currentQty = product.sizes[size];
    if (currentQty > 1) {
      updated[productIndex].sizes[size] = currentQty - 1;
    } else {
      delete updated[productIndex].sizes[size];
      if (Object.keys(updated[productIndex].sizes).length === 0) {
        updated.splice(productIndex, 1);
      }
    }
    setCart(updated);
  };

  // Increment qty of a size by 1 (add stock limit if needed)
  const incrementQty = (productIndex, size) => {
    const updated = [...cart];
    const product = updated[productIndex];
    if (!product || !product.sizes || !product.sizes[size]) return;

    // Optional: Add stock limit check here
    updated[productIndex].sizes[size] = product.sizes[size] + 1;
    setCart(updated);
  };

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => {
    let totalForItem = 0;
    if (item.sizes && typeof item.sizes === "object") {
      for (const qty of Object.values(item.sizes)) {
        const price = Number(item.price);
        const quantity = Number(qty);
        if (!isNaN(price) && !isNaN(quantity)) {
          totalForItem += price * quantity;
        }
      }
    }
    return acc + totalForItem;
  }, 0);

  const shipping = subtotal > 0 ? 0.0 : 0;
  const total = subtotal + shipping;

  // Helper to get product image
  const getProductImage = (item) => {
    if (item.images && item.images.length > 0) return item.images[0];
    if (item.image) return item.image;
    return "";
  };

  // Flatten cart sizes for display: each size is its own card with image and qty
  const flattenedItems = [];
  cart.forEach((item, productIndex) => {
    if (item.sizes && typeof item.sizes === "object") {
      Object.entries(item.sizes).forEach(([size, qty]) => {
        flattenedItems.push({
          productIndex,
          id: item.id,
          name: item.name,
          price: item.price,
          image: getProductImage(item),
          size,
          qty,
        });
      });
    }
  });

  // Dummy "People Also Bought" products
  const peopleAlsoBought = cart.length > 0 ? [
    {
      id: 101,
      name: "Casual Sneakers",
      price: 59.99,
      image: "https://picsum.photos/id/1050/300/200",
    },
    {
      id: 102,
      name: "Classic Jeans",
      price: 49.99,
      image: "https://picsum.photos/id/1051/300/200",
    },
    {
      id: 103,
      name: "Basic Hoodie",
      price: 39.99,
      image: "https://picsum.photos/id/1052/300/200",
    }
  ] : [];

  // Checkout button click
  const handleCheckoutClick = () => {
    setShowCheckoutPrompt(true);
  };

  // Guest checkout chosen
  const handleGuestCheckout = () => {
    setGuestCheckout(true);
    setShowCheckoutPrompt(false);
  };

  // Sign in chosen
  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-2 text-center sm:text-left">Your Cart</h1>

      {/* Continue Shopping Button */}
      <div className="mb-6 text-center sm:text-left">
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          ← Continue Shopping
        </Link>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Cart Items */}
          <div className="flex-1 flex flex-wrap gap-6">
            {flattenedItems.map(({ productIndex, id, name, price, image, size, qty }) => (
              <div
                key={`${id}-${size}`}
                className="bg-white rounded-lg shadow-md p-4 w-full sm:w-[48%] md:w-[30%] flex flex-col"
              >
                <img
                  src={image}
                  alt={`${name} size ${size}`}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-gray-600">${price.toFixed(2)}</p>
                <p className="mt-2">Size: <span className="font-medium">{size}</span></p>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    type="button"
                    onClick={() => decrementQty(productIndex, size)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-blue-400"
                    aria-label={`Decrease quantity of size ${size} for ${name}`}
                  >
                    −
                  </button>
                  <span>{qty}</span>
                  <button
                    type="button"
                    onClick={() => incrementQty(productIndex, size)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-blue-400"
                    aria-label={`Increase quantity of size ${size} for ${name}`}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeSizeFromProduct(productIndex, size)}
                  className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Remove Size
                </button>
              </div>
            ))}

            {/* Button to clear entire cart */}
            <button
              type="button"
              onClick={() => setCart([])}
              className="mt-6 w-full bg-blue-800 text-white py-3 rounded hover:bg-blue-900 transition"
            >
              Clear Entire Cart
            </button>
          </div>

          {/* Right: Order Summary + PayPal or Checkout Prompt */}
          <aside className="w-full lg:w-96 bg-white rounded-lg shadow-md p-6 sticky top-24 h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Shipping</span>
              <span className="font-semibold">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6 border-t pt-3">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-semibold text-lg">${total.toFixed(2)}</span>
            </div>

            {!guestCheckout && !showCheckoutPrompt && (
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
              >
                Checkout
              </button>
            )}

            {showCheckoutPrompt && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                role="dialog"
                aria-modal="true"
              >
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
                  <h3 className="text-xl font-semibold mb-4">Sign in or checkout as guest</h3>
                  <p className="mb-6">Sign in for faster checkout and order tracking.</p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleSignIn}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleGuestCheckout}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                      Checkout as Guest
                    </button>
                  </div>
                  <button
                    aria-label="Close"
                    onClick={() => setShowCheckoutPrompt(false)}
                    className="mt-6 text-sm text-gray-500 underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {guestCheckout && (
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "rect",
                  label: "paypal",
                  height: 45,
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: total.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    alert(`✅ Transaction completed by ${details.payer.name.given_name}`);
                    setCart([]);
                    setGuestCheckout(false);
                  });
                }}
                onError={(err) => {
                  alert("❌ Payment failed. Please try again.");
                  console.error(err);
                }}
              />
            )}
          </aside>
        </div>
      )}

      {/* People Also Bought Section */}
      {peopleAlsoBought.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">People Also Bought</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {peopleAlsoBought.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="text-gray-600">${p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;
