"use client";

import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-900">{children}</main>
    </div>
  );
} 