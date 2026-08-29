import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../auth.context.js";
import { login, logout, register } from "../services/auth.api.js";

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

  return { user, loading, handleLogin, handleRegister, handleLogout };
};

export default useAuth;
