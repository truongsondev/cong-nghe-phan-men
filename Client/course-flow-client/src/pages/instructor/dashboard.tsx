import { StatCard } from "@/components/instructor/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity, BookOpen, DollarSign, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
type Stats = {
  revenueByMonth: { month: string; revenue: number; students: number }[];
  topCourses: { name: string; students: number }[];
  totalStudents: number;
  totalRevenue: number;
  totalCourses: number;
  totalOrders: number;
};
type Student = {
  id: string;
  name: string;
  email: string;
  enrolled: string[];
  avatar?: string;
};
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

export const DashboardPage: React.FC<{ stats: Stats }> = ({ stats }) => {
  const totalStudents = stats.totalStudents;
  const totalRevenue = stats.totalRevenue;
  const totalCourses = stats.totalCourses;
  const totalOrders = stats.totalOrders;

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="space-y-6">
      {/* top stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={<Users size={18} />}
          delta="+3.4%"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<DollarSign size={18} />}
          delta="+1.2%"
        />
        <StatCard
          title="Total Courses"
          value={totalCourses}
          icon={<BookOpen size={18} />}
          delta="+0.5%"
        />
        <StatCard
          title="Orders"
          value={totalOrders}
          icon={<Activity size={18} />}
          delta="-0.8%"
        />
      </div>

      {/* big chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle>Revenue & Students (last 6 months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={stats.revenueByMonth}>
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="revenue" name="Revenue" fill="#10B981" />
                  <Bar dataKey="students" name="Students" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Top Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={stats.topCourses}
                      dataKey="students"
                      nameKey="name"
                      outerRadius={80}
                      label
                    >
                      {stats.topCourses.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <ul className="mt-4 space-y-2">
                {stats.topCourses.map((c, i) => (
                  <li
                    key={c.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: COLORS[i % COLORS.length] }}
                      />
                      <div>
                        <div className="font-medium text-gray-800">
                          {c.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {c.students} students
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 font-semibold">
                      {(
                        (c.students /
                          stats.topCourses.reduce(
                            (s, r) => s + r.students,
                            0
                          )) *
                        100
                      ).toFixed(0)}
                      %
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Students by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-600">Vietnam</div>
                <div className="font-semibold text-gray-800">40%</div>
                <div className="text-sm text-gray-600">USA</div>
                <div className="font-semibold text-gray-800">25%</div>
                <div className="text-sm text-gray-600">Japan</div>
                <div className="font-semibold text-gray-800">15%</div>
                <div className="text-sm text-gray-600">India</div>
                <div className="font-semibold text-gray-800">10%</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* table / latest students */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Latest Students</CardTitle>
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
              {mockStudents.map((s) => (
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
