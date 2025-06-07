import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig"; // your firebase config file


export default function SignUpForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isChecked) {
      setError("You must agree to Terms and Conditions and Privacy Policy");
      return;
    }
    if (!fname.trim() || !lname.trim()) {
      setError("Please enter your first and last name");
      return;
    }
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      // You might want to update user profile with displayName here (optional)
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar p-6 max-w-md mx-auto">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
        Sign Up
      </h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Enter your email and password to sign up!
      </p>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">{error}</div>
      )}

      {success && (
        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded">
          Account created successfully! Please check your email to verify.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fname" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fname"
              name="fname"
              type="text"
              placeholder="Enter your first name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="lname" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lname"
              name="lname"
              type="text"
              placeholder="Enter your last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 text-sm border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.958 9.958 0 013.176-7.576m7.698 2.598A5.978 5.978 0 0112 7.5c3.313 0 6 2.687 6 6a5.978 5.978 0 01-1.5 4.23M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="terms"
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
            By creating an account you agree to the{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>.
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
