// import { Link } from "@heroui/link";
// import { Snippet } from "@heroui/snippet";
// import { Code } from "@heroui/code";
// import { button as buttonStyles } from "@heroui/theme";

// import { siteConfig } from "@/config/site";
// import { title, subtitle } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";
// import DefaultLayout from "@/layouts/default";

// export default function IndexPage() {
//   return (
//     <DefaultLayout>
//       <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
//         <div className="inline-block max-w-lg text-center justify-center">
//           <span className={title()}>Make&nbsp;</span>
//           <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
//           <br />
//           <span className={title()}>
//             websites regardless of your design experience.
//           </span>
//           <div className={subtitle({ class: "mt-4" })}>
//             Beautiful, fast and modern React UI library.
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <Link
//             isExternal
//             className={buttonStyles({
//               color: "primary",
//               radius: "full",
//               variant: "shadow",
//             })}
//             href={siteConfig.links.docs}
//           >
//             Documentation
//           </Link>
//           <Link
//             isExternal
//             className={buttonStyles({ variant: "bordered", radius: "full" })}
//             href={siteConfig.links.github}
//           >
//             <GithubIcon size={20} />
//             GitHub
//           </Link>
//         </div>

//         <div className="mt-8">
//           <Snippet hideCopyButton hideSymbol variant="bordered">
//             <span>
//               Get started by editing{" "}
//               <Code color="primary">pages/index.tsx</Code>
//             </span>
//           </Snippet>
//         </div>
//       </section>
//     </DefaultLayout>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      setError('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="container-blox min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-lg shadow-2xl rounded-2xl bg-white border border-gray-200 p-8">
          <CardHeader className="text-center text-black">
            <h2 className="text-3xl font-bold">Admin Login</h2>
            {/* <p className="text-sm">กรุณาเข้าสู่ระบบเพื่อเข้าใช้งานแดชบอร์ด</p> */}
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardBody className="space-y-6">
              <Input
                label="ชื่อผู้ใช้"
                placeholder="กรอกชื่อผู้ใช้"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                variant="bordered"
                className="border-gray-300 bg-transparent rounded-lg w-full"
              />

              <div className="relative w-full">
                <Input
                  label="รหัสผ่าน"
                  placeholder="กรอกรหัสผ่าน"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  variant="bordered"
                  className="border-gray-300 bg-transparent rounded-lg w-full"
                  icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </CardBody>

            <CardFooter className="flex justify-center">
              <Button
                type="submit"
                color="primary"
                variant="shadow"
                radius="full"
                className="w-full text-lg shadow-lg"
              >
                เข้าสู่ระบบ
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
