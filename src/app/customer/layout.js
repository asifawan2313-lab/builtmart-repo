import BmCustomerSidebar from "../../component/customer/BmCustomerSidebar/BmCustomerSidebar";

const CustomerLayout = ({ children }) => (
  <div className="min-h-screen bg-[#F4F4F2]">
    <BmCustomerSidebar />
    <div className="pt-16 lg:pl-64 lg:pt-0">{children}</div>
  </div>
);

export default CustomerLayout;