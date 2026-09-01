import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import AuthIntro from "../components/AuthIntro";
import { useState } from "react";
import ShowPassword from "../components/ShowPassword";

const Register = () => {
  const { loading, handleRegister } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ name, email, password });
    setName("");
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
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your fullname"
              />
            </div>

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
              Already have an account? <Link to={"/login"}>Login here</Link>
            </p>

            <button className="button primary-button">Register</button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Register;
