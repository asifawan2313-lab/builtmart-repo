import AdminSidebar from "../../component/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}