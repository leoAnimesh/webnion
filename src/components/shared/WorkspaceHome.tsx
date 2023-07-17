import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  changeCurrentWebView,
  deleteWebAppEntry,
  togglePinned,
} from '../../redux/slices/WorkspaceSlice';
import { RiCloseFill, RiDeleteBin3Line, RiUnpinLine } from 'react-icons/ri';
import { v4 as uuid } from 'uuid';
import { BiPin } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import WebView from './WebView';
import {
  addTodo,
  deleteTodo,
  markTodoAsDone,
} from '../../redux/slices/WorkspaceDataSlice';
import { toggleAddWenViewModal } from '../../redux/slices/ConditonsSlice';
import moment from 'moment';

const WorkspaceHome = () => {
  const dispatch = useAppDispatch();
  const InputModes = ['search', 'todos'];
  const [inputMode, setInputMode] = useState(InputModes[0]);
  const [showBrowserWindow, setshowBrowserWindow] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  const [todo, setTodo] = useState<string>('');
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

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

  const markCurrentTodoAsDone = (id: string) => {
    dispatch(markTodoAsDone({ id, currentWorkSpace }));
  };

  const deleteCurrentTodo = (id: string) => {
    dispatch(deleteTodo({ id, currentWorkSpace }));
  };

  useEffect(() => {
    if (!showBrowserWindow) {
      setQuery('');
    }
  }, [showBrowserWindow]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentDateTime(new Date());
    }, 1000);
  }, [currentDateTime]);

  return (
    <div className="flex-1 h-fit dark:bg-darker">
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
          className="flex flex-col items-center justify-center gap-5 overflow-scroll "
          style={{ height: '100%' }}
        >
          <div className="flex flex-col items-center gap-3 w-full ">
            <h1 className="text-5xl font-semibold dark:text-white">
              {moment(currentDateTime).format('LT')}
            </h1>
            <h1 className="text-xl font-medium dark:text-white">
              {moment(currentDateTime).format('MMMM Do YYYY')}
            </h1>
            <form
              className="flex items-center w-full justify-center mt-3 gap-2"
              onSubmit={onsubmit}
            >
              <select
                value={inputMode}
                onChange={(e) => setInputMode(e.target.value)}
                className="border-2 dark:border-dark dark:text-white px-1 py-1 rounded-md dark:bg-dark"
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
                className="border-2 dark:border-dark dark:bg-dark p-1 w-[25%] rounded-md placeholder:text-sm"
              />
              <button
                type="submit"
                className="border-2 dark:border-dark px-6 py-1 capitalize rounded-md dark:bg-dark dark:text-white"
              >
                {inputMode === InputModes[0] ? 'Search' : 'Add Todo'}
              </button>
            </form>
          </div>

          {workSpaceData[currentWorkSpace]?.todos?.length > 0 && (
            <div className="flex items-center gap-3">
              <p className="dark:text-white">Todos : </p>
              {workSpaceData[currentWorkSpace].todos.map((item, index) => (
                <div
                  key={index}
                  className="border-2 px-4 py-1 rounded-full flex items-center gap-3"
                >
                  {!item.done && (
                    <input
                      className="w-3 h-3 rounded-full"
                      onChange={() => markCurrentTodoAsDone(item.id)}
                      type="checkbox"
                      checked={item.done}
                    />
                  )}
                  <p
                    className="dark:text-white"
                    style={{
                      textDecoration: item?.done ? 'line-through' : 'none',
                    }}
                  >
                    {item.todo}
                  </p>
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
                <p className="text-base dark:text-white">
                  No Apps Added yet 🤔{' '}
                </p>
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
                  className="flex hover:border-gray-300 border-gray-100 dark:border-dark dark:bg-dark dark:text-white relative items-center gap-3 border-2 p-3 w-fit rounded-md"
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
