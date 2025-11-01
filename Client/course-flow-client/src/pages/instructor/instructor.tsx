import { ProfilePage } from "@/components/instructor/profile-page";
import { Topbar } from "@/components/instructor/topbar";
import { Sidebar } from "@/components/instructor/sidebar";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { DashboardPage } from "./dashboard";
import { CoursesPage } from "./course-page";
import type { CourseInstructorResponse } from "@/dto/response/course.response.dto";
import courseService from "@/services/course.service";
import { toast } from "sonner";
const mockStudents: Student[] = [
  {
    id: "s1",
    name: "Nguyễn An",
    email: "an@example.com",
    enrolled: ["React Masterclass"],
  },
  {
    id: "s2",
    name: "Trần Bình",
    email: "binh@example.com",
    enrolled: ["React Masterclass", "NodeJS Pro"],
  },
  {
    id: "s3",
    name: "Lê Hoa",
    email: "hoa@example.com",
    enrolled: ["TypeScript Deep Dive"],
  },
];

type Student = {
  id: string;
  name: string;
  email: string;
  enrolled: string[];
  avatar?: string;
};

type Stats = {
  revenueByMonth: { month: string; revenue: number; students: number }[];
  topCourses: { name: string; students: number }[];
  totalStudents: number;
  totalRevenue: number;
  totalCourses: number;
  totalOrders: number;
};

const mockStats: Stats = {
  revenueByMonth: [
    { month: "Jan", revenue: 1200, students: 80 },
    { month: "Feb", revenue: 1800, students: 120 },
    { month: "Mar", revenue: 2400, students: 160 },
    { month: "Apr", revenue: 2000, students: 130 },
    { month: "May", revenue: 3000, students: 200 },
    { month: "Jun", revenue: 3500, students: 240 },
  ],
  topCourses: [
    { name: "React Masterclass", students: 420 },
    { name: "NodeJS Pro", students: 210 },
    { name: "TypeScript Deep Dive", students: 160 },
  ],
  totalStudents: 790,
  totalRevenue: 11540,
  totalCourses: 12,
  totalOrders: 980,
};

const StudentsPage: React.FC<{ students: Student[] }> = ({ students }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Students</h3>
        <Button>+ Invite Student</Button>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>All students</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.enrolled.join(", ")}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                      <Button size="sm">Message</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default function InstructorDashboard() {
  const [active, setActive] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<CourseInstructorResponse[]>([]);
  useEffect(() => {
    try {
      const fetchCourses = async () => {
        const result = await courseService.getCourseListForInstructor();
        if (result.data.success && result.data.data) {
          console.log(result.data.data);
          setCourses(result.data.data);
        }
      };
      fetchCourses();
    } catch (error) {
      toast.error("Failed to fetch courses. Please try again.");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar active={active} setActive={setActive} />

      <div className="flex-1 p-8">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="mt-6">
          {active === "dashboard" && <DashboardPage stats={mockStats} />}
          {active === "courses" && <CoursesPage courses={courses} />}
          {active === "students" && <StudentsPage students={mockStudents} />}
          {active === "analytics" && <DashboardPage stats={mockStats} />}
          {active === "settings" && <ProfilePage />}
        </div>
      </div>
    </div>
  );
}
