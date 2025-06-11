import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    setError(null);
    if (!email || !username || !password) {
      return setError("All fields are required");
    }
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );
    if (signUpError) return setError(signUpError.message);
    const session = signUpData?.session;
    const user = signUpData?.user;
    if (!session || !user) {
      return setError(
        "Check your email to confirm your account before continuing."
      );
    }
    if (session) {
      await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
    }
    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !currentUser) {
      return setError("Unable to authenticate after sign-up.");
    }
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ username })
      .eq("user_id", currentUser.id);
    if (profileError) {
      console.error("Profile insert error:", profileError);
      return setError("Failed to create profile. Please try again.");
    }
    alert("Account created!");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-green-100 border-4 border-green-900 text-green-950 font-mono rounded-lg shadow-lg">
      <h2 className="text-2xl text-center mb-6">Create New Account</h2>
      <div className="flex flex-col gap-4">
        <input
          className="px-3 py-2 border-2 border-green-800 bg-green-50 text-green-900 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="px-3 py-2 border-2 border-green-800 bg-green-50 text-green-900 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-3 py-2 border-2 border-green-800 bg-green-50 text-green-900 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="mt-2 px-4 py-2 bg-green-900 text-green-100 border-2 border-green-800 hover:bg-green-800 transition-all duration-150"
        >
          Sign Up
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
