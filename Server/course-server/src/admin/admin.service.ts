import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { DashboardResponse } from 'src/dto/response/dashboard.dto';

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
}

type MonthBucket = { label: string; start: Date; end: Date };

function lastNMonths(n: number): MonthBucket[] {
  const now = new Date();
  const buckets: MonthBucket[] = [];

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      label: d.toLocaleString('en-US', { month: 'short' }),
      start: startOfMonth(d),
      end: endOfMonth(d),
    });
  }
  return buckets;
}

function pctDelta(curr: number, prev: number) {
  if (!prev) return curr ? 100 : 0;
  return Number((((curr - prev) / prev) * 100).toFixed(1));
}

@Injectable()
export class AdminService {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient) {}

  async getDashboard(): Promise<DashboardResponse> {
    const now = new Date();
    const curStart = startOfMonth(now);
    const curEnd = endOfMonth(now);
    const prevStart = startOfMonth(
      new Date(now.getFullYear(), now.getMonth() - 1, 1),
    );
    const prevEnd = endOfMonth(
      new Date(now.getFullYear(), now.getMonth() - 1, 1),
    );

    const [
      totalStudents,
      totalCourses,
      ordersPaid,
      revenueRows,
      ordersCurr,
      ordersPrev,
      studentsCurr,
      studentsPrev,
      coursesCurr,
      coursesPrev,
    ] = await Promise.all([
      this.prisma.user.count({ where: { role: 'student' as any } }),

      this.prisma.course.count(),

      this.prisma.enrollment.count({ where: { status: 'paid' } }),

      this.prisma.enrollment.findMany({
        where: { status: 'paid' },
        select: { course: { select: { price: true } } },
      }),

      this.prisma.enrollment.count({
        where: { status: 'paid', enrolledAt: { gte: curStart, lte: curEnd } },
      }),
      this.prisma.enrollment.count({
        where: { status: 'paid', enrolledAt: { gte: prevStart, lte: prevEnd } },
      }),

      this.prisma.enrollment
        .groupBy({
          by: ['userId'],
          where: { status: 'paid', enrolledAt: { gte: curStart, lte: curEnd } },
          _count: { userId: true },
        })
        .then((r) => r.length),

      this.prisma.enrollment
        .groupBy({
          by: ['userId'],
          where: {
            status: 'paid',
            enrolledAt: { gte: prevStart, lte: prevEnd },
          },
          _count: { userId: true },
        })
        .then((r) => r.length),

      this.prisma.course.count({
        where: { createdAt: { gte: curStart, lte: curEnd } },
      }),
      this.prisma.course.count({
        where: { createdAt: { gte: prevStart, lte: prevEnd } },
      }),
    ]);

    const totalRevenue = revenueRows.reduce(
      (s, r) => s + (r.course?.price ?? 0),
      0,
    );

    const studentsDelta = pctDelta(studentsCurr, studentsPrev);
    const ordersDelta = pctDelta(ordersCurr, ordersPrev);
    const coursesDelta = pctDelta(coursesCurr, coursesPrev);

    const [revenueCurr, revenuePrev] = await Promise.all([
      this.prisma.enrollment
        .findMany({
          where: { status: 'paid', enrolledAt: { gte: curStart, lte: curEnd } },
          select: { course: { select: { price: true } } },
        })
        .then((rows) => rows.reduce((s, r) => s + (r.course?.price ?? 0), 0)),
      this.prisma.enrollment
        .findMany({
          where: {
            status: 'paid',
            enrolledAt: { gte: prevStart, lte: prevEnd },
          },
          select: { course: { select: { price: true } } },
        })
        .then((rows) => rows.reduce((s, r) => s + (r.course?.price ?? 0), 0)),
    ]);
    const revenueDelta = pctDelta(revenueCurr, revenuePrev);

    const months = lastNMonths(6);
    const [revByMonth, studentsByMonth] = await Promise.all([
      Promise.all(
        months.map(({ start, end }) =>
          this.prisma.enrollment
            .findMany({
              where: { status: 'paid', enrolledAt: { gte: start, lte: end } },
              select: { course: { select: { price: true } } },
            })
            .then((rows) =>
              rows.reduce((s, r) => s + (r.course?.price ?? 0), 0),
            ),
        ),
      ),
      Promise.all(
        months.map(({ start, end }) =>
          this.prisma.enrollment.count({
            where: { status: 'paid', enrolledAt: { gte: start, lte: end } },
          }),
        ),
      ),
    ]);

    const topGroup = await this.prisma.enrollment.groupBy({
      by: ['courseId'],
      where: { status: 'paid' },
      _count: { courseId: true },
      orderBy: { _count: { courseId: 'desc' } },
      take: 3,
    });

    const topCourses = await Promise.all(
      topGroup.map(async (g) => {
        const c = await this.prisma.course.findUnique({
          where: { id: g.courseId },
          select: { title: true },
        });
        return {
          courseId: g.courseId,
          title: c?.title ?? '(Unknown)',
          students: g._count.courseId,
        };
      }),
    );

    const resp: DashboardResponse = {
      cards: {
        totalStudents,
        studentsDelta,
        totalRevenue,
        revenueDelta,
        totalCourses,
        coursesDelta,
        orders: ordersPaid,
        ordersDelta,
      },
      chart: {
        months: months.map((m) => m.label),
        revenue: revByMonth,
        students: studentsByMonth,
      },
      topCourses,
      studentsByCountry: [],
    };

    return resp;
  }
}
