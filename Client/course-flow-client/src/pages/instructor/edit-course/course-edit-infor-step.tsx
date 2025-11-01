import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { motion } from "framer-motion";
import { useFieldArray } from "react-hook-form";

function CourseInforEditStep({
  formCourse,
  categories,
}: {
  formCourse: any;
  categories: { id: string; name: string }[];
}) {
  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    control: formCourse.control,
    name: "requirements",
  });

  return (
    <>
      <motion.div
        key="step1"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        className="grid grid-cols-2 gap-8"
      >
        <FormField
          control={formCourse.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="rounded-2xl p-4"
                  placeholder="Course Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formCourse.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  className="rounded-2xl p-4"
                  placeholder="Price"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formCourse.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Textarea
                  className="rounded-2xl p-4"
                  placeholder="Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2">Requirements</label>
          <div className="space-y-3">
            {requirementFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">
                <FormField
                  control={formCourse.control}
                  name={`requirements[${index}]`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          className="rounded-2xl p-4"
                          placeholder={`Requirement ${index + 1}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="px-3 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => appendRequirement("")}
            className="mt-3 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
          >
            + Add Requirement
          </button>
        </div>

        <FormField
          control={formCourse.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="rounded-2xl p-4">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overscroll-y-auto">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </>
  );
}

export default CourseInforEditStep;
