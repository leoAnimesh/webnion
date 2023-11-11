import SideBar from "@/components/shared/SideBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-1 h-screen">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Home;
