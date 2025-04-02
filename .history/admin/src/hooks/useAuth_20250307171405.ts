import { useState, useEffect } from "react";
import axios from "axios";

export interface AdminUser {
  id: number;
  username: string;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  position: string;
  image: string;
}

export function useAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/admin/session");
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("🚨 Error fetching session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post("/api/admin/logout");
      setUser(null);
    } catch (error) {
      console.error("🚨 Logout error:", error);
    }
  };

  return { user, loading, logout };
}
