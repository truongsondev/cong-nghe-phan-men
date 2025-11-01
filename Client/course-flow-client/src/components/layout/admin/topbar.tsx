// components/layout/Topbar.tsx
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-white">
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-4">
        <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/40" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
