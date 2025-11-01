"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../generated/prisma/index.js");
function startOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0);
}
function endOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
}
function lastNMonths(n) {
    const now = new Date();
    const buckets = [];
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
function pctDelta(curr, prev) {
    if (!prev)
        return curr ? 100 : 0;
    return Number((((curr - prev) / prev) * 100).toFixed(1));
}
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard() {
        const now = new Date();
        const curStart = startOfMonth(now);
        const curEnd = endOfMonth(now);
        const prevStart = startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));
        const prevEnd = endOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));
        const [totalStudents, totalCourses, ordersPaid, revenueRows, ordersCurr, ordersPrev, studentsCurr, studentsPrev, coursesCurr, coursesPrev,] = await Promise.all([
            this.prisma.user.count({ where: { role: 'student' } }),
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
        const totalRevenue = revenueRows.reduce((s, r) => s + (r.course?.price ?? 0), 0);
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
            Promise.all(months.map(({ start, end }) => this.prisma.enrollment
                .findMany({
                where: { status: 'paid', enrolledAt: { gte: start, lte: end } },
                select: { course: { select: { price: true } } },
            })
                .then((rows) => rows.reduce((s, r) => s + (r.course?.price ?? 0), 0)))),
            Promise.all(months.map(({ start, end }) => this.prisma.enrollment.count({
                where: { status: 'paid', enrolledAt: { gte: start, lte: end } },
            }))),
        ]);
        const topGroup = await this.prisma.enrollment.groupBy({
            by: ['courseId'],
            where: { status: 'paid' },
            _count: { courseId: true },
            orderBy: { _count: { courseId: 'desc' } },
            take: 3,
        });
        const topCourses = await Promise.all(topGroup.map(async (g) => {
            const c = await this.prisma.course.findUnique({
                where: { id: g.courseId },
                select: { title: true },
            });
            return {
                courseId: g.courseId,
                title: c?.title ?? '(Unknown)',
                students: g._count.courseId,
            };
        }));
        const resp = {
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRISMA_CLIENT')),
    __metadata("design:paramtypes", [prisma_1.PrismaClient])
], AdminService);
//# sourceMappingURL=admin.service.js.map