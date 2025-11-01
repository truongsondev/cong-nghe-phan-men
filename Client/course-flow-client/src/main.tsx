import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/auth-context";
import "./index.css";

import router from "./routers";
import { Toaster } from "sonner";
import { CourseProvider } from "./contexts/course-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CourseProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" expand={false} richColors />
      </CourseProvider>
    </AuthProvider>
  </StrictMode>
);
