export const ERROR_MESSAGES: Record<
  number,
  { title: string; message: string }
> = {
  401: {
    title: "Unauthorized",
    message: "You are not authorized to access this resource.",
  },
  403: {
    title: "Forbidden",
    message: "You do not have permission to perform this action.",
  },
  404: {
    title: "Invalid URL",
    message: "The requested resource could not be found.",
  },
  409: {
    title: "Conflict",
    message: "A conflict occurred with the current state of the resource.",
  },
  500: {
    title: "Server Error",
    message: "An unexpected error occurred on the server.",
  },
};
