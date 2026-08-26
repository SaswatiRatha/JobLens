import useAuth from "../../auth/hooks/useAuth";

const Home = () => {
  const { user, handleLogout, loading } = useAuth();

  return (
    <main>
      <h1>Welcome, {user.name}</h1>
      <p>You are logged in as {user.email}.</p>
      <button type="button" onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>
    </main>
  );
};

export default Home;
