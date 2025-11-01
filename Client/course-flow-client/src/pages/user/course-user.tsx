import { CheckCircle, PlayCircle } from "lucide-react";

export default function CoursesOfUser() {
  const courses = [
    {
      title: "React Cơ bản",
      status: "Hoàn thành",
      progress: 100,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
    {
      title: "Node.js Nâng cao",
      status: "Đang học",
      progress: 45,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    },
  ];

  return (
    <div className="grid gap-4">
      {courses.map((course, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 bg-white shadow rounded-xl border hover:shadow-lg transition"
        >
          {/* Thumbnail */}
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-16 h-16 rounded-lg object-contain bg-gray-50 p-2"
          />

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{course.title}</h3>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div
                className={`h-2 rounded-full ${
                  course.progress === 100 ? "bg-green-500" : "bg-blue-500"
                }`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Tiến độ: {course.progress}%
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1 text-sm">
            {course.progress === 100 ? (
              <span className="flex items-center gap-1 text-green-600 font-medium">
                <CheckCircle className="w-4 h-4" /> {course.status}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-blue-600 font-medium">
                <PlayCircle className="w-4 h-4" /> {course.status}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
