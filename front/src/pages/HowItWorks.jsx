import { FaCarSide, FaHandshake, FaFileSignature } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaCarSide className="text-primary w-10 h-10" />,
      title: "1. List Your Car",
      desc: "Upload your car details, set your price, and make it visible to buyers instantly.",
    },
    {
      icon: <FaHandshake className="text-primary w-10 h-10" />,
      title: "2. Connect with Buyers",
      desc: "Buyers browse cars, compare options, and contact you directly to negotiate.",
    },
    {
      icon: <FaFileSignature className="text-primary w-10 h-10" />,
      title: "3. Deal & Transfer",
      desc: "Finalize the sale, transfer ownership, and complete the paperwork hassle-free.",
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-16 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-600 mb-12">
          Selling and buying cars made simple in just 3 steps.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
