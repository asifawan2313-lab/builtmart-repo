import BmLabourSidebar from "../../component/labour/BmLabourSidebar/BmLabourSidebar";

const LabourPanelLayout = ({ children }) => (
  <div className="min-h-screen bg-[#F4F4F2] text-[#202124]">
    <BmLabourSidebar />
    <main className="px-4 pb-10 pt-16 lg:ml-64 lg:px-8 lg:pt-8">{children}</main>
  </div>
);

export default LabourPanelLayout;