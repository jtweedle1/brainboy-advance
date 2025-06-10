import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    // Get email from username (to login with username)
    const { data, error: lookupError } = await supabase
      .from("profiles")
      .select("user_id, username, user:auth.users(email)")
      .eq("username", username)
      .single();

    if (lookupError || !data?.user?.email) {
      return setError("Username not found");
    }
    const email = data.user.email;

    // Actually sign in with the email and password
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (loginError) {
      setError("Invalid credentials");
    } else {
      alert("Logged in!");
    }
  };

  return (
    <div>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
