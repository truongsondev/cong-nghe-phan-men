import {
  Activity,
  BarChart2,
  BookOpen,
  LogOut,
  Settings,
  Users,
} from "lucide-react";

export const Sidebar: React.FC<{
  active: string;
  setActive: (s: string) => void;
}> = ({ active, setActive }) => {
  const menu = [
    { key: "dashboard", label: "Dashboard", icon: <BarChart2 size={18} /> },
    { key: "courses", label: "Courses", icon: <BookOpen size={18} /> },
    { key: "students", label: "Students", icon: <Users size={18} /> },
    { key: "analytics", label: "Analytics", icon: <Activity size={18} /> },
    { key: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-72 bg-white border-r min-h-screen flex flex-col justify-between">
      <div>
        <div className="px-6 py-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold">
            F
          </div>
          <div>
            <div className="font-bold text-gray-800">Flup</div>
            <div className="text-xs text-gray-400">Instructor Panel</div>
          </div>
        </div>

        <nav className="px-3 space-y-1 mt-6">
          {menu.map((m) => (
            <div
              key={m.key}
              onClick={() => setActive(m.key)}
              className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg cursor-pointer ${
                active === m.key
                  ? "bg-green-50 border-l-4 border-green-500 text-green-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {m.icon}
              <span className="font-medium">{m.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
            L
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-800">
              Le Truong Son
            </div>
            <div className="text-xs text-gray-400">Instructor</div>
          </div>
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
