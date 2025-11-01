import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function UserCard() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Thông tin người dùng</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        <img
          src="https://i.pravatar.cc/100"
          alt="avatar"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">Christopher Kato</h2>
          <p className="text-sm text-gray-500">Hot Prospect</p>
          <p className="text-sm text-gray-500">+1 234 555 6789</p>
          <p className="text-sm text-gray-500">christkato@gmail.com</p>
        </div>
      </CardContent>
    </Card>
  );
}
