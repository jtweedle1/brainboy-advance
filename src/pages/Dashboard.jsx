import { useAuth } from "../contexts/AuthContext";
import "./Dashboard.css";
import LogoutButton from "../components/Dashboard/LogoutButton";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { user, loading, profile } = useAuth();
  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in</p>;

  return (
    <div>
      <h1>Welcome, {profile.username}!</h1>
      <div className="dashboard-button">
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => navigate('/new-quest')}>New quest</button>
        <LogoutButton />
      </div>
    </div>
  );
}
