import Navbar from "@/components/shared/Navbar";
import SideBar from "@/components/shared/SideBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-1 flex-col max-h-screen">
      <Navbar />
      <div className="flex h-screen relative">
        <SideBar />
        <div className="w-[65px]"></div>
        <div className=" flex flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
