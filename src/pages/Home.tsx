import Navbar from "@/components/shared/Navbar";
import SideBar from "@/components/shared/SideBar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Home = () => {

  useEffect(() => { }, []);

  return (
    <div className="flex flex-1 flex-col max-h-screen">
      <Navbar />
      <div className="flex border h-screen">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
