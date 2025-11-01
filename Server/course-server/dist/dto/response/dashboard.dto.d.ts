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
export type CountryStat = {
    country: string;
    percent: number;
};
export interface DashboardResponse {
    cards: {
        totalStudents: number;
        studentsDelta: number;
        totalRevenue: number;
        revenueDelta: number;
        totalCourses: number;
        coursesDelta: number;
        orders: number;
        ordersDelta: number;
    };
    chart: MonthSerie;
    topCourses: TopCourseItem[];
    studentsByCountry: CountryStat[];
}
