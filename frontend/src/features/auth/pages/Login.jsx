import { Link } from "react-router";
import "../auth.form.scss";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import AuthIntro from "../components/AuthIntro";
import ShowPassword from "../components/ShowPassword";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    setEmail("");
    setPassword("");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="auth-content">
        <AuthIntro />
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group password-field">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <ShowPassword
                password={password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>

            <p>
              Dont have an account? <Link to={"/register"}>Register here</Link>
            </p>

            <button className="button primary-button">Login</button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Login;
