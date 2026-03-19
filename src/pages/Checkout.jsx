import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FiCreditCard, FiUser, FiLock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import Breadcrumb from "../components/layout/Breadcrumb";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const total = cartItems.reduce((sum, car) => sum + Number(car.price), 0);

  const [formData, setFormData] = useState({
    fullName: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const validateCardInput = () => {
    if (!/^\d{15,16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      return "Card number must be 15 or 16 digits";
    }
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      return "Expiry must be in MM/YY format";
    }
    if (!/^\d{3,4}$/.test(formData.cvc)) {
      return "Invalid CVC (must be 3 or 4 digits)";
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    } else if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})/, "$1/")
        .substring(0, 5);
    } else if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!user) {
      setErrorMsg("Please log in to complete checkout");
      return;
    }

    if (cartItems.length === 0) {
      setErrorMsg("Your cart is empty");
      return;
    }

    const validationError = validateCardInput();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    try {
      // Your payment processing logic here
      // await processPayment({ ...formData, cartItems, total });
      
      clearCart();
      setSuccessMsg("Payment successful! Redirecting...");
      // Redirect logic here
    } catch (err) {
      setErrorMsg(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <Breadcrumb />
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center justify-center">
            <FiLock className="mr-2 text-blue-600" />
            Secure Checkout
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Complete your purchase in just a few steps
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <FiAlertCircle className="mx-auto text-3xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-4">Add vehicles to your cart before checkout</p>
            <a
              href="/cars"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Browse Inventory
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <FiCheckCircle className="mr-2 text-green-500" />
                  Order Summary
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {cartItems.map((car) => (
                  <div key={car.id} className="px-6 py-4 flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{car.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{car.year} • {car.location}</p>
                    </div>
                    <span className="text-sm font-semibold text-blue-600">${car.price}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Total</span>
                  <span className="text-lg font-bold text-green-600">${total}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FiCreditCard className="mr-2 text-blue-600" />
                Payment Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCreditCard className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.expiry}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.cvc}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Messages */}
              {errorMsg && (
                <div className="mt-4 text-red-600 text-sm flex items-center">
                  <FiAlertCircle className="mr-2" />
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="mt-4 text-green-600 text-sm flex items-center">
                  <FiCheckCircle className="mr-2" />
                  {successMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                {loading ? "Processing..." : "Complete Payment"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}