import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const register = async ({ name, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });

    return response;
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
    throw err;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return response;
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
    throw err;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/api/auth/logout", {});

    return response;
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
    throw err;
  }
};

export const getProfile = async () => {
  const response = await api.get("/api/auth/profile");

  return response;
};
