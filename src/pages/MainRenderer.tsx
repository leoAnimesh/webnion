import WebView from '@/components/shared/WebView';
import useReduxActions from '@/hooks/redux/useReduxActions';
import useReduxValues from '@/hooks/redux/useReduxValues';
import { useEffect, useState } from 'react';

const MainRenderer = () => {
    const { activeAppIndex, activeWorkspaceIndex, activeApps } = useReduxValues();
    const { MountToActiveApps, loadCurrentActiveeWebApp } = useReduxActions();
    const [mount, setMount] = useState(false);

    useEffect(() => {
        loadCurrentActiveeWebApp();
        setMount(true)
    }, [])

    useEffect(() => {
        if (mount) {
            MountToActiveApps();
        }
    }, [activeAppIndex])

    useEffect(() => {
        if (mount) {
            loadCurrentActiveeWebApp();
        }
    }, [activeWorkspaceIndex])

    return (
        <div className='flex flex-col overflow-hide border-l flex-1'>
            {activeApps.map((viewData, idx) => (
                <WebView key={idx} show={activeAppIndex === idx} data={viewData} />
            ))}
        </div>
    )
}

export default MainRenderer