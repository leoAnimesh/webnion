import WebView from "@/components/shared/WebView";
import useReduxActions from "@/hooks/redux/useReduxActions";
import useReduxValues from "@/hooks/redux/useReduxValues";
import { useEffect, useState } from "react";

const MainRenderer = () => {
  const { allApps, activeWebAppId, activeWorkspaceIndex } = useReduxValues();
  const { setAllWorkSpaces, setAllApps } = useReduxActions();
  const [mount, setMount] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    await Promise.all([setAllWorkSpaces(), setAllApps()]);
  };

  useEffect(() => {
    if (mount) {
      setLoading(true);
      setAllApps().finally(() => setTimeout(() => setLoading(false), 500));
    }
  }, [activeWorkspaceIndex, allApps.length]);

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then(() => setMount(true))
      .finally(() => setTimeout(() => setLoading(false), 50));
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="flex flex-col overflow-hide flex-1">
      {allApps.map((viewData) => (
        <WebView
          key={viewData.appId}
          show={activeWebAppId === viewData.appId}
          data={viewData}
        />
      ))}
    </div>
  );
};

export default MainRenderer;
