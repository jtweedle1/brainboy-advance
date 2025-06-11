import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (loginError) {
      setError("Invalid credentials");
    } else {
      alert("Logged in!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-green-100 border-4 border-green-900 text-green-950 font-mono rounded-lg shadow-lg">
      <h2 className="text-2xl text-center mb-6">Returning? Login!</h2>
      <div className="flex flex-col gap-4">
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
        <button onClick={handleLogin} className="mt-2 px-4 py-2 bg-green-900 text-green-100 border-2 border-green-800 hover:bg-green-800 transition-all duration-150">Log In</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
