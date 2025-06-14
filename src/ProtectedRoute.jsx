import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "./lib/supabaseClient";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      if (!session) {
        navigate("/");
      }
    };

    getSession();
  }, [navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return children;
}