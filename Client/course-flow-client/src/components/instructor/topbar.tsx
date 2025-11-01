import { Bell, Menu, Search, Settings } from "lucide-react";

export const Topbar: React.FC<{ onToggleSidebar?: () => void }> = ({
  onToggleSidebar,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={18} />
        </button>

        <div className="relative">
          <input
            className="pl-10 pr-4 py-2 rounded-lg border bg-white w-[420px] shadow-sm"
            placeholder="Search courses, students, orders..."
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Search size={16} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Bell size={18} />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Settings size={18} />
        </button>

        <div className="flex items-center gap-2 border rounded-full px-3 py-1 bg-white shadow-sm">
          <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-semibold">
            L
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-700">Lê Trường Sơn</div>
            <div className="text-xs text-gray-400">Instructor</div>
          </div>
        </div>
      </div>
    </div>
  );
};
