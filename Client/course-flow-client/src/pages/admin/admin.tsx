import LeadStatusCard from "@/components/admin/lead-status-card";
import PropertyAppointmentsCard from "@/components/admin/property-appointments-card";
import QuickConnectsCard from "@/components/admin/quick-connects-card";
import StatsCard from "@/components/admin/satats-card";
import TaskListCard from "@/components/admin/task-list-card";
import UserCard from "@/components/admin/user-card";

function AdminPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <UserCard />
      <StatsCard />
      <LeadStatusCard />
      <PropertyAppointmentsCard />
      <TaskListCard />
      <QuickConnectsCard />
    </div>
  );
}

export default AdminPage;
