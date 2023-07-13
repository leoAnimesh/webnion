import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  changeCurrentWebView,
  deleteWebAppEntry,
  togglePinned,
} from '../../redux/slices/WorkspaceSlice';
import { RiCloseFill, RiDeleteBin3Line, RiUnpinLine } from 'react-icons/ri';
// import { WebViewPresets } from '../../utils/StaticData/PresetWebApps';
import { v4 as uuid } from 'uuid';
import { BiPin } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import WebView from './WebView';
import { addTodo, deleteTodo } from '../../redux/slices/WorkspaceDataSlice';
import { toggleAddWenViewModal } from '../../redux/slices/ConditonsSlice';

const WorkspaceHome = () => {
  const dispatch = useAppDispatch();
  const InputModes = ['search', 'todos'];
  const [inputMode, setInputMode] = useState(InputModes[0]);
  const [showBrowserWindow, setshowBrowserWindow] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  const [todo, setTodo] = useState<string>('');

  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );
  const { workSpaceData } = useAppSelector((state) => state.workspaceData);

  const changeWebView = (id: string) => {
    dispatch(changeCurrentWebView({ id }));
  };

  const toggleShowBrowserWindow = () =>
    setshowBrowserWindow(!showBrowserWindow);

  const deleteWebApp = (id: string, url: string) => {
    dispatch(deleteWebAppEntry({ id, url }));
  };

  const togglePins = (id: string, pinned: boolean) => {
    dispatch(togglePinned({ id, pinned }));
  };

  const onsubmit = (e: any) => {
    e.preventDefault();

    if (inputMode === InputModes[0]) {
      if (query === '') {
        return;
      }
      toggleShowBrowserWindow();
    }

    if (inputMode === InputModes[1]) {
      if (todo === '') {
        return;
      }
      dispatch(
        addTodo({
          data: {
            todo: todo,
            id: uuid(),
            date: new Date(),
            done: false,
            completedAt: '',
          },
          currentWorkSpace,
        })
      );
      setTodo('');
    }
  };

  const deleteCurrentTodo = (id: string) => {
    dispatch(deleteTodo({ id, currentWorkSpace }));
  };

  useEffect(() => {
    if (!showBrowserWindow) {
      setQuery('');
    }
  }, [showBrowserWindow]);

  return (
    <div className="p-4 flex-1 " style={{ height: '100vh' }}>
      {showBrowserWindow && (
        <WebView
          data={{
            name: 'google',
            id: 'dahjdas',
            url: `https://google.com/search?q=${query.split(' ').join('+')}`,
            pinned: false,
          }}
          close={toggleShowBrowserWindow}
        />
      )}

      {!showBrowserWindow && (
        <section
          className="flex flex-col items-center justify-center gap-5 border-2 overflow-scroll "
          style={{ height: '100%' }}
        >
          <div className="flex flex-col items-center gap-4 w-full ">
            <h1 className="text-5xl font-semibold">12:00 PM</h1>
            <h1 className="text-3xl font-medium">13th Jul, 4:32 PM,2023</h1>
            <form
              className="flex items-center w-full justify-center mt-3 gap-2"
              onSubmit={onsubmit}
            >
              <select
                value={inputMode}
                onChange={(e) => setInputMode(e.target.value)}
                className="border-2 px-1 py-1 rounded-md"
              >
                {InputModes.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <input
                value={inputMode === InputModes[0] ? query : todo}
                onChange={(e) =>
                  inputMode === InputModes[0]
                    ? setQuery(e.target.value)
                    : setTodo(e.target.value)
                }
                placeholder={
                  inputMode === InputModes[0]
                    ? 'Search anything'
                    : 'Add your todos here'
                }
                type="text"
                style={{ width: '25%' }}
                className="border-2 p-1 rounded-md placeholder:text-sm"
              />
              <button
                type="submit"
                className="border-2 px-6 py-1 capitalize rounded-md"
              >
                {inputMode === InputModes[0] ? 'Search' : 'Add Todo'}
              </button>
            </form>
          </div>

          {workSpaceData[currentWorkSpace].todos.length > 0 && (
            <div className="flex items-center gap-3">
              <p>Todos : </p>
              {workSpaceData[currentWorkSpace].todos.map((item, index) => (
                <div
                  key={index}
                  className="border-2 px-3 py-2 rounded-md flex items-center gap-3"
                >
                  <input type="checkbox" checked={item.done} />
                  <p>{item.todo}</p>
                  {item.done === true && (
                    <RiCloseFill
                      className="border-2 cursor-pointer"
                      onClick={() => deleteCurrentTodo(item.id)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <section className="flex flex-col items-center gap-3">
            {workSpaces[currentWorkSpace].webViews.length === 0 && (
              <div className="flex items-center gap-3">
                <p className="text-base">No Apps Added yet 🤔 </p>
                <p
                  className="text-base text-blue-500 cursor-pointer font-medium"
                  onClick={() => dispatch(toggleAddWenViewModal())}
                >
                  Add Now
                </p>
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              {workSpaces[currentWorkSpace].webViews.map((item, index) => (
                <div
                  key={index}
                  className="flex hover:border-gray-300 border-gray-100 relative items-center gap-3 border-2 p-3 w-fit rounded-md"
                >
                  <div
                    onClick={() => changeWebView(item.id)}
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
                  <div className="flex">
                    {item.pinned ? (
                      <div
                        className="mx-2"
                        onClick={() => togglePins(item.id, false)}
                      >
                        <RiUnpinLine className="text-xl hover:text-blue-500 cursor-pointer " />
                      </div>
                    ) : (
                      <div
                        className="mx-2"
                        onClick={() => togglePins(item.id, true)}
                      >
                        <BiPin className="text-xl hover:text-blue-500 cursor-pointer " />
                      </div>
                    )}
                    <div
                      className="mx-2"
                      onClick={() => deleteWebApp(item.id, item.url)}
                    >
                      <RiDeleteBin3Line className="text-xl hover:text-red-500 cursor-pointer " />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      )}
    </div>
  );
};

export default WorkspaceHome;
