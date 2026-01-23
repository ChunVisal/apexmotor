// src/pages/HubInfo/ContactUs.jsx

import React from "react";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="max-w-lg mx-auto p-4 text-gray-800">
      <h1 className="text-lg font-semibold mb-4">Contact ApexMotor</h1>

      <p className="text-sm mb-6">
        Need help or want to learn more about ApexMotor Marketplace?  
        Here’s how you can reach us:
      </p>

      <div className="space-y-4 bg-gray-100 p-4 rounded-md shadow-sm">
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-gray-700" />
          <div>
            <h2 className="text-xs font-semibold">Email</h2>
            <p className="text-xs text-gray-700">support@apexmotor.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} className="text-gray-700" />
          <div>
            <h2 className="text-xs font-semibold">Phone</h2>
            <p className="text-xs text-gray-700">+885 888 093 342</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock size={18} className="text-gray-700" />
          <div>
            <h2 className="text-xs font-semibold">Business Hours</h2>
            <p className="text-xs text-gray-700">Mon – Sat: 9:00 AM – 6:00 PM</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={18} className="text-gray-700" />
          <div>
            <h2 className="text-xs font-semibold">Address</h2>
            <p className="text-xs text-gray-700">
              ApexMotor HQ, Phnom Penh, Cambodia
            </p>
          </div>
        </div>
      </div>
      
        <div className="flex gap-3 my-4  w-full">
            <button className="px-4 py-1 flex-1 bg-blue-600 text-white text-sm rounded-sm">
                Mail
            </button>
            <button className="px-4 py-1 flex-1 bg-green-600 text-white text-sm rounded-sm">
                Call
            </button>
        </div>
    </div>
  );
}
