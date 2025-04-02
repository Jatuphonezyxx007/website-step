// src/TestAlert.jsx
import React from 'react';
import { Alert } from '@heroui/react';

export default function TestAlert() {
  return (
    <div style={{ padding: '20px' }}>
      <Alert color="danger" title="ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" />
    </div>
  );
}
