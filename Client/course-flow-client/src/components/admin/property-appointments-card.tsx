// components/dashboard/PropertyAppointmentsCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PropertyAppointmentsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>09:00 - Jane Anderson - Apartment Viewing</li>
          <li>11:00 - Tom Smith - Penthouse Tour</li>
          <li>14:00 - Chris Johnson - Office Space</li>
        </ul>
      </CardContent>
    </Card>
  );
}
