import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle } from 'lucide-react'; // Using Lucide for a modern icon

export default function Disclaimer() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // Initialization logic remains the same
  useEffect(() => {
    // Only show the disclaimer once per localStorage clear
    const hasSeen = localStorage.getItem("seenDisclaimer");
    if (!hasSeen) setShow(true);
  }, []);

  const handleContinue = () => {
    localStorage.setItem("seenDisclaimer", "true");
    setShow(false);
    // Navigates to the home page upon clicking continue
    navigate("/");
  };

  if (!show) return null;

  return (
    // Fixed overlay with semi-transparent dark background to center the modal
    <div className="fixed inset-0 bg-black-50 z-50 flex justify-center items-center p-4">
      {/* Black Theme Modal Container */}
      <div className="bg-gray-900 rounded-sm shadow-2xl p-6 md:p-8 w-full max-w-lg text-center border border-gray-700 transform transition duration-300 scale-100 animate-in fade-in zoom-in-50">
        
        {/* Icon and Title */}
        <div className="flex flex-col items-center mb-4">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mb-3" />
            <h1 className="text-2xl font-bold text-white">
              Project Sandbox Notice
            </h1>
        </div>
        
        {/* Content */}
        <p className="text-gray-300 text-sm leading-relaxed">
          Welcome to <span className="font-bold text-yellow-400">ApexMotor.shop</span>. This platform is a dedicated 
          <span className="font-semibold"> student web development project</span> created by <span className="text-blue-400 font-semibold">Chun Visal (Joe Narthan)</span>.
        </p>

        <p className="text-gray-400 mb-3 leading-relaxed">
          This site is not a real e-commerce store. It is built strictly for 
          <span className="text-white"> educational and demonstration purposes only</span>, and involves no real financial transactions or services.
        </p>
        
        {/* Added the user-requested sentence about fun interaction */}
        <p className="text-gray-200 mb-5 leading-relaxed font-medium">
          **Please enjoy interacting with the application!** You are encouraged to create, modify, and delete data (e.g., in the cart or wish list) as part of exploring the full functionality.
        </p>

        <p className="text-gray-500 mb-6 leading-relaxed text-sm">
          The project is currently in active development 🚀.
        </p>
        
        {/* Continue Button - High contrast yellow */}
        <Link to="/"
          onClick={handleContinue}
          className="w-full inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold tracking-wide uppercase px-6 py-2 rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50 shadow-lg"
        >
          I Understand & Continue to Sandbox
        </Link>
      </div>
    </div>
  );
}