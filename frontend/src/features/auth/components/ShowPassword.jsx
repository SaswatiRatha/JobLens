const ShowPassword = ({ password, showPassword, setShowPassword }) => {
  return (
    <button
      type="button"
      className="toggle-password"
      disabled={password === ""}
      onClick={() => setShowPassword((prev) => !prev)}
    >
      {showPassword ? (
        <img
          src="https://img.icons8.com/?size=100&id=FThUtBIXcPnM&format=png&color=000000"
          alt="show"
        />
      ) : (
        <img
          src="https://img.icons8.com/?size=100&id=4y6r43dyjbzw&format=png&color=000000"
          alt="show"
        />
      )}
    </button>
  );
};

export default ShowPassword;
