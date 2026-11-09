// const CustomerDashboardPage = () => (
//   <main className="p-6">
//     <h1 className="text-2xl font-extrabold text-[#292929]">Dashboard</h1>
//     <p className="mt-2 text-sm text-[#45484D]">Customer dashboard content yahan aayega.</p>
//   </main>
// );

// export default CustomerDashboardPage;


import { redirect } from "next/navigation";

const CustomerPage = () => redirect("/customer/dashboard");

export default CustomerPage;