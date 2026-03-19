import React from 'react';
import { Gavel, UserCheck, Repeat, XCircle } from 'lucide-react';

const TermsOfUse = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-center mb-6">
        <Gavel size={38} className="text-gray-800 mr-4" />
        <h1 className="text-2xl font-bold text-gray-800">Terms of Use</h1>
      </div>
      <p className="text-gray-700 text-[12.5px] leading-relaxed mb-6 border-b pb-4">
        Welcome to ApexMotor. By accessing and using our marketplace, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
      </p>

      <section className="mb-8">
        <div className="flex items-center mb-3">
          <UserCheck size={20} className="text-gray-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-800">Your Responsibilities</h2>
        </div>
        <p className="text-[12.5px] text-gray-700 leading-relaxed">
          As a user of ApexMotor, you agree to:
        </p>
        <ul className="list-disc pl-5 text-[12.5px] text-gray-700 leading-relaxed space-y-2 mt-2">
          <li>Provide accurate and complete information when creating an account or listing a vehicle.</li>
          <li>Use the marketplace for lawful purposes only and not engage in any illegal or fraudulent activities.</li>
          <li>Maintain the confidentiality of your account password and notify us immediately of any unauthorized use.</li>
        </ul>
      </section>

      <section className="mb-8">
        <div className="flex items-center mb-3">
          <XCircle size={20} className="text-gray-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-800">Prohibited Conduct</h2>
        </div>
        <p className="text-[12.5px] text-gray-700 leading-relaxed">
          You are strictly prohibited from:
        </p>
        <ul className="list-disc pl-5 text-[12.5px] text-gray-700 leading-relaxed space-y-2 mt-2">
          <li>Attempting to gain unauthorized access to our systems or user data.</li>
          <li>Uploading malicious software, viruses, or any other harmful code.</li>
          <li>Posting false, misleading, or fraudulent information, including inaccurate vehicle listings.</li>
          <li>Harassing, threatening, or impersonating other users.</li>
        </ul>
      </section>

      <section>
        <div className="flex items-center mb-3">
          <Repeat size={20} className="text-gray-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-800">Changes to Terms</h2>
        </div>
        <p className="text-[12.5px] text-gray-700 leading-relaxed">
          We reserve the right to modify or replace these terms at any time. We will notify you of any significant changes. Your continued use of the marketplace after such changes constitutes your acceptance of the new terms.
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
