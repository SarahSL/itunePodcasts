import React from 'react';
import '../App.css';
import '../components/CustomHeader'
import CustomHeader from "../components/CustomHeader";
import {useLocation} from "react-router";
import PodcastDetailBox from "../components/PodcastDetailBox";

function PodcastEpisode() {
    const location = useLocation();

    return (
        <>
            <CustomHeader loading={false}/>
            <section className={"podcast-episode"}>
                <PodcastDetailBox podcast={location.state.podcast}/>
                <div className={"podcast-episode-detail box-style"}>
                    <h2>{location.state.episode.trackName}</h2>
                    <p dangerouslySetInnerHTML={{ __html: `${location.state.episode.description} `}} className={"podcast-episode-detail-description"}/>
                    <audio controls>
                        <source src={location.state.episode.episodeUrl} type="audio/mpeg"/>
                    </audio>
                </div>
            </section>
        </>
    );
}

export default PodcastEpisode;
