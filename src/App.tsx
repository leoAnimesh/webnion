import { Navigate, Route, Routes } from "react-router-dom"
import loadable from '@loadable/component';

const Home = loadable(() => import('./pages/Home'))
const MainRenderer = loadable(() => import('./pages/MainRenderer'));



const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} >
                <Route index element={<Navigate to="workspace" />} />
                <Route path="workspace" element={<MainRenderer />} />
            </Route>
        </Routes>
    )
}

export default App