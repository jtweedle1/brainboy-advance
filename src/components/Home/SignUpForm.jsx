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
    <div>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
