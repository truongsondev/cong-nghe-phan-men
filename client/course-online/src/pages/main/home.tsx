import { type JSX } from "react";
import { motion } from "framer-motion";
import CategoryPage from "@/components/pages/category";

type Course = {
  id: number;
  title: string;
  author: string;
  price: string;
  rating: number;
  students: string;
  cover: string;
  tags: string[];
};

import type { CourseHomeResponse } from "@/dto/response/course.response.dto";
import Course from "@/components/pages/course";

export const sampleCourses: CourseHomeResponse[] = [
  {
    course_id: 1,
    title: "Fullstack React & Node: From Zero to Production",
    description:
      "Học cách xây dựng ứng dụng fullstack với React, Node.js và triển khai lên production.",
    thumbnail_url: "https://picsum.photos/seed/course1/600/400",
    price: 59,
    level: "Intermediate",
    category: "Development",
    created_at: new Date("2024-01-10"),
    updated_at: new Date("2024-02-15"),
    avg_rating: 4.8,
    tags: ["React", "Node", "Fullstack"],
  },
  {
    course_id: 2,
    title: "UI/UX Design Bootcamp: Figma to Prototype",
    description:
      "Thực hành thiết kế UI/UX với Figma và xây dựng prototype hoàn chỉnh.",
    thumbnail_url: "https://picsum.photos/seed/course2/600/400",
    price: 39,
    level: "Beginner",
    category: "Development",

    created_at: new Date("2024-03-05"),
    updated_at: new Date("2024-03-10"),

    avg_rating: 4.7,
    tags: ["Design", "Figma"], // 👈
  },
  {
    course_id: 3,
    title: "Data Structures & Algorithms in TypeScript",
    description:
      "Nắm vững cấu trúc dữ liệu và thuật toán với TypeScript thông qua ví dụ thực tế.",
    thumbnail_url: "https://picsum.photos/seed/course3/600/400",
    price: 49,
    level: "Advanced",
    category: "Development",

    created_at: new Date("2024-04-01"),
    updated_at: new Date("2024-04-12"),

    avg_rating: 4.9,
    tags: ["Algorithms", "TypeScript"], // 👈
  },
  {
    course_id: 4,
    title: "DevOps Essentials: Docker & Kubernetes",
    description: "Khóa học DevOps cơ bản giúp bạn làm chủ Docker & Kubernetes.",
    thumbnail_url: "https://picsum.photos/seed/course4/600/400",
    price: 45,
    level: "Intermediate",
    category: "Development",

    created_at: new Date("2024-05-20"),
    updated_at: new Date("2024-06-01"),

    avg_rating: 4.6,
    tags: ["DevOps", "Docker", "Kubernetes"], // 👈
  },
];

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-white to-pink-50"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500"
            >
              Intensive online learning
              <br />
              <span className="text-slate-800">
                Build skill, achieve the goal
              </span>
            </motion.h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              Practical courses, experienced instructors, up-to-date content.
              From programming to design to DevOps — learn anytime, anywhere.
            </p>

            <div className="mt-8 flex gap-3 items-center">
              <div className="flex-1 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 border border-slate-200">
                <input
                  className="flex-1 outline-none text-sm"
                  placeholder="Tìm khóa học: React, Design, DevOps..."
                  aria-label="search"
                />
                <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm shadow hover:bg-indigo-700 transition">
                  Tìm
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center font-semibold text-indigo-600">
                  ★
                </div>
                <div>
                  <div className="text-base font-semibold">4.8/5</div>
                  <div className="text-xs">Trung bình học viên</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center font-semibold text-pink-600">
                  👩‍🏫
                </div>
                <div>
                  <div className="text-base font-semibold">+120 giảng viên</div>
                  <div className="text-xs">Chuyên gia trong ngành</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://picsum.photos/seed/hero/900/600"
                alt="Hero"
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-2xl shadow-lg p-4 w-72">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Featured lock</div>
                  <div className="font-semibold">
                    React Pro: Build Real Projects
                  </div>
                </div>
                <div className="text-sm text-indigo-600 font-semibold">$39</div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-slate-600">
                <div>12 bài học</div>
                <div>3 giờ</div>
                <div>Intermediate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CategoryPage />

      <section id="courses" className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Khóa học nổi bật</h3>
          <div className="text-sm text-slate-600">Xem tất cả</div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleCourses.map((course) => (
            <Course course={course} />
          ))}
        </div>
      </section>

      <section id="instructors" className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold">Vì sao chọn chúng tôi</h3>
            <p className="mt-3 text-slate-600 max-w-lg">
              Nội dung thực tế, trợ giảng hỗ trợ 1:1, cộng đồng, đánh giá chất
              lượng và cấp chứng chỉ.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-3">
              {[
                "Bài tập thực tế và project",
                "Giảng viên từ doanh nghiệp",
                "Hỗ trợ cộng đồng & mentor",
              ].map((t) => (
                <li
                  key={t}
                  className="bg-white p-4 rounded-2xl shadow flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    ✓
                  </div>
                  <div>
                    <div className="font-medium">{t}</div>
                    <div className="text-xs text-slate-500">
                      Chi tiết ngắn mô tả lợi ích.
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img
                      src={`https://picsum.photos/seed/inst${i}/80/80`}
                      alt="inst"
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium">Giảng viên {i + 1}</div>
                      <div className="text-xs text-slate-500">Chuyên môn</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <h3 className="text-2xl font-semibold">Cảm nhận học viên</h3>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Hà", text: "Khóa học giúp tôi apply vào công ty tốt." },
            {
              name: "Quân",
              text: "Giảng viên tận tâm, bài tập sát với thực tế.",
            },
            { name: "Mai", text: "Tôi tiến bộ rõ rệt sau 2 tháng học." },
          ].map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow">
              <div className="text-slate-600">“{t.text}”</div>
              <div className="mt-4 font-medium">— {t.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
