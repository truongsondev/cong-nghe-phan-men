import type { FunctionComponent } from "react";

import type { CourseHomeResponse } from "@/dto/response/course.response.dto";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
interface courseProps {
  course: CourseHomeResponse;
}

export const Course: FunctionComponent<courseProps> = ({ course }) => {
  const navigate = useNavigate();
  return (
    <motion.article
      key={course.id}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md border hover:shadow-xl transition-shadow"
    >
      <div className="relative">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-44 object-cover"
        />
        <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
          {course.category}
        </div>
      </div>

      <div className="p-4">
        <div className="font-semibold line-clamp-2">{course.title}</div>
        {/* <div className="text-xs text-slate-500 mt-1">{course.user_id}</div> */}

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm font-semibold">{course.price}</div>
          <div className="text-xs text-slate-500">
            {course.avgRating} ★ • {course.status}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 text-sm py-2 rounded-lg border">
            Preview
          </button>
          <button
            onClick={() => {
              navigate("/course/" + course.id);
            }}
            className="flex-1 text-sm py-2 rounded-lg bg-indigo-600 text-white"
          >
            Enroll
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default Course;
