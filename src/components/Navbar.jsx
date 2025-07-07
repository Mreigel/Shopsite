import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { totalItems, subtotal } = useCart();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 select-none">
          ShopSite
        </Link>

        {/* Right-side links */}
        <div className="flex items-center space-x-8">
          <Link
            to="/signin"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-gray-700 hover:text-blue-600 transition duration-200"
          >
            Register
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-200"
            aria-label="View Cart"
          >
            <FaShoppingCart className="text-2xl" />
            {totalItems > 0 && (
              <>
                {/* Badge */}
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 leading-none">
                  {totalItems}
                </span>

                {/* Subtotal */}
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
