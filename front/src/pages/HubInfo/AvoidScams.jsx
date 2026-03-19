// src/pages/HubInfo/AvoidScams.jsx
import React from 'react';
import { FaShieldAlt, FaExclamationTriangle, FaCreditCard, FaUserSecret, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';

export default function AvoidScams() {
  return (
    <div className="mx-10 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <FaShieldAlt className="w-8 h-8 text-gray-500 mb-2" />
          <h1 className="text-xl font-bold text-gray-900">
            Stay Safe on ApexMotor
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Be aware of common scams and protect yourself.
          </p>
        </div>

        {/* Common Scams Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-red-600 mb-4">Common Scams to Watch Out For</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-4 h-4 text-red-500 mt-1">
                <FaExclamationTriangle />
              </span>
              <div className="ml-3">
                <h3 className="text-sm font-semibold">Fake Listings</h3>
                <p className="text-sm">Scammers post cars with unbelievably low prices to pressure you for an immediate deposit. Always see the car and verify the seller before sending any money.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-4 h-4 text-red-500 mt-1">
                <FaCreditCard />
              </span>
              <div className="ml-3">
                <h3 className="text-sm font-semibold">Third-Party Payment Scams</h3>
                <p className="text-sm">A scammer may ask you to use a fake third-party service for payment to steal your money and financial information.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-4 h-4 text-red-500 mt-1">
                <FaUserSecret />
              </span>
              <div className="ml-3">
                <h3 className="text-sm font-semibold">Phishing Attempts</h3>
                <p className="text-sm">Be suspicious of any requests for your password or personal information. ApexMotor will never ask for this information via email or chat.</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Protection Tips Section */}
        <div>
          <h2 className="text-lg font-bold text-green-600 mb-4">How to Protect Yourself</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-4 h-4 text-green-500 mt-1">
                <FaCheckCircle />
              </span>
              <div className="ml-3">
                <h3 className="text-sm font-semibold">Meet in Person</h3>
                <p className="text-sm">Always meet in a public, well-lit place to inspect the car before any payment is made. Consider bringing a friend along.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-4 h-4 text-green-500 mt-1">
                <FaMapMarkerAlt />
              </span>
              <div className="ml-3">
                <h3 className="text-sm font-semibold">Secure Payments</h3>
                <p className="text-sm">Use secure payment methods like a bank transfer or cashier’s check. Never send personal details or cash in advance.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}