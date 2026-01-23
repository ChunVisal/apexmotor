// src/pages/PasswordUpdated.jsx
import {Link} from "react-router-dom"

export default function PasswordUpdated() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-gray-800 text-2xl font-bold">Password updated ✅</h1>
        <p className="text-gray-600 mt-2">
          You can now sign in with your new password.
        </p>
        <Link to="/login" className="text-blue-600 mt-4 inline-block">
          Go to login
        </Link>
      </div>
    </div>
  );
}
