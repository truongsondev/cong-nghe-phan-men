import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import instructorService from "@/services/user.service";
type Instructor = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  expertise: string;
  status: "pending" | "approved" | "rejected";
  avatarUrl?: string;
};

export default function InstructorApprovalPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await instructorService.getAll();
      setInstructors(res);
    };
    fetchData();
  }, []);

  const handleApprove = async (id: string) => {
    await instructorService.approve(id);
    toast.success("Đã duyệt giảng viên!");
    setInstructors((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "approved" } : i))
    );
  };

  const handleReject = async (id: string) => {
    await instructorService.reject(id);
    toast.error("Đã từ chối giảng viên!");
    setInstructors((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "rejected" } : i))
    );
  };

  const filtered = instructors.filter((i) => i.status === filter);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Quản lý & Duyệt Giảng Viên</h1>

      {/* Bộ lọc trạng thái */}
      <div className="flex gap-3">
        {(["pending", "approved", "rejected"] as const).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "default" : "outline"}
            onClick={() => setFilter(type)}
          >
            {type === "pending"
              ? "⏳ Chờ duyệt"
              : type === "approved"
              ? "✅ Đã duyệt"
              : "❌ Từ chối"}
          </Button>
        ))}
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Chờ duyệt</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-yellow-600">
            {instructors.filter((i) => i.status === "pending").length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Đã duyệt</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-600">
            {instructors.filter((i) => i.status === "approved").length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Đã từ chối</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-red-600">
            {instructors.filter((i) => i.status === "rejected").length}
          </CardContent>
        </Card>
      </div>

      {/* Danh sách giảng viên */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-gray-500 italic">Không có giảng viên nào.</p>
        ) : (
          filtered.map((inst) => (
            <Card key={inst.id} className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={inst.avatarUrl || "https://i.pravatar.cc/100"}
                    alt={inst.fullName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle>{inst.fullName}</CardTitle>
                    <p className="text-sm text-gray-500">{inst.expertise}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>📧 {inst.email}</p>
                <p>📞 {inst.phone}</p>
                {inst.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(inst.id)}
                    >
                      Duyệt
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(inst.id)}
                    >
                      Từ chối
                    </Button>
                  </div>
                )}
                {inst.status === "approved" && (
                  <p className="text-green-600 font-semibold">Đã duyệt ✅</p>
                )}
                {inst.status === "rejected" && (
                  <p className="text-red-600 font-semibold">Đã từ chối ❌</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
