// components/dashboard/TaskListCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const tasks = [
  { title: "Follow up with John Doe", time: "Today 2:30 PM" },
  { title: "Meeting with James Smith", time: "Today 4:00 PM" },
  { title: "Review Course Submissions", time: "Tomorrow" },
];

export default function TaskListCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow-Up Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {tasks.map((t, i) => (
            <li
              key={i}
              className="flex justify-between items-center p-2 border rounded-lg"
            >
              <span>{t.title}</span>
              <span className="text-xs text-gray-500">{t.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
