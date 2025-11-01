import Course from "./course";
import { TITLE_IN_COURSE } from "@/constants/text-display";
import { MyPagination } from "./pagination";
import type { CourseHomeResponse } from "@/dto/response/course.response.dto";
import type React from "react";
interface ListCoursesProps {
  courses: CourseHomeResponse[];
}

const ListCourses: React.FC<ListCoursesProps> = ({ courses }) => {
  return (
    <div className="w-full bg-white px-4 m-auto flex flex-col gap-10">
      <div className="bg-white shadow-lg py-2 w-full hidden sm:block">
        <span className="text-2xl font-bold ">{TITLE_IN_COURSE}</span>
      </div>
      <div className="flex flex-wrap items-start gap-4 max-sm:justify-center">
        <Course courses={courses} />
      </div>
      {courses && courses.length > 0 && <MyPagination />}
    </div>
  );
};

export default ListCourses;
