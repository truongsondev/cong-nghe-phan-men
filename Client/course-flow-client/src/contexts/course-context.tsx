import type { CourseReponse } from "@/dto/response/course.response.dto";
import { createContext, useContext, useState, type ReactNode } from "react";

interface CourseContextType {
  course: CourseReponse | null;
  setCourse: (courses: CourseReponse | null) => void;
}

const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [course, setCoursesState] = useState<CourseReponse | null>(() => {
    const saved = localStorage.getItem("course");
    return saved ? JSON.parse(saved) : null;
  });

  const setCourse = (course: CourseReponse | null) => {
    setCoursesState(course);
    if (course) localStorage.setItem("course", JSON.stringify(course));
    else localStorage.removeItem("course");
  };

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used within CourseProvider");
  return ctx;
};
