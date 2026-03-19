// src/pages/Terms.jsx
import React from 'react';
import { FaGavel } from 'react-icons/fa';

export default function Terms() {
  return (
    <div className="mx-10 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center space-x-2 mb-4">
          <FaGavel className="w-6 h-6 text-gray-500 flex-shrink-0" />
          <h1 className="text-2xl font-bold text-gray-900">Terms of Use</h1>
        </div>
        <p className="text-xs text-gray-700 mb-6">
          Welcome to ApexMotor Marketplace. By using our services, you agree to the following terms and conditions.
        </p>

        {/* Terms Sections */}
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h2>
            <p className="text-xs text-gray-600">
              By accessing or using our website and services, you agree to be bound by these Terms of Use. If you do not agree with these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">2. User Conduct</h2>
            <p className="text-xs text-gray-600">
              You agree to use ApexMotor Marketplace for lawful purposes only. You are responsible for all content you post and agree not to post any material that is false, misleading, offensive, or violates any laws.
            </p>
          </section>
          
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Intellectual Property</h2>
            <p className="text-xs text-gray-600">
              All content on this website, including text, graphics, logos, and images, is the property of ApexMotor Marketplace and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our express permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Disclaimers and Limitation of Liability</h2>
            <p className="text-xs text-gray-600">
              ApexMotor Marketplace is a platform that connects buyers and sellers. We do not own, buy, or sell any vehicles listed on our site. We are not a party to any transaction and are not responsible for the quality, safety, or legality of the vehicles. You agree that your use of our services is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Termination</h2>
            <p className="text-xs text-gray-600">
              We reserve the right to suspend or terminate your account and access to our services at any time, for any reason, without notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">6. Governing Law</h2>
            <p className="text-xs text-gray-600">
              These terms are governed by the laws of Cambodia. Any legal action related to these terms will be brought in the courts of Cambodia.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}