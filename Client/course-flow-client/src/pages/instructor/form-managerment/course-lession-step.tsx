import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { CourseFormType } from "./course-form";
import { useRef } from "react";

function CourseLessionStep({
  formCourse,
  sIdx,
}: {
  formCourse: UseFormReturn<CourseFormType>;
  sIdx: number;
}) {
  const lessionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control: formCourse.control,
    name: `sessions.${sIdx}.lessons`,
  });

  const handleAddLesson = () => {
    appendLesson({
      title: "",
      doc_url: "",
      video_url: "",
      position: lessonFields.length + 1,
    });
    setTimeout(() => {
      const last = lessionRefs.current[lessonFields.length];
      last?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
      {lessonFields.map((lesson, lIdx) => (
        <div
          key={lesson.id}
          ref={(el) => {
            lessionRefs.current[lIdx] = el;
          }}
          className="rounded-xl bg-gray-50 border p-4 space-y-3"
        >
          <FormField
            control={formCourse.control}
            name={`sessions.${sIdx}.lessons.${lIdx}.title`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="rounded-xl"
                    placeholder="Lesson Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formCourse.control}
            name={`sessions.${sIdx}.lessons.${lIdx}.doc_url`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="text/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file ? file : null);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={formCourse.control}
            name={`sessions.${sIdx}.lessons.${lIdx}.video_url`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file ? file : null);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeLesson(lIdx)}
            >
              Remove Lesson
            </Button>
          </div>
        </div>
      ))}

      <Button variant="secondary" onClick={handleAddLesson}>
        + Add Lesson
      </Button>
    </div>
  );
}

export default CourseLessionStep;
