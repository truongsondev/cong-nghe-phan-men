import { motion } from "framer-motion";
import { MoreVertical, Search, Play } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "The Ultimate React Course 2025: React, Next.js, Redux & More",
    instructor: "Jonas Schmedtmann",
    thumbnail: "banner-2.jpg",
    progress: 6,
  },
  {
    id: 2,
    title: "The Complete dbt (Data Build Tool) Bootcamp: Zero to Hero",
    instructor: "Zoltan C. Toth, Miklos (Mike) Petridisz",
    thumbnail: "banner-2.jpg",
    progress: 38,
  },
  {
    id: 3,
    title: "React & TypeScript - The Practical Guide",
    instructor: "Maximilian Schwarzmüller",
    thumbnail: "banner-3.jpg",
    progress: 34,
  },
  {
    id: 4,
    title: "Build Responsive Real-World Websites with HTML and CSS",
    instructor: "Jonas Schmedtmann",
    thumbnail: "banner-4.jpg",
    progress: 0,
  },
];

export default function MyLearning() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-10 py-6">
        <h1 className="text-4xl font-bold mb-2">My learning</h1>
        <p className="text-sm">
          324hr 56min watched •{" "}
          <a href="#" className="underline hover:text-purple-300">
            View all activity
          </a>
        </p>
        <nav className="mt-6 flex gap-6 text-sm font-medium">
          {["All courses", "Certifications", "Archived", "Learning tools"].map(
            (tab, i) => (
              <a
                key={i}
                href="#"
                className={`pb-2 ${
                  i === 0
                    ? "border-b-2 border-purple-400 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tab}
              </a>
            )
          )}
        </nav>
      </header>

      <main className="px-10 py-8">
        <div className="bg-white border rounded-xl p-6 flex items-center justify-between mb-8 shadow-sm">
          <div>
            <h3 className="font-semibold mb-2">Schedule learning time</h3>
            <p className="text-gray-600 text-sm max-w-xl">
              Learning a little each day adds up. Research shows that students
              who make learning a habit are more likely to reach their goals.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
              Get started
            </button>
            <button className="px-4 py-2 border rounded-lg">Dismiss</button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <select className="px-3 py-2 border rounded-lg">
            <option>Recently Accessed</option>
            <option>Recently Added</option>
          </select>
          <select className="px-3 py-2 border rounded-lg">
            <option>Categories</option>
          </select>
          <select className="px-3 py-2 border rounded-lg">
            <option>Progress</option>
          </select>
          <select className="px-3 py-2 border rounded-lg">
            <option>Instructor</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" /> Assigned to me
          </label>
          <button className="text-purple-600 text-sm">Reset</button>
          <div className="ml-auto flex items-center border rounded-lg px-3 py-2">
            <input
              type="text"
              placeholder="Search my courses"
              className="outline-none w-48 text-sm"
            />
            <Search className="w-4 h-4 text-purple-600" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border rounded-xl overflow-hidden shadow-sm relative group cursor-pointer"
            >
              <div className="relative w-full h-36">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button className="w-12 h-12 flex items-center justify-center bg-white text-purple-600 rounded-full shadow-lg hover:scale-110 transition">
                    <Play className="w-6 h-6" fill="currentColor" />
                  </button>
                </div>
                <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <h2 className="text-sm font-semibold mb-1 line-clamp-2">
                  {course.title}
                </h2>
                <p className="text-xs text-gray-600 mb-3">
                  {course.instructor}
                </p>
                {course.progress > 0 ? (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {course.progress}% complete
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-gray-500">START COURSE</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
