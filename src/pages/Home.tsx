import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
  const FEATURES = [
    { name: 'Apps Manager', link: 'app-manager', icon: '📦', id: 1 },
  ];
  const [activeFeature, setActiveFeature] = useState(FEATURES[0]);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${activeFeature.link}`);
  }, []);

  return (
    <main className="flex flex-col h-screen w-screen dark:text-white">
      <div className="h-14 flex items-center shadow-md px-4 dark:bg-dark w-full">
        <h1 className="font-semibold">Webnion</h1>
      </div>
      <div className="flex w-full h-full dark:bg-darker">
        <div className="flex flex-col gap-4 w-[18%] border-r-2 dark:border-dark px-4 py-3 font-medium">
          <h1>Features</h1>
          <div className="flex flex-col gap-3">
            {FEATURES.map((item, index) => (
              <div
                onClick={() => {
                  navigate(`/${item.link}`);
                  setActiveFeature(item);
                }}
                className={`border-2 ${
                  activeFeature.id === item.id
                    ? 'border-blue-500'
                    : 'border-gray-100 dark:border-dark'
                } dark:bg-dark  px-2 py-1 flex items-center gap-2 rounded-md cursor-pointer`}
                key={index}
              >
                <span>{item.icon}</span>
                <span className="text-sm font-normal line-clamp-1 hover:line-clamp-2 capitalize ">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[82%] h-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Home;
