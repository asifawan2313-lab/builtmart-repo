import BmAdminDashboard from './admindashboard.js';
import AdminDashboardCards from "./admindashboardcard.js";
import AdminNotifications from "./adminnotification.js";
export default function AdminDashboardPage() {
  return (
    <main className="p-8">
      <BmAdminDashboard/>
      <AdminDashboardCards/>
      <AdminNotifications/>
    </main>
  );
}
