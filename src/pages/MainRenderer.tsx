import WebView from '@/components/shared/WebView';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToActiveApps } from '@/redux/slices/WebAppsSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const MainRenderer = () => {
    const { index } = useParams();
    const activeIndex: number = parseInt(index as string);
    const dispatch = useAppDispatch();
    const [mount, setMount] = useState(false);
    const { apps, activeApps } = useAppSelector(state => state.webApps);

    const DynamicLinks = Object.entries(apps).map(item => item[1])

    useEffect(() => {
        setMount(true)
    }, [])

    useEffect(() => {
        if (mount) {
            dispatch(addToActiveApps({ index: activeIndex, webApp: DynamicLinks[activeIndex] }))
        }
    }, [index])

    return (
        <div className='flex flex-col overflow-hide flex-1'>
            {activeApps.map((viewData, idx) => (
                <WebView key={idx} show={activeIndex === idx} data={viewData} />
            ))}
        </div>
    )
}

export default MainRenderer