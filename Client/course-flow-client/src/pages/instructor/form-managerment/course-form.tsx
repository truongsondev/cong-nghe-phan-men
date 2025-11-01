import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, Image, Layers, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { Form } from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CategoriesResponse } from "@/dto/response/course.response.dto";
import courseService from "@/services/course.service";
import CourseInforStep from "./course-infor-step";
import CourseSessionStep from "./course-session-step";
import CourseDemoStep from "./course-demo-step";
import CourseReviewStep from "./course-review-step";
import { createObjectURL } from "@/lib/utils";

const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required"),
  position: z.number().min(1),
  doc_url: z.union([z.string(), z.instanceof(File)]).optional(),
  video_url: z.union([z.string(), z.instanceof(File)]).optional(),
});

const sessionSchema = z.object({
  title: z.string().min(1, "Session title is required"),
  position: z.number().min(1),
  lessons: z.array(lessonSchema),
});

const courseSchema = z.object({
  title: z.string().min(3, "Course title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category_id: z.string(),
  price: z.number().nonnegative("Price must be >= 0").min(0),
  thumbnailUrl: z.union([
    z.string().min(1, "Thumbnail is required"),
    z.instanceof(File),
  ]),
  videoUrl: z.union([
    z.string().min(1, "Video is required"),
    z.instanceof(File),
  ]),

  status: z.enum(["draft", "published", "paused"]),
  requirements: z
    .array(z.string().min(1, "Requirement cannot be empty"))
    .optional(),
  sessions: z.array(sessionSchema).min(1, "At least one session is required"),
});

export type CourseFormType = z.infer<typeof courseSchema>;
export type LessonFileType = "doc_url" | "video_url";

export const NewCourseWizard: React.FC<{
  open: boolean | undefined;
  setOpen: (open: boolean | undefined) => void;
  onSubmit: (data: CourseFormType) => Promise<void>;
}> = ({ onSubmit, open, setOpen }) => {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // react-hook-form init
  const formCourse = useForm<CourseFormType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      category_id: "",
      price: 0,
      thumbnailUrl: "",
      videoUrl: "",
      requirements: [],
      status: "draft",
      sessions: [],
    },
  });

  //sessions field array
  const {
    fields: sessionFields,
    append: appendSession,
    remove: removeSession,
  } = useFieldArray({
    control: formCourse.control,
    name: "sessions",
  });

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await courseService.getAllCategories();
        setCategories(res.data.data);
      } catch (e) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const steps = [
    { label: "Course Info", icon: BookOpen },
    { label: "Sessions & Lessons", icon: Layers },
    { label: "Media", icon: Image },
    { label: "Review", icon: CheckCircle2 },
  ];

  const nextStep = async () => {
    let fieldsToValidate: (keyof CourseFormType)[] = [];

    if (step === 1)
      fieldsToValidate = ["price", "title", "description", "category_id"];
    if (step === 2) fieldsToValidate = [`sessions`];
    if (step === 3) fieldsToValidate = ["thumbnailUrl", "videoUrl"];

    const valid = await formCourse.trigger(fieldsToValidate, {
      shouldFocus: true,
    });

    if (valid) {
      setStep((s) => s + 1);
    }
  };

  const handleFormSubmit = async (value: CourseFormType) => {
    setIsSubmitting(true);
    await onSubmit(value);
    setIsSubmitting(false);
    toast.success("Create course success");
  };

  const videoUrl = createObjectURL(formCourse.watch("videoUrl"));
  const thumbnailUrl = createObjectURL(formCourse.watch("thumbnailUrl"));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby={undefined}
        className="w-[999px] h-[75vh] max-w-none max-h-none p-0 bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-12 h-full w-full  overflow-y-scroll ">
          <div className="col-span-8 p-10 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-indigo-700 mb-6">
                Create New Course
              </DialogTitle>

              <div className="flex items-center justify-between mb-10 ">
                {steps.map((s, i) => (
                  <div
                    key={i}
                    className={`flex-1 flex flex-col items-center text-sm ${
                      step === i + 1 ? "text-indigo-600" : "text-gray-400"
                    }`}
                  >
                    <s.icon className="w-6 h-6 mb-1" />
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              <Form {...formCourse}>
                <form
                  onSubmit={formCourse.handleSubmit(
                    handleFormSubmit,
                    (errors) => console.log("❌ Errors", errors)
                  )}
                >
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <CourseInforStep
                        formCourse={formCourse}
                        categories={categories}
                      />
                    )}

                    {step === 2 && (
                      <CourseSessionStep
                        sessionFields={sessionFields}
                        appendSession={appendSession}
                        removeSession={removeSession}
                        formCourse={formCourse}
                      />
                    )}

                    {step === 3 && <CourseDemoStep formCourse={formCourse} />}

                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="flex flex-col h-full"
                      >
                        <CourseReviewStep formCourse={formCourse} />
                        <div className="flex justify-between mt-4 pt-4 border-t">
                          {/* <Button
                            variant="outline"
                            type="button"
                            className="rounded-xl px-6"
                            onClick={() => setStep(step - 1)}
                          >
                            Back
                          </Button> */}

                          <Button
                            type="submit"
                            className="rounded-xl px-6 bg-indigo-500 text-white flex items-center gap-2"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save Course"
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </Form>

              <div className="flex justify-between mt-10">
                {step > 1 ? (
                  <Button
                    variant="outline"
                    className="rounded-xl px-6"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                {step < 4 && (
                  <Button
                    className="rounded-xl px-6 bg-indigo-500 text-white"
                    onClick={nextStep}
                  >
                    Next
                  </Button>
                )}
              </div>
            </DialogHeader>
          </div>

          <div className="col-span-4 bg-white/60 backdrop-blur-xl p-8 flex flex-col items-start justify-start border-l overflow-y-auto">
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">
              Live Preview
            </h3>

            <div className="w-full h-56 relative">
              {formCourse.watch("videoUrl") && isPlaying ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-56 object-cover rounded-2xl shadow-lg"
                />
              ) : formCourse.watch("thumbnailUrl") ? (
                <div
                  className="w-full h-56 cursor-pointer"
                  onClick={() => {
                    if (formCourse.watch("videoUrl")) {
                      setIsPlaying(true);
                    }
                  }}
                >
                  <img
                    src={thumbnailUrl}
                    alt="Preview"
                    className="w-full h-56 object-cover rounded-2xl shadow-lg"
                  />

                  {formCourse.watch("videoUrl") && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-black/50 text-white rounded-full p-4">
                        ▶
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                  No Thumbnail
                </div>
              )}
            </div>

            <p className="mt-4 text-xl font-semibold text-gray-800">
              {formCourse.watch("title") || "Course Title"}
            </p>
            <p className="text-gray-500 text-sm line-clamp-3 mb-3">
              {formCourse.watch("description") ||
                "Course description will appear here..."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
