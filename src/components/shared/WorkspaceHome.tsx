import { useAppSelector } from '../../redux/hooks';
import {
  addWebView,
  deleteWebAppEntry,
} from '../../redux/slices/WorkspaceSlice';
import { useDispatch } from 'react-redux';
import { RiAddCircleLine, RiDeleteBin3Line } from 'react-icons/ri';
import { WebViewPresets } from '../../utils/StaticData/PresetWebApps';
import { v4 as uuid } from 'uuid';

const WorkspaceHome = () => {
  const dispatch = useDispatch();
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );

  const deleteWebApp = (id: string) => {
    dispatch(deleteWebAppEntry({ id }));
  };

  const addPresentToWorkspace = (webApp: any) => {
    if (workSpaces[currentWorkSpace].webViewsObj.hasOwnProperty(webApp.url)) {
      window.alert('already presen in current workspace ');
      return;
    }
    let id = uuid();
    dispatch(addWebView({ ...webApp, id, pinned: false }));
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
          Workspace Apps {` (${workSpaces[currentWorkSpace].webViews.length}) `}
        </h1>
        <div className="flex flex-wrap gap-3">
          {workSpaces[currentWorkSpace].webViews.map((item, index) => (
            <div
              key={index}
              className="flex hover:border-gray-300 border-gray-100 relative items-center gap-3 border-2 p-3 w-fit rounded-md"
            >
              <div className="flex items-center gap-3 cursor-pointer">
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
              <div className="flex">
                <div className="mx-2" onClick={() => deleteWebApp(item.id)}>
                  <RiDeleteBin3Line className="text-xl hover:text-red-500 cursor-pointer " />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-5" />

      {/* preset apps  */}
      <section className="flex flex-col gap-4">
        {Object.entries(WebViewPresets).map(([title, webApps], index) => {
          return (
            <div key={index} className="flex flex-col gap-3">
              <h1 className="font-medium">
                {title} {` (${webApps.length}) `}
              </h1>
              <div className="flex flex-wrap gap-3">
                {webApps.map((item, index) => (
                  <div
                    key={index}
                    className="flex hover:border-gray-300 border-gray-100 relative items-center gap-3 border-2 p-3 w-fit rounded-md"
                  >
                    <div className="flex items-center gap-3 cursor-pointer">
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

                    <div
                      className="mx-2"
                      onClick={() => addPresentToWorkspace(item)}
                    >
                      <RiAddCircleLine className="text-xl hover:text-blue-500 cursor-pointer " />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default WorkspaceHome;
