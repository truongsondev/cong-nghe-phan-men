import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Profile</h3>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Instructor Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600">Full name</label>
              <input
                className="w-full mt-2 p-3 border rounded-lg"
                defaultValue="Lê Giảng Viên"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                className="w-full mt-2 p-3 border rounded-lg"
                defaultValue="gvien@example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Bio</label>
              <textarea
                className="w-full mt-2 p-3 border rounded-lg"
                defaultValue="Giảng viên lập trình với 10 năm kinh nghiệm."
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button>Save changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
