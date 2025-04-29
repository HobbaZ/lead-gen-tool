import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { emailRegex } from "./EmailRegex";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setMessage(`✅ Signup successful: ${userCredential.user.email}`);
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`❌ ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-96 mx-auto p-4 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border rounded px-3 py-2"
      />

      <div className="min-h-[1.5rem]">
        {email != "" && email.length > 0 && !email.match(emailRegex) ? (
          <p className="text-center text-red-500 text-sm p-0 m-0">
            Needs to be a valid email
          </p>
        ) : null}
      </div>

      <input
        type="password"
        placeholder="Password (min 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
        className="w-full border rounded px-3 py-2"
      />

      <div className="min-h-[1.5rem]">
        {password != "" && password.length < 8 ? (
          <p className="text-center text-red-500 text-sm">
            Password needs to be at least 8 characters
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={loading || password.length < 8 || !email.match(emailRegex)}
        className="w-full bg-green-600 text-white rounded py-2 hover:bg-green-700 transition disabled:bg-gray-600"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {message && (
        <p className="text-center text-sm text-gray-700">{message}</p>
      )}
    </form>
  );
};

export default SignupForm;
