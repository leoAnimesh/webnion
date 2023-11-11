import WebView from '@/components/shared/WebView';
import useReduxValues from '@/hooks/redux/useReduxValues';

const MainRenderer = () => {
    const { workspaceApps, activeWebAppId } = useReduxValues();

    console.log(workspaceApps);


    return (
        <div className='flex flex-col overflow-hide border-l flex-1'>
            {workspaceApps.map((viewData) => (
                <WebView key={viewData.id} show={activeWebAppId === viewData.id} data={viewData} />
            ))}
        </div>
    )
}

export default MainRenderer