import { useEffect, useState, type JSX } from "react";
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

import Course from "@/components/pages/course";
import type {
  CategoriesResponse,
  CourseHomeResponse,
} from "@/dto/response/course.response.dto";
import courseService from "@/services/course.service";

export default function HomePage(): JSX.Element {
  const [courses, setCourses] = useState<CourseHomeResponse[]>([]);
  const [category, setCategory] = useState<CategoriesResponse[]>([]);
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCourse(), fetchCategory()]);
    };
    const fetchCourse = async () => {
      const res = await courseService.getCourse(4);
      setCourses(res.data.data);
    };
    const fetchCategory = async () => {
      const res = await courseService.getAllCategories();
      if (res.data.data.length <= 6) {
        setCategory(res.data.data);
      }
      const data = res.data.data.slice(0, 6);
      setCategory(data);
    };
    fetchData();
  }, []);

  const searchCourse = async () => {
    try {
      const res = await courseService.searchCourse(search);
      console.log(res.data.data);
      setCourses(res.data.data);
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  onClick={searchCourse}
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm shadow hover:bg-indigo-700 transition"
                >
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
                  <div className="text-xs">Average student</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center font-semibold text-pink-600">
                  👩‍🏫
                </div>
                <div>
                  <div className="text-base font-semibold">+120 instructor</div>
                  <div className="text-xs">Industry expert</div>
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
                <div>12 lession</div>
                <div>3 hourse</div>
                <div>Intermediate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CategoryPage categories={category} />

      <section id="courses" className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Outstanding courses</h3>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses &&
            courses.length > 0 &&
            courses.map((course) => <Course course={course} />)}
          {!courses ||
            (courses.length <= 0 && (
              <div className="">No course for this time</div>
            ))}
        </div>
      </section>

      <section id="instructors" className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold">Why choose we</h3>
            <p className="mt-3 text-slate-600 max-w-lg">
              Practical content, 1:1 tutor support, community, quality
              assessment and certification.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-3">
              {[
                "Practical exercises and projects",
                "Industry instructors",
                "Community support & mentors",
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
                      <div className="font-medium">Instructor {i + 1}</div>
                      <div className="text-xs text-slate-500">Expertise</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
