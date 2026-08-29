import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../auth.context.js";
import { getProfile } from "../services/auth.api.js";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const { setUser } = useContext(AuthContext);
  const [checkingSession, setCheckingSession] = useState(!user);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const response = await getProfile();
        setUser(response.data.data);
      } catch {
        setUser(null);
      } finally {
        setCheckingSession(false);
      }
    };

    if (!user) {
      restoreUser();
    }
  }, [setUser, user]);

  if (loading || checkingSession) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
