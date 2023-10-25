import WebView from '@/components/shared/WebView';
import useReduxValues from '@/hooks/redux/useReduxValues';

const MainRenderer = () => {
    const { workspaceApps, activeWebAppIndex } = useReduxValues();

    return (
        <div className='flex flex-col overflow-hide border-l flex-1'>
            {workspaceApps.map((viewData, idx) => (
                <WebView key={viewData.id} show={activeWebAppIndex === idx} data={viewData} />
            ))}
        </div>
    )
}

export default MainRenderer