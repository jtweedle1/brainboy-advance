import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-700 text-white border-2 border-red-900 hover:bg-red-800 transition-all duration-150"
    >
      Log Out
    </button>
  );
}