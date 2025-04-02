import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/session", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);

  const login = async (username, password) => {
    const res = await fetch("http://localhost:3000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include", // ส่ง cookie ไปกับ request
    });
    const data = await res.json();
    if (data.success) setUser(data.user);
    return data;
  };

  const logout = async () => {
    await fetch("http://localhost:3000/api/admin/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  return { user, login, logout };
}
