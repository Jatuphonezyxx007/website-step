import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@heroui/alert";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignInForm({ onLogin = () => {} }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ ตรวจสอบว่าผู้ใช้ล็อกอินแล้วหรือยัง และป้องกัน loop
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && window.location.pathname === "/login") {
      setTimeout(() => {
        navigate("/dashboard");
      }, 0);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("ไม่สามารถเข้าสู่ระบบได้");
      }

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ บันทึกข้อมูลผู้ใช้
        onLogin(data.user);
        navigate("/dashboard"); // ✅ เปลี่ยนเส้นทางไป Dashboard
      } else {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("กรุณากรอกชื่อผู้ใช้ และรหัสผ่านให้ถูกต้อง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col flex-1">
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <Alert color="danger" title={error} />
        </div>
      )}
      <div className="w-full max-w-md pt-10 mx-auto">
        <h1 className="mb-4 text-xl font-bold">เข้าสู่ระบบ</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              </div>
            </div>
            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "กำลังเข้าสู่ระบบ..." : "Sign in"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
