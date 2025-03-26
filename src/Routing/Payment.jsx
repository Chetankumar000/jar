// Routing/Payment.jsx

import React, { useState } from "react";
import { FiCreditCard, FiGift, FiTruck, FiDollarSign } from "react-icons/fi"; // Added icons for new options
import { motion } from "framer-motion"; // Import Framer Motion for animations

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a payment processing delay
    setTimeout(() => {
      setIsLoading(false);
      alert("Payment Successful!");
    }, 2000);
  };

  return (
    <div className="pt-16">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Payment Information
        </h2>

        {/* Accordion for Payment Methods */}
        <div className="space-y-4">
          {/* Credit/Debit Card Option */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
            <motion.button
              onClick={() =>
                setSelectedPaymentOption(
                  selectedPaymentOption === "card" ? null : "card"
                )
              }
              className="w-full text-left flex justify-between items-center text-lg font-semibold text-white focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <FiCreditCard size={24} />
                <span>Credit/Debit Card</span>
              </div>
              <span>{selectedPaymentOption === "card" ? "-" : "+"}</span>
            </motion.button>

            {selectedPaymentOption === "card" && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    className="flex-1 p-3 border border-gray-600 rounded-md text-lg text-white focus:outline-none focus:border-blue-500"
                    maxLength={16}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    className="p-3 border border-gray-600 rounded-md text-lg text-white focus:outline-none focus:border-blue-500"
                    maxLength={5}
                    required
                  />
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="CVV"
                    className="p-3 border border-gray-600 rounded-md text-lg text-white focus:outline-none focus:border-blue-500"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* PayPal Option */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
            <motion.button
              onClick={() =>
                setSelectedPaymentOption(
                  selectedPaymentOption === "paypal" ? null : "paypal"
                )
              }
              className="w-full text-left flex justify-between items-center text-lg font-semibold text-white focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                {/* <FiPaypal size={24} /> */}
                <span>Pay with PayPal</span>
              </div>
              <span>{selectedPaymentOption === "paypal" ? "-" : "+"}</span>
            </motion.button>

            {selectedPaymentOption === "paypal" && (
              <div className="mt-4 space-y-4">
                <p className="text-gray-300">
                  Log in to your PayPal account to complete the payment.
                </p>
              </div>
            )}
          </div>

          {/* Gift Card Option */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
            <motion.button
              onClick={() =>
                setSelectedPaymentOption(
                  selectedPaymentOption === "gift" ? null : "gift"
                )
              }
              className="w-full text-left flex justify-between items-center text-lg font-semibold text-white focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <FiGift size={24} />
                <span>Gift Card</span>
              </div>
              <span>{selectedPaymentOption === "gift" ? "-" : "+"}</span>
            </motion.button>

            {selectedPaymentOption === "gift" && (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Gift Card Number"
                  className="flex-1 p-3 border border-gray-600 rounded-md text-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            )}
          </div>

          {/* Cash on Delivery Option */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
            <motion.button
              onClick={() =>
                setSelectedPaymentOption(
                  selectedPaymentOption === "cod" ? null : "cod"
                )
              }
              className="w-full text-left flex justify-between items-center text-lg font-semibold text-white focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <FiTruck size={24} />
                <span>Cash on Delivery (COD)</span>
              </div>
              <span>{selectedPaymentOption === "cod" ? "-" : "+"}</span>
            </motion.button>

            {selectedPaymentOption === "cod" && (
              <div className="mt-4 space-y-4">
                <p className="text-gray-300">
                  Pay with cash when your order arrives.
                </p>
              </div>
            )}
          </div>

          {/* UPI Option */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
            <motion.button
              onClick={() =>
                setSelectedPaymentOption(
                  selectedPaymentOption === "upi" ? null : "upi"
                )
              }
              className="w-full text-left flex justify-between items-center text-lg font-semibold text-white focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <FiDollarSign size={24} />
                <span>UPI Payment</span>
              </div>
              <span>{selectedPaymentOption === "upi" ? "-" : "+"}</span>
            </motion.button>

            {selectedPaymentOption === "upi" && (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="UPI ID"
                  className="flex-1 p-3 border border-gray-600 rounded-md text-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Payment Button */}
        <motion.button
          onClick={handleSubmit}
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Payment;
