import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Podcasts from "./pages/Podcasts";


function App() {
    return (
        <main className={"main"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Podcasts/>}></Route>
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
