import { createBrowserRouter } from "react-router";
import LoginPage from "@/pages/auth/login.tsx";
import RegisterPage from "@/pages/auth/register.tsx";
import OtpPage from "@/pages/auth/otp.tsx";
import Layout from "@/components/layout/layout.tsx";

import FacebookStyleProfile from "@/pages/user/user-infor";
import MyCoursesPage from "@/pages/main/my-course";
import HomePage from "@/pages/main/home";
import AdminPage from "@/pages/admin/admin";
import LayoutAdmin from "@/components/layout/admin/index.tsx";
import CourseDetail from "@/pages/main/course-detail";
import InstructorDashboard from "@/pages/instructor/instructor";
import NotFoundPage from "@/pages/main/not_found";
import CheckoutPagePro from "@/pages/main/payment";
import CourseWatch from "@/pages/main/cours-watch";
import InstructorApprovalPage from "@/pages/admin/Instructor-approvalPage";
import SuccessStep from "@/components/pages/successStep";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "course/:id",
    element: <CourseDetail />,
  },
  {
    path: "my-courses",
    element: <MyCoursesPage />,
  },
  {
    path: "course/:id/watch",
    element: <CourseWatch />,
  },
  {
    path: "/user",
    element: <FacebookStyleProfile />,
  },

  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "verify-otp",
        element: <OtpPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "user",
        element: <InstructorApprovalPage />,
      },
    ],
  },
  {
    path: "/instructor",
    element: <InstructorDashboard />,
  },
  {
    path: "/payment/:courseId",
    element: <CheckoutPagePro />,
  },
  {
    path: "/payment/vnpay-return",
    element: <SuccessStep />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
