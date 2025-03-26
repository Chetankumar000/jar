// components/ShoppingCart.jsx

import React from "react";
import { Link } from "react-router-dom"; // Import the Link component
import useCartStore from "../stores/useCartStore"; // Import Zustand store
import { FiPlus, FiMinus, FiTrash } from "react-icons/fi"; // Import icons

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore(); // Access Zustand store

  // Calculate total price, taxes, and subtotal
  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.18; // Example tax rate of 18%
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotal();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      // If the quantity is zero or less, remove the item from the cart
      removeFromCart(id);
    } else {
      // Otherwise, update the quantity
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className=" text-white min-h-screen p-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-8">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-400">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Quantity Adjust Buttons */}
                  <button
                    className="px-3 py-2 bg-gray-700 rounded-full text-lg text-gray-300 hover:bg-gray-600 transition-all duration-200"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    } // Decrease quantity
                  >
                    <FiMinus />
                  </button>
                  <span className="text-lg font-semibold text-gray-100">
                    {item.quantity}
                  </span>
                  <button
                    className="px-3 py-2 bg-gray-700 rounded-full text-lg text-gray-300 hover:bg-gray-600 transition-all duration-200"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    } // Increase quantity
                  >
                    <FiPlus />
                  </button>
                  {/* Remove Item Button */}
                  <button
                    className="text-red-500 hover:text-red-400"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FiTrash size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Summary */}
          <div className="bg-gray-800 rounded-lg p-6 mt-8">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              Cart Summary
            </h3>
            <div className="flex justify-between mb-2">
              <span className="text-lg text-gray-400">Subtotal</span>
              <span className="text-lg font-semibold text-gray-100">
                ₹{subtotal}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-lg text-gray-400">Tax (18%)</span>
              <span className="text-lg font-semibold text-gray-100">
                ₹{tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-4 border-t border-gray-700 pt-4">
              <span className="text-xl font-bold text-gray-100">Total</span>
              <span className="text-xl font-bold text-green-500">
                ₹{total.toFixed(2)}
              </span>
            </div>

            {/* Link to payment page */}
            <Link to="/payment">
              <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300">
                Proceed to Payment
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
