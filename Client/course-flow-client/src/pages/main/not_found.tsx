import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        {/* Left: Illustration + Badge */}
        <div className="flex flex-col items-start gap-6">
          <div className="rounded-2xl bg-white/80 backdrop-blur-md p-4 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-lg font-semibold">
                404
              </div>
              <div>
                <p className="text-sm text-gray-500">Không tìm thấy trang</p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Trang bạn tìm không tồn tại
                </h2>
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Có thể đường dẫn bị sai, hoặc trang đã được di chuyển. Bạn có thể
            quay lại trang chủ hoặc tìm kiếm nội dung bạn cần.
          </p>

          <div className="w-full md:w-[420px]">
            <Card className="p-2">
              <CardContent className="flex items-center gap-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  aria-label="Tìm kiếm"
                  placeholder="Tìm khóa học, bài viết, hoặc trang..."
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                <Button asChild>
                  <Link to="/search">Tìm</Link>
                </Button>
              </CardContent>
            </Card>

            <div className="mt-4 flex gap-3">
              <Button variant="ghost" asChild>
                <Link to="/">Về trang chủ</Link>
              </Button>
              <Button asChild>
                <Link to="/courses">Xem khóa học</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Graphic / Hero visual */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* Decorative card */}
            <div className="rounded-3xl p-8 bg-gradient-to-tr from-white to-gray-50 shadow-2xl border border-gray-100">
              <svg viewBox="0 0 400 300" className="w-full h-56 md:h-72">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#FBCFE8" />
                    <stop offset="100%" stopColor="#F472B6" />
                  </linearGradient>
                </defs>
                <rect
                  x="10"
                  y="40"
                  width="380"
                  height="200"
                  rx="18"
                  fill="url(#g1)"
                  opacity="0.12"
                />
                <g transform="translate(30,30)">
                  <circle cx="120" cy="60" r="36" fill="#fff" opacity="0.7" />
                  <rect
                    x="-8"
                    y="120"
                    width="260"
                    height="14"
                    rx="6"
                    fill="#fff"
                    opacity="0.6"
                  />
                  <rect
                    x="10"
                    y="100"
                    width="200"
                    height="10"
                    rx="6"
                    fill="#fff"
                    opacity="0.6"
                  />
                </g>
              </svg>

              <div className="mt-6 text-sm text-gray-500">
                Mẹo: kiểm tra lại URL hoặc quay về trang trước. Nếu bạn nghĩ đây
                là lỗi, hãy liên hệ với bộ phận hỗ trợ.
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -left-6 -top-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-300 to-rose-400 blur-2xl opacity-40" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
