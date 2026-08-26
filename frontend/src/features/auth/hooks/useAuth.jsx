import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../auth.context";
import { getProfile, login, logout, register } from "../services/auth.api.js";
import { useEffect } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.data);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ name, email, password });
      setUser(data.data);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const response = await getProfile();
        setUser(response.data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return { user, loading, handleLogin, handleRegister, handleLogout };
};

export default useAuth;
