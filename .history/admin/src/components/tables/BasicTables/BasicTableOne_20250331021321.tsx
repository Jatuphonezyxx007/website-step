import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { useEffect, useState } from "react";

interface Admin {
  admin_id: number;
  admin_name: string;
  admin_lastname: string;
  admin_phone: string;
  admin_email: string;
  admin_user: string;
  admin_position: string;
  admin_img: string;
}

export default function AdminTable() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ใน BasicTableOne.tsx
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        console.log("Fetching admins data...");
        const response = await fetch("http://localhost:3000/api/admins");

        console.log("Response status:", response.status);
        const responseText = await response.text();
        console.log("Raw response:", responseText);

        try {
          const data = JSON.parse(responseText);
          console.log("Parsed data:", data);

          if (!data.success) {
            throw new Error(data.message || "Failed to fetch admin data");
          }

          setAdmins(data.admins);
        } catch (parseError) {
          throw new Error(
            `Invalid JSON response: ${responseText.substring(0, 100)}`
          );
        }
      } catch (err) {
        console.error("Error in fetchAdmins:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, ""); // ลบทุกอย่างที่ไม่ใช่ตัวเลข
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : phone;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        <p>Error loading admin data: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[720px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  พนักงาน
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ตำแหน่ง
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  เบอร์โทรศัพท์
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ชื่อผู้ใช้
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  การจัดการ
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {admins.map((admin) => (
                <TableRow key={admin.admin_id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={admin.admin_img}
                          alt={`${admin.admin_name} ${admin.admin_lastname}`}
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/user/default-avatar.png";
                          }}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {admin.admin_name} {admin.admin_lastname}
                        </span>
                        <a
                          href={`mailto:${admin.admin_email}`}
                          className="block text-blue-500 text-theme-xs dark:text-blue-400 hover:underline"
                        >
                          {admin.admin_email}
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {admin.admin_position}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm">
                    <a
                      href={`tel:${admin.admin_phone}`}
                      className="text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      {formatPhoneNumber(admin.admin_phone)}
                    </a>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {admin.admin_user}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge size="sm" color="error">
                      ลบ
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
