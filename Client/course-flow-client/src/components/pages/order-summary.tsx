import { Card, CardContent } from "@/components/ui/card";

export default function OrderSummary() {
  const items = [
    { name: "Áo thun", price: 200000, quantity: 2 },
    { name: "Quần jeans", price: 500000, quantity: 1 },
  ];

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Card className="border rounded-xl shadow-sm">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3">Chi tiết đơn hàng</h3>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>{item.price.toLocaleString()}đ</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 font-bold text-lg border-t pt-3">
          <span>Tổng cộng</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
      </CardContent>
    </Card>
  );
}
