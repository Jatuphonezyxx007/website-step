import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// 🔥 กำหนด type ของข้อมูล admin
interface AdminUser {
  admin_id: number;
  admin_name: string;
  admin_lastname: string;
  admin_phone: string;
  admin_email: string;
  admin_user: string;
  admin_position: string;
  admin_img: string;
}

// 🔥 กำหนด type ของ context
interface AuthContextType {
  user: AdminUser | null;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

// ✅ ใช้ `as` เพื่อให้ TypeScript เข้าใจค่าที่เริ่มต้น
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);

  // ✅ ฟังก์ชันเข้าสู่ระบบ
  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post("/api/admin/login", { username, password });
      if (res.data.success) {
        setUser(res.data.user); // ✅ บันทึกข้อมูล user
        localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ บันทึกลง localStorage
      }
      return res.data;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  // ✅ โหลด user จาก localStorage เมื่อรีเฟรชหน้าเว็บ
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ ฟังก์ชันออกจากระบบ
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout } as AuthContextType}>  {/* ✅ ใช้ `as AuthContextType` */}
      {children}
    </AuthContext.Provider>
  );
}

// ✅ ใช้ Hook `useAuth()` ใน component อื่น ๆ
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth ต้องใช้ภายใน AuthProvider");
  }
  return context;
}
