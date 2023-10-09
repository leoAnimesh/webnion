import { Navigate, Route, Routes } from "react-router-dom"
import React, { Suspense } from "react"
import CircularLoader from "./components/shared/CircularLoader";

const Home = React.lazy(() => import('./pages/Home'));
const MainRenderer = React.lazy(() => import('./pages/MainRenderer'));

const LoadingScreen = () => {
    return (
        <div className="flex flex-1 h-screen justify-center items-center">
            <CircularLoader />
        </div>
    )
}

const App = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                <Route path="/" element={<Home />} >
                    <Route index element={<Navigate to="workspace" />} />
                    <Route path="workspace" element={<MainRenderer />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default App