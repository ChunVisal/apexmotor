// src/pages/Feedback.jsx
import React from 'react';
import { EnvelopeIcon, PhoneIcon, BugAntIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export default function Feedback() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
          <p className="text-xs text-gray-600 mt-2">
            Your feedback helps us improve ApexMotor Marketplace. Please use this to share your thoughts, report a bug, or suggest a new feature.
          </p>
        </div>

        {/* Action List */}
        <div className="space-y-6">
          {/* Bug Report Item */}
          <div className="flex items-center space-x-4">
            <BugAntIcon className="h-6 w-6 text-gray-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Report a Bug</h2>
              <p className="text-xs text-gray-600">
                Found something that isn't working? Please provide as much detail as possible.
              </p>
              <a 
                href="mailto:support@apexmotor.com?subject=Bug Report: ApexMotor"
                className="inline-flex items-center text-xs font-medium mt-2 text-[#2384C1] hover:text-blue-800"
              >
                <EnvelopeIcon className="h-4 w-4 mr-1" />
                Send an email
              </a>
            </div>
          </div>

          {/* Feature Suggestion Item */}
          <div className="flex items-center space-x-4">
            <LightBulbIcon className="h-6 w-6 text-gray-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Suggest a Feature</h2>
              <p className="text-xs text-gray-600">
                Have an idea for a new feature? We'd love to hear it!
              </p>
              <a 
                href="mailto:support@apexmotor.com?subject=Feature Suggestion: ApexMotor"
                className="inline-flex items-center text-xs font-medium mt-2 text-[#2384C1] hover:text-blue-800"
              >
                <EnvelopeIcon className="h-4 w-4 mr-1" />
                Send an email
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">General Inquiries</h2>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex items-center space-x-2">
              <EnvelopeIcon className="h-5 w-5 text-gray-500" />
              <span>
                Email:{" "}
                <a href="mailto:support@apexmotor.com" className="text-[#2384C1] hover:text-blue-800">
                  support@apexmotor.com
                </a>
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <PhoneIcon className="h-5 w-5 text-gray-500" />
              <span>
                Phone:{" "}
                <a href="tel:+8851234567890" className="text-[#2384C1] hover:text-blue-800">
                  +885 123 456 7890
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}