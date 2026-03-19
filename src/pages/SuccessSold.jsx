// src/pages/SuccessSold.jsx
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  // We're expecting a 'user' and 'car' object in the state
  const { user, car } = location.state || {};

  // Check if we have data to display before rendering
  if (!car) {
    return (
      <section className="max-w-2xl mx-auto m-5 text-gray-900 p-6 bg-red-50 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-red-700 mb-4">
          ❌ Error Loading Car Data
        </h1>
        <p>
          Car data could not be found. Please return to the previous page and try again.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto m-5 text-gray-900 p-6 bg-green-50 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        ✅ Car Submitted Successfully!
      </h1>
      {user && user.email && (
        <p className="mb-2">
          Thank you <span className="font-semibold">{user.email}</span> for submitting your car.
        </p>
      )}

      {/* The car object is guaranteed to be present at this point */}
      <div className="mt-4 p-4 rounded bg-white shadow-sm">
        <h2 className="text-lg font-bold">{car.name} {car.model}</h2>
        <p>Year: {car.year}</p>
        <p>Price: ${car.price}</p>
        <p>Location: {car.location ? `${car.location[0].toFixed(5)}, ${car.location[1].toFixed(5)}` : "Not specified"}</p>
        <p>Description: {car.description}</p>
      </div>
    </section>
  );
};

export default Success;
