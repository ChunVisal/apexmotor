import React from 'react';
import { Shield, Users, Lock, BarChart, FileText, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-center mb-6">
        <Shield size={28} className="text-blue-600 mr-4" />
        <h1 className="text-2xl font-bold text-gray-800">Privacy Policy</h1>
      </div>
      <p className="text-gray-600 text-[12.5px] leading-relaxed mb-6 border-b pb-4">
        At ApexMotor, we are committed to protecting your privacy. This policy details how we handle your personal data when you use our marketplace. By using our services, you consent to the data practices described here.
      </p>

      <section className="mb-8">
        <div className="flex items-center mb-3">
          <Users size={20} className="text-gray-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-800">Information We Collect</h2>
        </div>
        <ul className="list-disc pl-5 text-[12.5px] text-gray-700 leading-relaxed space-y-2">
          <li>
            <strong>Personal Identification Data:</strong> Information you provide to us, such as your name, email address, phone number, and location. This is collected when you create an account, list a car, or contact a seller.
          </li>
          <li>
            <strong>Transaction Information:</strong> Details related to any purchases or sales you make on our platform.
          </li>
          <li>
            <strong>Usage and Analytics Data:</strong> We collect data on how you interact with our website, including pages visited, time spent, and other browsing behavior. This helps us improve our service.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <div className="flex items-center mb-3">
          <BarChart size={20} className="text-gray-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-800">How We Use Your Information</h2>
        </div>
        <p className="text-[12.5px] text-gray-700 leading-relaxed">
          We use the information we collect for various purposes, including to:
        </p>
        <ul className="list-disc pl-5 text-[12.5px] text-gray-700 leading-relaxed space-y-2 mt-2">
          <li>Provide and maintain our services.</li>
          <li>Process transactions and manage listings.</li>
          <li>Improve our website's functionality and user experience.</li>
          <li>Communicate with you about your account and our services.</li>
          <li>Detect and prevent fraudulent or illegal activities.</li>
        </ul>
      </section>

      <section className="mb-8">
        <div className="flex items-center mb-3">
          <Lock size={20} className="text-gray-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-800">Data Security</h2>
        </div>
        <p className="text-[12.5px] text-gray-700 leading-relaxed">
          We implement a variety of security measures to ensure the safety of your personal information. Your data is stored on secure servers and protected by industry-standard protocols.
        </p>
      </section>

      <section className="mb-8">
        <div className="flex items-center mb-3">
          <FileText size={20} className="text-gray-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-800">Your Rights</h2>
        </div>
        <p className="text-[12.5px] text-gray-700 leading-relaxed">
          You have the right to access, update, or request the deletion of your personal data. Please contact us to exercise these rights.
        </p>
      </section>

      <section>
        <div className="flex items-center mb-3">
          <Mail size={20} className="text-gray-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-800">Contact Us</h2>
        </div>
        <p className="text-[12.5px] text-gray-700 leading-relaxed">
          If you have any questions or concerns about this privacy policy, you can reach us at:
        </p>
        <address className="not-italic text-[12.5px] text-gray-700 mt-2">
          ApexMotor Support <br />
          Email: <a href="mailto:support@apexmotor.com" className="text-blue-600 hover:underline">support@apexmotor.com</a>
        </address>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
