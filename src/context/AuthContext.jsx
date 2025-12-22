import React, { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../utils/socket";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role,setRole] = useState(null);

  // 🔹 Restore session
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    const getRole = sessionStorage.getItem("role");

    if (storedUser && token && getRole) {
      setUser(JSON.parse(storedUser));
      setRole(getRole);
    }
    setLoading(false);
  }, []);

  // 🔹 SOCKET CONNECT + JOIN ROOM
useEffect(() => {
  if (!user?.id || !role) return;

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);

    socket.emit("join", {
      userId: user.id,
      role
    }, (res) => {
      console.log("Join ACK:", res);
    });
  });

  socket.on("notification", (data) => {
    console.log("NOTIFICATION RECEIVED:", data);
    alert(`${data.title}: ${data.message}`);
  });

  return () => {
    socket.off("connect");
    socket.off("notification");
  };
}, [user, role]);


  console.log(user);

  const login = (userData, token, role) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role)
    setUser(userData);
    setRole(role);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    socket.disconnect(); // 🔥 important
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
