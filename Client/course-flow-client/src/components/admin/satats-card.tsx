// components/dashboard/StatsCard.tsx
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function StatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>👥 120 Học viên mới</li>
          <li>🎓 15 Giảng viên chờ duyệt</li>
          <li>📚 8 Khóa học pending</li>
        </ul>
      </CardContent>
    </Card>
  );
}
