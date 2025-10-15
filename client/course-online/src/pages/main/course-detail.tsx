
import { Star, Users, Clock } from "lucide-react";
import LectureItem from "@/components/pages/lecture-item";
import SubCourse from "@/components/pages/sub-course";

const lectures = [
  { title: "Welcome", duration: "05:30" },
  { title: "How to use this course", duration: "08:10" },
  { title: "Course overview", duration: "06:20" },
];

export default function CourseDetail() {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight">
            React Fundamentals
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Learn the basics of React, from components to hooks, and start
            building modern web apps today.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
              <span className="text-gray-800 font-semibold ml-1">4.8</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>1,234 students</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>12h total</span>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Created by{" "}
            <span className="text-blue-600 font-medium hover:underline cursor-pointer">
              John Doe
            </span>
          </p>

          {/* Video Preview */}
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/xDfbUZ3WJOk"
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="border rounded-2xl p-6 shadow-lg bg-white space-y-6">
          <img
            src="/t1.png"
            alt="Course Thumbnail"
            className="w-full h-48 object-cover rounded-xl"
          />

          <div className="text-3xl font-bold text-gray-900">$49.99</div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition">
            Enroll Now
          </button>

          <ul className="text-sm text-gray-600 space-y-2">
            <li>✅ Lifetime access</li>
            <li>✅ Certificate of completion</li>
            <li>✅ Access on mobile and TV</li>
          </ul>
        </aside>
      </div>

      {/* Course Content */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        <div className="border rounded-2xl overflow-hidden divide-y">
          <details className="p-4 group">
            <summary className="cursor-pointer font-semibold group-hover:text-blue-600">
              Introduction (3 lectures • 20min)
            </summary>
            <ul className="mt-3 pl-4 text-sm text-gray-600 space-y-2">
              {lectures.map((item, index) => (
                <LectureItem
                  key={index}
                  title={item.title}
                  duration={item.duration}
                />
              ))}
            </ul>
          </details>

          <details className="p-4 group">
            <summary className="cursor-pointer font-semibold group-hover:text-blue-600">
              React Basics (5 lectures • 45min)
            </summary>
            <ul className="mt-3 pl-4 text-sm text-gray-600 space-y-2">
              {lectures.map((item, index) => (
                <LectureItem
                  key={index}
                  title={item.title}
                  duration={item.duration}
                />
              ))}
            </ul>
          </details>
        </div>
      </section>

      {/* Requirements */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Requirements</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Basic understanding of HTML, CSS, and JavaScript</li>
          <li>No prior React knowledge required</li>
        </ul>
      </section>

      {/* Description */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Description</h2>
        <p className="text-gray-600 leading-relaxed">
          This course will guide you through the fundamentals of React, starting
          with components, props, and state, all the way to hooks and advanced
          patterns. You’ll build hands-on projects to solidify your skills.
        </p>
      </section>

      {/* Related Courses */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <SubCourse key={id} id={id} />
          ))}
        </div>
      </section>
    </div>
  );
}
