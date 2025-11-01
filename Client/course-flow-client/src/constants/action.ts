export const ACTION = {
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
  PREVIEW: "preview",
  STUDENTS: "students",
  ANALYTICS: "analytics",
} as const;

export type ACTION = (typeof ACTION)[keyof typeof ACTION];
