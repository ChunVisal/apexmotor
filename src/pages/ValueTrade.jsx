import { useState, useRef } from "react";
import { ClipboardList, Handshake, DollarSign, ArrowRight, Car, CheckCircle, Star, Shield, MessageSquare, Gauge, ArrowRightCircle } from 'lucide-react';
import Breadcrumb from "../components/layout/Breadcrumb";

const ValueTrade = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const steps = [
    { title: "Tell Us About Your Car", icon: Car, description: "Fill in the make, model, and mileage to get started." },
    { title: "Get a Fair Estimate", icon: DollarSign, description: "We compare with real-time market data to give you a transparent price range." },
    { title: "Connect with Buyers", icon: Handshake, description: "Sell directly to another user or trade with a verified dealer." },
    { title: "Complete Your Deal Securely", icon: CheckCircle, description: "Our platform ensures every transaction is safe and secure." },
  ];

  const testimonials = [
    {
      quote: "This app helped me sell fast and fairly. The process was so transparent and easy!",
      name: "Sokha, Toyota Corolla Owner",
      avatar: "https://api.dicebear.com/7.x/notionists-neutral/svg?seed=Sokha",
    },
    {
      quote: "I was surprised by how accurate the valuation was. The community insights gave me confidence.",
      name: "Sreymao, Ford Ranger Owner",
      avatar: "https://api.dicebear.com/7.x/notionists-neutral/svg?seed=Sreymao",
    },
  ];

  const handleStartValuation = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  return (
    <section className="min-h-screen bg-gray-100 py-10 mx-15 font-inter">
    <div className="mx-10">
        < Breadcrumb />
    </div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white mx-10 border-b border-gray-300">
        <div className="relative z-10 p-12 sm:p-16 md:p-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Get a Fair Trade-In Value for Your Car 🚗✨
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-4xl mx-auto">
            We compare similar cars in the market to give you an honest price range.
          </p>
          <button onClick={handleStartValuation} className="mt-8 rounded-xs inline-flex items-center justify-center bg-[#2384C1] text-white font-semibold py-3 px-8 text-sm hover:bg-blue-700 transition-colors">
            Start Your Trade-In
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Step-by-Step Process */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 text-center border-r border-gray-200 last:border-r-0">
              <div className="bg-gray-100 text-[#2384C1] p-3 inline-flex mb-4">
                <step.icon size={28} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-gray-600 text-xs leading-snug">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Signals Section */}
      <div className="bg-white py-16 mt-12 mx-10 border-y border-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-8 tracking-tight">What Our Community Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star size={14} fill="currentColor" stroke="none" />
                    <Star size={14} fill="currentColor" stroke="none" />
                    <Star size={14} fill="currentColor" stroke="none" />
                    <Star size={14} fill="currentColor" stroke="none" />
                    <Star size={14} fill="currentColor" stroke="none" />
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm mb-4 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-8 h-8 mr-3" />
                  <h4 className="font-semibold text-gray-800 text-sm">{testimonial.name}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-12 text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield size={18} className="text-green-500" />
              <span className="font-semibold text-xs">Secure Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare size={18} className="text-blue-500" />
              <span className="font-semibold text-xs">Verified Users</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Final Call to Action Section */}
      <div id="valuation-form" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-[#2384C1] text-white p-10 text-center border border-transparent">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">
            Ready to Value Your Car?
          </h2>
          <p className="text-sm sm:text-base max-w-2xl mx-auto">
            Click the button below to get your personalized valuation and join our community of trusted sellers.
          </p>
          <button onClick={handleStartValuation} className="mt-6 rounded-xs  inline-flex items-center justify-center bg-white text-[#2384C1] font-semibold py-3 px-8 text-sm hover:bg-gray-200 transition-colors">
            Start Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Hidden Form Section */}
      {showForm && (
        <div ref={formRef} className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white border border-gray-300 p-8">
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Your Trade-in Details</h2>
              <p className="mt-2 text-xs text-gray-600">
                Fill out the form below to get your personalized valuation.
              </p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="make" className="block text-xs font-medium text-gray-700">Car Make</label>
                  <input type="text" name="make" id="make" required className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="model" className="block text-xs font-medium text-gray-700">Car Model</label>
                  <input type="text" name="model" id="model" required className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="year" className="block text-xs font-medium text-gray-700">Year</label>
                  <input type="number" name="year" id="year" required min="1900" max={new Date().getFullYear()} className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="mileage" className="block text-xs font-medium text-gray-700">Mileage (km)</label>
                  <input type="number" name="mileage" id="mileage" required min="0" className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="condition" className="block text-xs font-medium text-gray-700">Condition</label>
                  <select name="condition" id="condition" required className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm">
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="photos" className="block text-xs font-medium text-gray-700">
                    Upload Photos (Max 5)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border border-gray-300 border-dashed">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-20m32-12a4 4 0 00-4-4H12a4 4 0 00-4 4m0 0h24a4 4 0 014 4v24m-12 4V8a4 4 0 014-4h16m0 0a4 4 0 014 4v24a4 4 0 01-4 4H8m0 0a4 4 0 00-4 4v-20"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-xs text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="comments" className="block text-xs font-medium text-gray-700">
                    Comments / Feedback
                  </label>
                  <textarea
                    name="comments"
                    id="comments"
                    rows="4"
                    className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-[#2384C1] text-white font-bold py-2 text-sm hover:bg-blue-700 transition-colors">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ValueTrade;
