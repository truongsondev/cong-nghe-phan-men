// src/modules/admin/dto/dashboard.dto.ts
export type MonthSerie = {
  months: string[];
  revenue: number[];
  students: number[];
};

export type TopCourseItem = {
  courseId: string;
  title: string;
  students: number;
};

export type CountryStat = { country: string; percent: number }; // cần cột country ở User

export interface DashboardResponse {
  cards: {
    totalStudents: number;
    studentsDelta: number; // MoM %
    totalRevenue: number; // $
    revenueDelta: number; // MoM %
    totalCourses: number;
    coursesDelta: number; // MoM %
    orders: number; // paid enrollments
    ordersDelta: number; // MoM %
  };
  chart: MonthSerie; // Revenue & Students (last 6 months)
  topCourses: TopCourseItem[]; // top 3 by students
  studentsByCountry: CountryStat[]; // rỗng nếu chưa có user.country
}
