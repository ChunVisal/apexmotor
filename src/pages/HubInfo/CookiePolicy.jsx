import React from 'react';
import { Cookie, Settings, BarChart, HardDrive } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-center mb-6">
        <Cookie size={38} className="text-gray-800 mr-4" />
        <h1 className="text-2xl font-bold text-gray-800">Cookie Policy</h1>
      </div>
      <p className="text-gray-700 text-[12.5px] leading-relaxed mb-6 border-b pb-4">
        This policy explains what cookies are, how ApexMotor uses them, and how you can manage your preferences. By using our website, you consent to our use of cookies in accordance with this policy.
      </p>

      <section className="mb-8">
        <div className="flex items-center mb-3">
          <HardDrive size={20} className="text-gray-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-800">What Are Cookies?</h2>
        </div>
        <p className="text-[12.5px] text-gray-700 leading-relaxed">
          Cookies are small text files that are placed on your device by websites you visit. They are widely used to make websites work more efficiently and to provide reporting information to the site owners.
        </p>
      </section>

      <section className="mb-8">
        <div className="flex items-center mb-3">
          <BarChart size={20} className="text-gray-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-800">How We Use Cookies</h2>
        </div>
        <p className="text-[12.5px] text-gray-700 leading-relaxed">
          We use cookies for several purposes:
        </p>
        <ul className="list-disc pl-5 text-[12.5px] text-gray-700 leading-relaxed space-y-2 mt-2">
          <li>
            <strong>Essential Cookies:</strong> These are strictly necessary for the operation of our website. They enable core functions like user login and account management.
          </li>
          <li>
            <strong>Performance and Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website. We use this information to improve our services and user experience.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> These cookies remember your preferences and settings, such as language or region, to provide a more personalized experience.
          </li>
        </ul>
      </section>

      <section>
        <div className="flex items-center mb-3">
          <Settings size={20} className="text-gray-500 mr-2" />
          <h2 className="text-sm font-semibold text-gray-800">Your Cookie Choices</h2>
        </div>
        <p className="text-[12.5px] text-gray-700 leading-relaxed">
          You can control and manage cookies in various ways. You have the right to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.
        </p>
        <p className="text-[12.5px] text-gray-700 leading-relaxed mt-2">
          Please note that if you choose to disable cookies, some parts of our website may not function properly.
        </p>
      </section>
    </div>
  );
};

export default CookiePolicy;
