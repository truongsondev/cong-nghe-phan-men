// components/layout/Sidebar.tsx
import {
  Home,
  Users,
  BookOpen,
  Shield,
  Settings,
  BarChart,
} from "lucide-react";

const menu = [
  { icon: Home, label: "Dashboard" },
  { icon: Users, label: "Người dùng" },
  { icon: BookOpen, label: "Khóa học" },
  { icon: Shield, label: "Reviewer" },
  { icon: BarChart, label: "Báo cáo" },
  { icon: Settings, label: "Cấu hình" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col">
      <div className="p-4 font-bold text-xl">Course</div>
      <nav className="flex-1 px-2 space-y-1">
        {menu.map((item, i) => (
          <button
            key={i}
            className="flex items-center w-full gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t text-sm text-gray-500">© 2025 EduAdmin</div>
    </aside>
  );
}
