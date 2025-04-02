import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import Image from "../../components/ui/images/ResponsiveImage";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import FileInput from "../../components/form/input/FileInput";

export default function ProductForm() {
  const navigate = useNavigate();

  // State สำหรับฟอร์ม
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [position, setPosition] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  // ฟังก์ชันสำหรับส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ตรวจสอบความถูกต้องของข้อมูล
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !username ||
      !password ||
      !confirmPassword ||
      !position
    ) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      setError(null); // ซ่อน error กลางหน้า
      return;
    } else {
      setPasswordMismatch(false);
    }

    if (phoneNumber.length !== 10) {
      setError("หมายเลขโทรศัพท์ต้องมี 10 หลัก");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("admin_name", firstName);
      formData.append("admin_lastname", lastName);
      formData.append("admin_phone", phoneNumber);
      formData.append("admin_email", email);
      formData.append("admin_user", username);
      formData.append("admin_pwd", password);
      formData.append("admin_position", position);

      if (selectedImageFile) {
        formData.append("admin_img", selectedImageFile);
      }

      // แก้ไข URL ให้ตรงกับเซิร์ฟเวอร์
      const response = await fetch("http://localhost:3000/api/admin/add", {
        method: "POST",
        body: formData,
        // ไม่ต้องกำหนด Content-Type สำหรับ FormData จะถูกตั้งโดยอัตโนมัติ
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }

      const data = await response.json();

      // บันทึกสำเร็จ
      alert("บันทึกข้อมูลพนักงานเรียบร้อยแล้ว");
      navigate("/all-admin"); // เปลี่ยนเส้นทางไปยังหน้ารายการพนักงาน
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div>
      <PageMeta
        title="การจัดการผู้ใช้ | Step Solutions"
        description="ฟอร์มเพิ่มสินค้า"
      />
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="รูปภาพพนักงาน">
            {previewImage && <Image src={previewImage} />}
            <FileInput onChange={handleImageFileChange} />
          </ComponentCard>
        </div>
        <form onSubmit={handleSubmit}>
          <ComponentCard title="ข้อมูลพนักงาน">
            <div className="space-y-6">
              <div>
                <Label>ชื่อ - นามสกุล</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="ชื่อ"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    placeholder="นามสกุล"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>หมายเลขโทรศัพท์</Label>
                <Input
                  placeholder="หมายเลขโทรศัพท์"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  inputMode="numeric"
                  maxLength={10}
                />
              </div>

              <div>
                <Label>อีเมล</Label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputMode="email"
                />
              </div>

              <div>
                <Label>ตำแหน่ง</Label>
                <Input
                  placeholder="ตำแหน่ง (เช่น: ผู้ดูแลระบบ, ฝ่ายขาย)"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            </div>
          </ComponentCard>

          <br />

          <ComponentCard title="บัญชีผู้ใช้งานระบบ">
            <div className="space-y-6">
              <div>
                <Label>ชื่อผู้ใช้งาน (Username)</Label>
                <Input
                  placeholder="ชื่อผู้ใช้งาน"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <Label>รหัสผ่านและยืนยันรหัสผ่าน</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="รหัสผ่าน"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </span>
                  </div>

                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="ยืนยันรหัสผ่าน"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-10"
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </span>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </ComponentCard>

          <br />
          <div className="flex items-center justify-end gap-5">
            <Button type="submit" size="sm" variant="primary">
              บันทึกข้อมูล
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
