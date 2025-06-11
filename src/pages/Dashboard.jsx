import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, loading, profile } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in</p>;

  return (
    <div>
      <h1>Welcome, {profile.username}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
