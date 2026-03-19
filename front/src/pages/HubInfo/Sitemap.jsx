import { Link } from 'react-router-dom';
import {
  Map, Home, Car, Phone, Shield, FileText, Cookie,
  User, ShoppingCart, Heart, Wrench, 
  Megaphone, LifeBuoy, HelpCircle, Handshake, Tag, DollarSign, List,
} from 'lucide-react';

const Sitemap = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-center mb-6">
        <Map size={38} className="text-gray-800 mr-4" />
        <h1 className="text-2xl font-bold text-gray-800">Sitemap</h1>
      </div>
      <p className="text-gray-700 text-[12.5px] leading-relaxed mb-6 border-b pb-4">
        This sitemap provides a comprehensive overview of all the main pages on ApexMotor, helping you navigate our platform easily.
      </p>

      <ul className="space-y-6 text-gray-700">
        <li>
          <h2 className="text-sm font-semibold mb-2">General Navigation</h2>
          <ul className="list-disc pl-5 space-y-2 text-[12.5px]">
            <li>
              <Link to="/" className="text-[#2384C1] hover:underline">
                <Home size={16} className="inline-block mr-1" /> Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-[#2384C1] hover:underline">
                <LifeBuoy size={16} className="inline-block mr-1" /> About Us
              </Link>
            </li>
            <li>
              <Link to="/cars" className="text-[#2384C1] hover:underline">
                <Car size={16} className="inline-block mr-1" /> Inventory
              </Link>
            </li>
            <li>
              <Link to="/valuetrade" className="text-[#2384C1] hover:underline">
                <Tag size={16} className="inline-block mr-1" /> Value Your Trade
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="text-[#2384C1] hover:underline">
                <Handshake size={16} className="inline-block mr-1" /> How It Works
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="text-[#2384C1] hover:underline">
                <Phone size={16} className="inline-block mr-1" /> Contact Us
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="text-[#2384C1] hover:underline">
                <Megaphone size={16} className="inline-block mr-1" /> Feedback
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <h2 className="text-sm font-semibold mb-2">Legal & Policy</h2>
          <ul className="list-disc pl-5 space-y-2 text-[12.5px]">
            <li>
              <Link to="/safety-tips" className="text-[#2384C1] hover:underline">
                <Shield size={16} className="inline-block mr-1" /> Safety Tips
              </Link>
            </li>
            <li>
              <Link to="/avoid-scams" className="text-[#2384C1] hover:underline">
                <HelpCircle size={16} className="inline-block mr-1" /> Avoid Scams
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="text-[#2384C1] hover:underline">
                <HelpCircle size={16} className="inline-block mr-1" /> FAQs
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-[#2384C1] hover:underline">
                <FileText size={16} className="inline-block mr-1" /> Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-[#2384C1] hover:underline">
                <Shield size={16} className="inline-block mr-1" /> Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-use" className="text-[#2384C1] hover:underline">
                <FileText size={16} className="inline-block mr-1" /> Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/cookie-policy" className="text-[#2384C1] hover:underline">
                <Cookie size={16} className="inline-block mr-1" /> Cookie Policy
              </Link>
            </li>
            <li>
              <Link to="/sitemap" className="text-[#2384C1] hover:underline">
                <Map size={16} className="inline-block mr-1" /> Sitemap
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <h2 className="text-sm font-semibold mb-2">Account & Marketplace</h2>
          <ul className="list-disc pl-5 space-y-2 text-[12.5px]">
            <li>
              <Link to="/profile" className="text-[#2384C1] hover:underline">
                <User size={16} className="inline-block mr-1" /> Profile
              </Link>
            </li>
            <li>
              <Link to="/sold" className="text-[#2384C1] hover:underline">
                <Car size={16} className="inline-block mr-1" /> Cars Sold
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-[#2384C1] hover:underline">
                <ShoppingCart size={16} className="inline-block mr-1" /> Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="text-[#2384C1] hover:underline">
                <Heart size={16} className="inline-block mr-1" /> Wishlist
              </Link>
            </li>
            <li>
              <Link to="/orders" className="text-[#2384C1] hover:underline">
                <List size={16} className="inline-block mr-1" /> My Orders
              </Link>
            </li>
            <li>
              <Link to="/sellcar" className="text-[#2384C1] hover:underline">
                <DollarSign size={16} className="inline-block mr-1" /> Sell Your Car
              </Link>
            </li>
            <li>
              <Link to="/settings" className="text-[#2384C1] hover:underline">
                <Wrench size={16} className="inline-block mr-1" /> Settings
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sitemap;
