import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { type FieldArrayWithId, type UseFormReturn } from "react-hook-form";
import type { CourseFormType } from "../form-managerment/course-form";
import { useRef, useState } from "react";
import CourseLessionEditStep from "./course-lession-edit-step";
import type { CourseFormTypeEdit } from "./course-form-edit";

function CourseSessionEditStep({
  sessionFields,
  appendSession,
  removeSession,
  formCourse,
}: {
  sessionFields: FieldArrayWithId<CourseFormType, "sessions">[];
  appendSession: (value: CourseFormTypeEdit["sessions"][number]) => void;
  removeSession: (index: number) => void;
  formCourse: UseFormReturn<CourseFormTypeEdit>;
}) {
  const sessionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openSession, setOpenSession] = useState<string | undefined>(undefined);
  const handleAddSession = () => {
    appendSession({
      id: "",
      title: "",
      position: sessionFields.length + 1,
      lessons: [],
    });

    setTimeout(() => {
      const last = sessionRefs.current[sessionFields.length];
      last?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="space-y-6 max-h-[50vh] overflow-y-auto pr-2"
    >
      <h4 className="font-semibold text-2xl text-indigo-700">
        Sessions & Lessons
      </h4>
      {sessionFields.map((session, sIdx) => {
        return (
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl bg-white shadow border"
            key={session.id}
            value={openSession}
            onValueChange={setOpenSession}
          >
            <AccordionItem
              value={`session-${sIdx}`}
              ref={(el) => {
                sessionRefs.current[sIdx] = el;
              }}
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-indigo-600">
                {formCourse.watch(`sessions.${sIdx}.title`) ||
                  `Session ${sIdx + 1}`}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 space-y-4">
                <FormField
                  control={formCourse.control}
                  name={`sessions.${sIdx}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="rounded-xl"
                          placeholder="Session Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <CourseLessionEditStep
                  key={sIdx}
                  sIdx={sIdx}
                  formCourse={formCourse}
                />

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSession(sIdx)}
                >
                  Remove Session
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
      <Button onClick={handleAddSession} className="rounded-xl">
        + Add Session
      </Button>
    </motion.div>
  );
}

export default CourseSessionEditStep;
