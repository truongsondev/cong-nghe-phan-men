// components/dashboard/QuickConnectsCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const contacts = [
  { name: "Adam Andrew", action: "Customer call" },
  { name: "Andrew Sai", action: "Follow up mail" },
  { name: "Aravjo Stan", action: "Invoice follow-up" },
];

export default function QuickConnectsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Connects</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {contacts.map((c, i) => (
            <li
              key={i}
              className="flex justify-between items-center p-2 border rounded-lg"
            >
              <span>{c.name}</span>
              <span className="text-xs text-gray-500">{c.action}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
