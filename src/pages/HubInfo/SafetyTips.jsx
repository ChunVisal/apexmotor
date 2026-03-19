// src/pages/SafetyTips.jsx
import React from 'react';
import { ShieldCheckIcon, DocumentTextIcon, MapPinIcon, UsersIcon, ChatBubbleLeftRightIcon, BanknotesIcon, CameraIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';

const primaryColor = '#2384C1';

export default function SafetyTips() {
  return (
    <div className="mx-10 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Safety Tips for Buying and Selling Cars</h1>
          <p className="text-xs text-gray-700">
            Your safety is our top priority. Follow these guidelines to ensure a secure transaction on ApexMotor Marketplace.
          </p>
        </div>

        {/* For Buyers Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4" style={{ color: primaryColor }}>For Buyers</h2>
          <div className="space-y-4">
            {/* Before You Meet */}
            <h3 className="text-lg font-medium text-gray-700">Before You Meet</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <TipItem icon={<HandThumbUpIcon />} text="Verify the seller's information. Look at their profile for reviews and ratings." />
              <TipItem icon={<ChatBubbleLeftRightIcon />} text="Communicate on our platform. Keep all your conversations within the ApexMotor chat system." />
              <TipItem icon={<DocumentTextIcon />} text="Ask for documents. Request photos of the vehicle registration and service history before meeting." />
            </div>

            {/* During the Meeting */}
            <h3 className="text-lg font-medium text-gray-700">During the Meeting</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <TipItem icon={<MapPinIcon />} text="Choose a public, safe location. A police station or busy mall are great options." />
              <TipItem icon={<UsersIcon />} text="Bring a friend. Never go alone to meet a seller." />
              <TipItem icon={<ShieldCheckIcon />} text="Trust your instincts. If something feels off, or the seller is pressuring you, walk away." />
            </div>
          </div>
        </div>

        {/* For Sellers Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4" style={{ color: primaryColor }}>For Sellers</h2>
          <div className="space-y-4">
            {/* Before You List */}
            <h3 className="text-lg font-medium text-gray-700">Before You List</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <TipItem icon={<CameraIcon />} text="Take clear photos. High-quality photos will attract serious buyers and build trust." />
              <TipItem icon={<HandThumbUpIcon />} text="Be honest about the vehicle's condition. Disclose any issues upfront to prevent misunderstandings." />
              <TipItem icon={<BanknotesIcon />} text="Set a fair price. Research the market value of your car to set a competitive price." />
            </div>

            {/* During the Meeting */}
            <h3 className="text-lg font-medium text-gray-700">During the Meeting</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <TipItem icon={<MapPinIcon />} text="Meet in a public place. A public location is the safest choice." />
              <TipItem icon={<ShieldCheckIcon />} text="Keep your personal information private. Do not share your home address until you are sure the transaction is legitimate." />
              <TipItem icon={<BanknotesIcon />} text="Arrange for a secure payment. Accept only secure forms of payment like a cashier's check or wire transfer." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable TipItem Component
const TipItem = ({ icon, text }) => (
  <div className="flex items-start space-x-2">
    <div className="flex-shrink-0" style={{ color: primaryColor }}>
      {React.cloneElement(icon, { className: 'h-4 w-4 mt-1' })}
    </div>
    <p className="leading-tight">{text}</p>
  </div>
);