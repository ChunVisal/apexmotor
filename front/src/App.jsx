// src/App.jsx
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart";
import CarDetails from './pages/CarDetails';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";  
import Checkout from "./pages/Checkout";  
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import PasswordUpdated from "./pages/PasswordUpdated";
import About from "./pages/About";
import MyOrders from "./pages/MyOrders";
import ReceiptPage from "./pages/ReceiptPage";
import Inventory from "./pages/Inventory";
import SellYourCar from "./pages/Sellcar";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import ConfirmProfile from "./pages/ConfirmProfile";
import EditProfile from "./pages/EditProfile";
import SuccessSold from "./pages/SuccessSold";
import Sold from "./pages/Sold";
import useSessionScroll from './utils/useSessionScroll'; 
import ValueTrade from "./pages/ValueTrade";
import RateUs from "./components/layout/RateUsPopup";
import HowItWorks  from "./pages/HowItWorks";
import Settings from "./pages/Settings";
import useNetworkStatus from "./hooks/useNetworkStatus";
import Notifications from "./components/layout/Notifications";
import ReactGA from "react-ga4";
import ProtectedRoute from "./components/ProtectedRoute";

// HubInfo
import SafetyTips from "./pages/HubInfo/SafetyTips";
import AvoidScams from "./pages/HubInfo/AvoidScams";
import FAQs from "./pages/HubInfo/FAQs";
import Terms from "./pages/HubInfo/Terms";
import Feedback from "./pages/HubInfo/Feedback";
import ConteactUs from "./pages/HubInfo/ContactUs";
import PrivacyPolicy from "./pages/HubInfo/PrivacyPolicy";
import TermsOfUse from "./pages/HubInfo/TermsOfUse";
import CookiePolicy from "./pages/HubInfo/CookiePolicy";
import Sitemap from "./pages/HubInfo/Sitemap";

function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
  return null;
}

function App() {
  useSessionScroll();
  const location = useLocation();
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return <NotFound />;
  }

  // Pages that don't need Navbar/Footer
  const noLayoutPages = ["/confirm-profile"];

  const showLayout = !noLayoutPages.includes(location.pathname);

  return (
    <div id="app-scroll">
      {showLayout && <Navbar />} 
      <AnalyticsTracker />
      <RateUs/> 
      <main className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars" element={<Inventory />} />
          <Route path="/cars/:userId/:carId" element={<CarDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-updated" element={<PasswordUpdated />} />
          <Route path="/SuccessSold" element={<SuccessSold />} />
          <Route path="/valuetrade" element={<ValueTrade />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          {/* Hubinfo */}
          <Route path="/safety-tips" element={<SafetyTips />} />
          <Route path="/avoid-scams" element={<AvoidScams />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact-us" element={<ConteactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/public-profile/:userId" element={<PublicProfile />} />
          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/confirm-profile" element={<ProtectedRoute><ConfirmProfile /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/edit-car/:userId/:carId" element={<ProtectedRoute><SellYourCar /></ProtectedRoute>} />
           <Route path="/sellcar" element={<ProtectedRoute><SellYourCar /></ProtectedRoute>} />
          <Route path="/sold" element={<ProtectedRoute><Sold /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/receipt" element={<ProtectedRoute><ReceiptPage /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/notification" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        </Routes>
      </main>

      {showLayout && <Footer />} 
    </div>
  ); 
}

export default App;