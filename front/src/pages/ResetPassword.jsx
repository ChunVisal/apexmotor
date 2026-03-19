import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const oobCode = params.get("oobCode");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async (e) => {  
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!oobCode) {
      setError("Invalid or missing reset token.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess("Password reset successful 🎉");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Reset link expired or invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 font-sans">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Set New Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose a strong password to keep your account secure.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleReset} className="mt-8 space-y-5">
          {/* New Password Input */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              required
              value={password}
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-4">
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-[#2384C1] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-400 transition-all active:scale-[0.98] shadow-md"
            >
              Update Password
            </button>

            {/* Skip Option */}
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => console.log("Skipped")}
                className="text-sm font-medium text-gray-500 hover:text-gray-800 hover:underline transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        </form>

        {/* Security Note */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <p className="text-center text-xs text-gray-400">
            Tip: Use at least 8 characters with a mix of letters and numbers.
          </p>
        </div>
      </div>
    </div>
  );
}
