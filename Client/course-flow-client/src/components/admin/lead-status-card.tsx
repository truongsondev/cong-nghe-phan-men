// components/dashboard/LeadStatusCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const leads = [
  { name: "Chris Kato", status: "Active", color: "bg-blue-100 text-blue-700" },
  {
    name: "Thor Johnson",
    status: "Pending",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Toni Hopper",
    status: "Active",
    color: "bg-green-100 text-green-700",
  },
  { name: "Sue Robbins", status: "Active", color: "bg-blue-100 text-blue-700" },
];

export default function LeadStatusCard() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Lead Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {leads.map((lead, i) => (
          <div key={i} className={`p-3 rounded-lg ${lead.color}`}>
            <p className="font-medium">{lead.name}</p>
            <span className="text-xs">{lead.status}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
