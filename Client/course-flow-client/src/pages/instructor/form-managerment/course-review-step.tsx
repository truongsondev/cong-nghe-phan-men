import type { UseFormReturn } from "react-hook-form";
import type { CourseFormType } from "./course-form";
import { createObjectURL } from "@/lib/utils";

function CourseReviewStep({
  formCourse,
}: {
  formCourse: UseFormReturn<CourseFormType>;
}) {
  const videoUrl = createObjectURL(formCourse.watch("videoUrl"));
  const thumbnailUrl = createObjectURL(formCourse.watch("thumbnailUrl"));

  return (
    <>
      <h4 className="font-semibold text-2xl text-indigo-700 mb-4">
        Review Course
      </h4>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6 max-h-[350px]">
        <div className="w-full h-56 relative">
          {formCourse.watch("videoUrl") ? (
            <video
              src={videoUrl}
              controls
              className="w-full h-56 object-cover rounded-2xl shadow-lg"
            />
          ) : formCourse.watch("thumbnailUrl") ? (
            <img
              src={thumbnailUrl}
              alt="Preview"
              className="w-full h-56 object-cover rounded-2xl shadow-lg"
            />
          ) : (
            <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
              No Media
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {formCourse.watch("title")}
          </h2>
          <p className="text-gray-600 mt-2">
            {formCourse.watch("description")}
          </p>
          <p className="text-indigo-600 mt-4 font-semibold">
            Price: ${formCourse.watch("price")}
          </p>
          <p className="text-sm text-gray-500">
            Status: {formCourse.watch("status")}
          </p>
        </div>

        <div className="space-y-4">
          {formCourse.watch("sessions")?.map((session, sIdx) => (
            <div
              key={sIdx}
              className="border rounded-xl p-4 shadow-sm bg-white/70"
            >
              <h3 className="font-bold text-lg text-indigo-700">
                {session.position}. {session.title}
              </h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
                {session.lessons?.map((lesson, lIdx) => (
                  <li key={lIdx}>
                    {lesson.position}. {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CourseReviewStep;
