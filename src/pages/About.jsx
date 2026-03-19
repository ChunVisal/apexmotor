
import { Link } from 'react-router-dom';
import { useState } from "react";

export default function About() {
    const [showMore, setShowMore] = useState(false);
    
    return (
        <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">About ApexMotor</h1>
        <p className="mb-4">
            ApexMotor is your premier destination for high-performance vehicles. We specialize in providing a curated selection of the most exciting and powerful cars on the market.
        </p>
        {showMore && (
            <p className="mb-4">
            Our mission is to connect car enthusiasts with their dream vehicles, offering a seamless shopping experience and expert advice. Whether you're looking for a sports car, luxury sedan, or an SUV, we have something for everyone.
            </p>
        )}
        <button
            onClick={() => setShowMore(!showMore)}
            className="text-blue-600 hover:underline"
        >
            {showMore ? 'Show Less' : 'Read More'}
        </button>
        <div className="mt-6">
            <Link to="/" className="text-blue-600 hover:underline">
            Back to Home
            </Link>
        </div>
        </div>
    );
    }