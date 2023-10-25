import Navbar from "@/components/shared/Navbar";
import SideBar from "@/components/shared/SideBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-1 flex-col max-h-screen">
      <Navbar />
      <div className="flex h-screen relative">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
