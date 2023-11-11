import { useEffect, useState } from "react";

interface useWebActionsProps {
    webViewRef: any
}

interface useWebActionsReturn {
    goBack: () => void
    canGoBack: () => boolean
    goToHome: () => void
    goForward: () => void
    reload: () => void
    openDevTools: () => void
    copy: () => void
    paste: () => void
    insertCss: (css: string) => void
    insertJavasript: (js: string) => void
    urlDetails: { domain: string, protocol: string }
}

const useWebActions = ({ webViewRef }: useWebActionsProps): useWebActionsReturn => {
    const [mount, setMount] = useState(false);
    const [urlDetails, setUrlDetails] = useState<{ domain: string, protocol: string }>({ domain: '', protocol: '' });

    const reload = () => {
        webViewRef.current.reloadIgnoringCache();
    }

    const goBack = () => {
        webViewRef.current.goBack();
    };

    const canGoBack = () => {
        if (mount === false) return false;

        if (webViewRef.current.canGoBack()) {
            return true;
        }
        return false;
    }

    const goToHome = () => {
        // TODO : Implement go to Home
        return;
    }

    const goForward = () => {
        webViewRef.current.goForward();
    };

    const openDevTools = () => {
        webViewRef.current.openDevTools();
    };

    const copy = () => {
        webViewRef.current.copy();
    }

    const paste = () => {
        webViewRef.current.paste();
    }

    const insertCss = (css: string) => {
        webViewRef.current.insertCSS(css);
    }

    const insertJavasript = (js: string) => {
        webViewRef.current.executeJavaScript(js);
    }

    const getDomainDetails = () => {
        const url = webViewRef.current.getURL();
        const domain = new URL(url).hostname;
        const protocol = new URL(url).protocol;
        setUrlDetails({ domain, protocol });
    }


    const handleMount = () => {
        getDomainDetails();
        setMount(true);
    }

    useEffect(() => {
        webViewRef?.current?.addEventListener('dom-ready', handleMount)
        return () => {
            webViewRef?.current?.removeEventListener('dom-ready', handleMount)
        }
    }, [])

    return {
        goBack,
        canGoBack,
        goToHome,
        goForward,
        reload,
        openDevTools,
        copy,
        paste,
        insertCss,
        insertJavasript,
        urlDetails,
    }

}

export default useWebActions