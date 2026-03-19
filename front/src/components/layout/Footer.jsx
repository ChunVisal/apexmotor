// src/components/layout/Footer.jsx
import { 
  FaPhone, FaEnvelope, FaShieldAlt, FaExclamationTriangle,
  FaFileContract, FaQuestionCircle, FaCar, FaStore, FaComment,
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaAddressBook
} from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { RatingSummary } from "../common/Ratings";
import LogoProduct from "../../logo.png";
import { useAuth } from  "../../context/AuthContext"

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-gray-900 text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          <div className="">
            <img src={LogoProduct} className='w-14' alt="" />
            <p className="my-4 text-[12.5px]">
              Connecting car enthusiasts with trusted sellers. Your safe marketplace for buying and selling vehicles each other.
            </p>
            <RatingSummary />
          </div>

          <div className='text-[12.5px]'>
            <h4 className="text-white font-semibold text-sm mb-4">Transactions</h4>
            <ul className="space-y-2">
              {user &&
                  <Link to={"/sellcar"} className="flex items-center hover:text-white transition">
                  <FaCar className="mr-2 text-blue-400 text-xs" />
                  Sell Your Car
                </Link>
              }
              <Link to={"/cars"} className="flex items-center hover:text-white transition">
                <FaStore className="mr-2 text-blue-400 text-xs" />
                Find Cars
              </Link>
              <Link to={"/feedback"} className="flex items-center hover:text-white transition">
                <FaComment className='mr-2 text-blue-400 text-xs' />
                FeedBack
              </Link>
              <Link to={"/contact-us"} className="flex items-center hover:text-white transition">
                < FaAddressBook className='mr-2 text-blue-400 text-xs' />
                Contact US
              </Link>
            </ul>
          </div>

          <div className='text-[12.5px]'>
            <h4 className="text-white font-semibold text-sm mb-4">Safety & Support</h4>
            <ul className="space-y-2">
              <Link to={"/safety-tips"} className="flex items-center hover:text-white transition">
                <FaShieldAlt className="mr-2 text-blue-400 text-xs" />
                Safety Tips
              </Link>
              <Link to={"/avoid-scams"} className="flex items-center hover:text-white transition">
                <FaExclamationTriangle className="mr-2 text-blue-400 text-xs" />
                Avoid Scams
              </Link>
              <Link to={"/faqs"} className="flex items-center hover:text-white transition">
                <FaQuestionCircle className="mr-2 text-blue-400 text-xs" />
                FAQs
              </Link>
              <Link to={"/terms"} className="flex items-center hover:text-white transition">
                <FaFileContract className="mr-2 text-blue-400 text-xs" />
                Terms
              </Link>
            </ul>
          </div>

          <div className='text-[12.5px]'>
            <h4 className="text-white font-semibold text-sm mb-4">Connect With Us</h4>
            <div className="space-y-3 mb-6">
              <a href="mailto:support@apexmotor.com" className="flex items-center hover:text-white">
                <FaEnvelope className="mr-2 text-blue-400 text-xs" />
                <span>support@apexmotor.com</span>
              </a>
              <a href="tel:+8851234567890" className="flex items-center hover:text-white">
                <FaPhone className="mr-2 text-blue-400 text-xs" />
                <span>+885 888 093 342</span>
              </a>
            </div>

            <div className="mt-4">
              <p className="text-white mb-2">Get the app</p>
              <div className="flex space-x-2">
                <div className="flex gap-2">
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-700 rounded px-2 py-1"
                  >
                    <img
                      src="https://cdn.freebiesupply.com/logos/thumbs/2x/google-play-store-logo.png"
                      alt="Play Store"
                      className="h-5 w-auto mr-1"
                    />
                    <span className="text-white text-xs">Play Store</span>
                  </a>

                  <a
                    href="https://www.apple.com/app-store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-700 rounded px-2 py-1"
                  >
                    <img
                      src="https://1000logos.net/wp-content/uploads/2020/08/App-Store-Logo-2013.png"
                      alt="App Store"
                      className="h-5 w-auto mr-1"
                    />
                    <span className="text-white text-xs">App Store</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 my-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedinIn className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaYoutube className="w-4 h-4" />
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
            <span>@ 2025 ApexMotor Marketplace</span>
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-use" className="hover:text-white">Terms of Use</Link>
            <Link to="/cookie-policy" className="hover:text-white">Cookie Policy</Link>
            <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}