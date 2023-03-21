import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Podcasts from "./pages/Podcasts";
import PodcastDetail from "./pages/PodcastDetail";
import PodcastEpisode from "./pages/PodcastEpisode";


function App() {
    return (
        <main className={"main"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Podcasts/>}></Route>
                    <Route path="/podcast/:podcastId" element={<PodcastDetail/>}></Route>
                    <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastEpisode/>}></Route>
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
