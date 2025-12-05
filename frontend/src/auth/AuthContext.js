import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const stored = localStorage.getItem("user");

  const [user, setUser] = useState(stored ? JSON.parse(stored) : null);

  const login = (data) => {
    const newUser = {
      id: data.user.id,
      username: data.user.username,
      role: data.user.role,
      token: data.token,       // Keep token inside user object (Option A)
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
