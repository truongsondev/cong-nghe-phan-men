import { useEffect, useState, type FunctionComponent } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/auth-context";
import { Bell, MessageCircle, Moon, LogOut, UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import authenService from "@/services/authen.service";

interface HeaderPageProps {}

const HeaderPage: FunctionComponent<HeaderPageProps> = () => {
  const navigate = useNavigate();
  const { user, logout, authLoaded, isAuthenticated } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    // if (!authLoaded || !user?.id) return;
    // (async () => {
    //   const res = await authenService.checkRole(user.id);
    //   setRole(res.data.data);
    // })();
  }, [authLoaded, user?.id]);

  return (
    <header className="bg-white/60 backdrop-blur sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-extrabold tracking-tight">
            Course<span className="text-indigo-600">Flow</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
            <Link
              to="courses"
              smooth
              offset={-70}
              duration={500}
              className="hover:text-indigo-600 cursor-pointer"
            >
              Courses
            </Link>
            <Link
              to="categories"
              smooth
              offset={-70}
              duration={500}
              className="hover:text-indigo-600 cursor-pointer"
            >
              Categories
            </Link>
            <Link
              to="instructors"
              smooth
              offset={-70}
              duration={500}
              className="hover:text-indigo-600 cursor-pointer"
            >
              Instructors
            </Link>
            <Link
              to="blog"
              smooth
              offset={-70}
              duration={500}
              className="hover:text-indigo-600 cursor-pointer"
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  1
                </span>
              </button>

              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <Avatar className="w-9 h-9">
                      <AvatarImage
                        src={user.avt_url || "t1.png"}
                        alt={user.name ?? undefined}
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64 p-2">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar>
                      <AvatarImage src={user.avt_url || "t1.png"} />
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold">{user.name}</span>
                      <span className="text-xs text-gray-500">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => navigate("/user")}>
                    <UserCog className="mr-2 h-4 w-4" />
                    Quản lý tài khoản
                  </DropdownMenuItem>
                  {role === "instructor" && (
                    <DropdownMenuItem onClick={() => navigate("/instructor")}>
                      Quản lí khóa học
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem onClick={() => console.log("Toggle theme")}>
                    <Moon className="mr-2 h-4 w-4" />
                    Chế độ theme
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth/login")}
                className="hidden md:inline-block text-sm px-4 py-2 rounded-2xl border"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/auth/register")}
                className="text-sm px-4 py-2 rounded-2xl bg-indigo-600 text-white shadow-md"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
