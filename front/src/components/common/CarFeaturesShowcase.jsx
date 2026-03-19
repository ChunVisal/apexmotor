// src/components/common/CarFeaturesShowcase.jsx
import { FaTrophy, FaLock, FaCheckCircle, FaUserFriends } from 'react-icons/fa';
import { AverageRating } from "../../components/common/Ratings";

const CarFeaturesShowcase = ({ className }) => {
  const features = [
    { 
      icon: <FaTrophy size={12} className="text-white" />, 
      text: <AverageRating /> 
    },
    { 
      icon: <FaCheckCircle size={12} className="text-white" />, 
      text: 'Verified Listings' 
    },
    { 
      icon: <FaLock size={12} className="text-white" />, 
      text: 'Secure Payments' 
    },
    { 
      icon: <FaUserFriends size={12} className="text-white" />, 
      text: 'Direct Seller/Buyer' 
    },
  ];

  return (
    <div
      className={`flex gap-4 ${className} 
        [&>div]:text-[10px] 
        [&>div>div]:p-[6px] 
        sm:[&>div]:text-xs 
        sm:[&>div>div]:p-[10px]
      `}
    >
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-1 sm:gap-2">
          <div className="bg-white/10 rounded border border-white/20">
            {feature.icon}
          </div>
          <span className="text-white flex items-center">
            {feature.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CarFeaturesShowcase;
