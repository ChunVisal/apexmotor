// src/pages/HubInfo/FAQs.jsx
import React from 'react';
import { FaQuestionCircle, FaUserPlus, FaCarSide, FaEnvelopeOpenText } from 'react-icons/fa';

export default function FAQs() {
  return (
    <div className="mx-10 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <FaQuestionCircle className="w-8 h-8 text-gray-500 mb-2" />
          <h1 className="text-xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-1 text-xs text-gray-600">
            Find answers to the most common questions about our platform.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <FaUserPlus className="text-blue-500 text-xs flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-base font-semibold text-gray-800">How do I list my car for sale?</h2>
              <p className="mt-1 text-xs text-gray-700">
                You can list your car by creating an account and navigating to the "Sell Your Car" section. Just fill out the required details, upload high-quality photos, and your listing will be live.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaCarSide className="text-blue-500 text-xs flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-base font-semibold text-gray-800">Is there a fee to use ApexMotor Marketplace?</h2>
              <p className="mt-1 text-xs text-gray-700">
                Listing your car on our marketplace is free. We only charge a small fee for our premium services that help your listing get more visibility.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaEnvelopeOpenText className="text-blue-500 text-xs flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-base font-semibold text-gray-800">How do I contact a seller?</h2>
              <p className="mt-1 text-xs text-gray-700">
                You can contact a seller directly through the messaging system on the car's detail page. We recommend keeping all communication on our platform for your safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}