import { useAppSelector } from '../../redux/hooks';
import { GiNightSleep } from 'react-icons/gi';
import {
  deleteWebAppEntry,
  toggleActivenessWebView,
} from '../../redux/slices/WorkspaceSlice';
import { useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { RiDeleteBin3Line } from 'react-icons/ri';

const WorkspaceHome = () => {
  const dispatch = useDispatch();
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );

  const deactiveWebView = (id: string) => {
    dispatch(
      toggleActivenessWebView({
        id: id,
        active: false,
      })
    );
  };

  const deleteWebApp = (id: string) => {
    dispatch(deleteWebAppEntry({ id }));
  };

  const activateWebView = (id: string) => {
    dispatch(toggleActivenessWebView({ id, active: true }));
  };

  return (
    <div className="p-4">
      {/* top heading  */}
      <h1 className="text-xl capitalize font-semibold">
        {currentWorkSpace} Workspace
      </h1>
      <hr className="my-3" />
      {/* workspace apps  */}
      <section className="flex flex-col gap-3">
        <h1 className="font-medium">
          Workspace Apps{' '}
          {` (${workSpaces[currentWorkSpace].webViews.length - 1}) `}
        </h1>
        <div className="flex flex-wrap gap-3">
          {workSpaces[currentWorkSpace].webViews.map((item, index) => {
            if (index !== 0) {
              return (
                <div className="flex hover:border-gray-300 border-gray-100 relative items-center gap-3 border-2 p-3 w-fit rounded-md">
                  <div
                    onClick={() =>
                      item.active
                        ? deactiveWebView(item.id)
                        : activateWebView(item.id)
                    }
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <img
                      className="w-7 h-7 shadow-md rounded-md"
                      src={`http://www.google.com/s2/favicons?domain=${item.url}`}
                      alt="icon"
                    />
                    <div>
                      <h2 className="text-base">{item.name}</h2>
                      <p className="text-xs">{item.url}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 absolute cursor-pointer -right-2 -bottom-2 flex justify-center items-center text-white text-xs rounded-full bg-gray-400">
                    {!item.active ? <GiNightSleep /> : <RxCross2 />}
                  </div>
                  {!item.active && (
                    <div className="mx-2" onClick={() => deleteWebApp(item.id)}>
                      <RiDeleteBin3Line className="text-xl hover:text-red-500 cursor-pointer " />
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </section>

      <hr className="my-4" />
    </div>
  );
};

export default WorkspaceHome;
