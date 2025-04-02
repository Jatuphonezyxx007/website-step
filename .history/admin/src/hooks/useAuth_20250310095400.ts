import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ฟังก์ชันเข้าสู่ระบบ
  const login = async (username, password) => {
    try {
      const res = await axios.post("/api/admin/login", { username, password });
      if (res.data.success) {
        setUser(res.data.user); // ✅ เก็บข้อมูล user
        localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ บันทึกใน localStorage
      }
      return res.data;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  // โหลด user จาก localStorage เมื่อรีเฟรชหน้าเว็บ
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ฟังก์ชันออกจากระบบ
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
