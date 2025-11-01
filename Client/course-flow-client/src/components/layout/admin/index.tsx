// components/layout/Layout.tsx
import { Outlet } from "react-router";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

export default function LayoutAdmin() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
