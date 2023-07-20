import { BiPlay } from 'react-icons/bi';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { switchWorkSpace } from '../../redux/slices/WorkspaceSlice';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin3Line } from 'react-icons/ri';

const AppManagerHome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );

  return (
    <div className="px-4 flex flex-col gap-4">
      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-medium">App Workspaces</h1>

        <button
          type="submit"
          className="bg-blue-500 px-3 rounded-md text-lg text-white"
        >
          +
        </button>
      </div>

      <hr />

      <section className="flex gap-3">
        {Object.entries(workSpaces).map(([key, value], index) => (
          <div
            onClick={() => {
              dispatch(switchWorkSpace({ name: key }));
            }}
            key={index}
            className={`${
              currentWorkSpace === key
                ? 'border-blue-400'
                : 'border-gray-100 dark:border-dark'
            } border-2 p-2 h-fit text-gray-500 dark:bg-dark dark:text-white relative w-fit cursor-pointer rounded-lg text-sm bold flex justify-between items-center `}
          >
            <div className="flex items-center gap-4 p-1">
              <div
                className="bg-blue-100 dark:bg-darker rounded-md text-center flex justify-center items-center"
                style={{ width: '50px', height: '50px' }}
              >
                <p className="text-2xl">{value.workspaceDetails.emoji}</p>
              </div>
              <div className=" flex flex-col gap-1">
                <p className="text-md capitalize ">{key} Workspace </p>
                <p className="text-xs">
                  Contains {value.webViews.length}{' '}
                  {value.webViews.length > 1 ? 'Apps' : 'App'}
                </p>
              </div>
              <div>
                {currentWorkSpace === key && (
                  <button
                    onClick={() => navigate('/webAppsHome')}
                    className="bg-blue-500 w-6 h-6 flex items-center justify-center rounded-full"
                  >
                    <BiPlay className="text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      <hr className="my-1" />

      <section className="h-full">
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-3">
          {workSpaces[currentWorkSpace].webViews.map((item, index) => (
            <div
              key={index}
              className="h-[200px] border-2 border-gray-100 rounded-md"
            >
              {item.screenshot ? (
                <img
                  src={item?.screenshot}
                  className="w-full h-[70%] object-cover rounded-t-md"
                  alt="ss"
                />
              ) : (
                <div className="h-[70%] w-full flex justify-center items-center bg-gray-100 rounded-t-md">
                  <img
                    className="w-7 h-7 backdrop-blur-md shadow-md rounded-md"
                    src={`http://www.google.com/s2/favicons?domain=${item.url}`}
                    alt="icon"
                  />
                </div>
              )}
              <div className="flex h-[30%] border-gray-100 dark:border-dark dark:bg-dark dark:text-white relative items-center justify-between gap-3 p-4 w-full rounded-b-md">
                <div className="flex items-center gap-3 cursor-pointer">
                  <img
                    className="w-6 h-6 shadow-md rounded-md"
                    src={`http://www.google.com/s2/favicons?domain=${item.url}`}
                    alt="icon"
                  />
                  <div>
                    <h2 className="text-base">{item.name}</h2>
                    <p className="text-xs">{item.url}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mx-2">
                    <RiDeleteBin3Line className="text-xl hover:text-red-500 cursor-pointer " />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AppManagerHome;
