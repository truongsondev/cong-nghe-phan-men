import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Pencil, Eye, Users, BarChart2 } from "lucide-react";
import {
  NewCourseWizard,
  type CourseFormType,
} from "./form-managerment/course-form";
import type { CourseInstructorResponse } from "@/dto/response/course.response.dto";
import { passStringToJson } from "@/lib/utils";
import _ from "lodash";
import courseService from "@/services/course.service";
import { toast } from "sonner";
import { ACTION } from "@/constants/action";
import {
  EditCourseForm,
  type CourseFormTypeEdit,
} from "./edit-course/course-form-edit";
import { useCourseModals } from "@/hooks/useCourseModals";
import { getVideoDuration } from "@/components/utils/util";
type Course = CourseInstructorResponse;
const statusColors: Record<Course["status"], string> = {
  published: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  draft: "bg-gray-100 text-gray-600",
};

export const CoursesPage: React.FC<{ courses: CourseInstructorResponse[] }> = ({
  courses,
}) => {
  const [open, setOpen] = useState(false);

  const { action, courseId, openModal, closeModal } = useCourseModals();

  useEffect(() => {
    if (
      action === ACTION.CREATE ||
      action === ACTION.EDIT ||
      action === ACTION.DELETE ||
      action === ACTION.PREVIEW
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [action, courseId]);

  const initFormData = async (data: CourseFormTypeEdit | CourseFormType) => {
    const user = localStorage.getItem("user");
    const userObj = passStringToJson(user);
    const formData = new FormData();
    const meta = {
      idCourse: (data as CourseFormTypeEdit).id || "0",
      title: data.title,
      description: data.description,
      category_id: data.category_id,
      price: data.price,
      status: data.status,
      instructorId: userObj?.id || 0,
      requirements: data.requirements,
      sessions: data.sessions.map((session) => ({
        title: session.title,
        position: session.position,
        lessons: session.lessons.map((lesson) => ({
          title: lesson.title,
          position: lesson.position,
          doc_url: lesson.doc_url,
          video_url: lesson.video_url,
          duration: 0,
        })),
      })),
    };

    for (let i = 0; i < data.sessions.length; i++) {
      const session = data.sessions[i];
      for (let j = 0; j < session.lessons.length; j++) {
        const lesson = session.lessons[j];

        if (lesson.video_url) {
          const durationLesson = await getVideoDuration(lesson.video_url);
          console.log("durationLesson:::", durationLesson);
          meta.sessions[i].lessons[j].duration = durationLesson;

          formData.append(
            `sessions[${i}][lessons][${j}][video]`,
            lesson.video_url
          );
        }

        if (lesson.doc_url) {
          formData.append(`sessions[${i}][lessons][${j}][doc]`, lesson.doc_url);
        }
      }
    }

    formData.append("meta", JSON.stringify(meta));
    formData.append("videoUrl", data.videoUrl);
    formData.append("thumbnailUrl", data.thumbnailUrl);

    return formData;
  };

  const handleNewCourse = async (data: CourseFormType) => {
    try {
      const formData = await initFormData(data);
      await courseService.createCourse(formData);
      closeModal();
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
    }
  };

  const handleSubmitEditCourse = async (course: CourseFormTypeEdit) => {
    try {
      const formData = await initFormData(course);
      await courseService.editCourse(formData);
      toast.success("Edit course success");
      closeModal();
    } catch (err) {
      console.log(err);
      toast("Failed to edit course. Please try again.");
    }
    console.log("course edit:::", course);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center ">
        <div className="flex flex-row justify-between w-full">
          <h3 className="text-2xl font-bold tracking-tight">
            Instructor Dashboard
          </h3>
          <Button
            size="lg"
            className="rounded-xl"
            onClick={() => openModal(ACTION.CREATE)}
          >
            + New Course
          </Button>
        </div>
        {action === ACTION.CREATE && (
          <NewCourseWizard
            onSubmit={handleNewCourse}
            open={open}
            setOpen={(v) => !v && closeModal()}
          />
        )}
        {action === ACTION.EDIT && (
          <EditCourseForm
            open={open}
            setOpen={(v) => !v && closeModal()}
            onSubmit={handleSubmitEditCourse}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow-md border hover:shadow-lg transition overflow-hidden group"
          >
            <div className="h-40 w-full bg-gray-100 relative">
              <img
                src={c.thumbnailUrl || "default-course-thumbnail.jpg"}
                alt={c.title}
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full ${
                  statusColors[c.status]
                }`}
              >
                {c.status}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-lg text-gray-900 line-clamp-1">
                  {c.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {c.students} students • ${c.price}
                </p>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>⭐ {c.avgRating ? c.avgRating.toFixed(1) : "N/A"}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Created {new Date(c.createdAt).toLocaleDateString()}
                </span>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => openModal(ACTION.EDIT, c.id)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" className="rounded-lg">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Users className="w-4 h-4 mr-1" />
                    Students
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <BarChart2 className="w-4 h-4 mr-1" />
                    Analytics
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
