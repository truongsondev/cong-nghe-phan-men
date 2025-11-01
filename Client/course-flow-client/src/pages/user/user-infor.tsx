import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import userService from "@/services/user.service";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export default function FacebookStyleProfile() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [tab, setTab] = useState("courses");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser?.id) return;
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await userService.getUser(authUser.id);
        setProfile(res.data.data);
      } catch (error: any) {
        toast.error("Không thể tải dữ liệu người dùng.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [authUser?.id]);

  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  if (!profile)
    return (
      <div className="p-10 text-center text-red-600">
        Không tìm thấy thông tin người dùng.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="h-72 w-full bg-cover bg-center relative"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1503264116251-35a269479413?w=1200)`,
        }}
      >
        <div className="absolute bottom-4 right-6">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-black/70 text-white text-sm rounded-lg shadow hover:bg-black"
          >
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative -mt-20">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <img
              src={"t1.png"}
              alt="Avatar"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">{profile.fullName}</h1>
              <p className="text-gray-600">
                {profile.bio || "Chưa có giới thiệu."}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 flex gap-6 text-sm font-medium">
            {[
              { id: "about", label: "Giới thiệu" },
              { id: "courses", label: "Khóa học" },
              { id: "skills", label: "Kỹ năng" },

              // { id: "payments", label: "Thanh toán" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`py-3 ${
                  tab === t.id
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-6 space-y-6">
        {tab === "about" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Giới thiệu</h2>
            <p className="text-gray-700 leading-relaxed">
              {profile.bio || "Chưa có thông tin giới thiệu."}
            </p>
          </div>
        )}

        {tab === "courses" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Khóa học của tôi</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {profile.courses?.length > 0 ? (
                profile.courses.map((c: any) => (
                  <div
                    key={c.id}
                    className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
                  >
                    <h3 className="font-medium">{c.title}</h3>
                    <p className="text-sm text-gray-500">{c.status}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Bạn chưa có khóa học nào.</p>
              )}
            </div>
          </div>
        )}

        {tab === "skills" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Kỹ năng</h2>
            <div className="flex gap-2 flex-wrap">
              {["React", "Node.js", "SQL", "TypeScript"].map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* {tab === "payments" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Lịch sử thanh toán</h2>
            <p className="text-gray-500 text-sm">Chưa có dữ liệu.</p>
          </div>
        )} */}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa hồ sơ</h2>
            <form
              className="grid gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const form = e.target as HTMLFormElement;
                  const fullName = (form[0] as HTMLInputElement).value;
                  const bio = (form[1] as HTMLTextAreaElement).value;

                  await userService.updateUser(authUser?.id || "", {
                    fullName,
                    bio,
                  });
                  setProfile({ ...profile, fullName, bio });
                  toast.success("Cập nhật hồ sơ thành công!");
                  setIsEditing(false);
                } catch {
                  toast.error("Không thể cập nhật hồ sơ.");
                }
              }}
            >
              <input
                placeholder="Họ và tên"
                defaultValue={profile.fullName}
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                placeholder="Giới thiệu"
                defaultValue={profile.bio}
                className="w-full border rounded px-3 py-2 h-24"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-100 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
