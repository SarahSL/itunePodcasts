import '../App.css';
import React from 'react';
import '../components/CustomHeader'
import CustomHeader from "../components/CustomHeader";
import {useLocation, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import Api from "../services/Api";
import PodcastEpisodeObject from "../model/PodcastEpisodeObject";
import PodcastDetailBox from "../components/PodcastDetailBox";

function PodcastDetail() {
    const [podcastEpisodes, setPodcastEpisodes] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const {podcastId} = useParams();

    useEffect(() => {
        const lastTimeFetchedData = localStorage.getItem(`lastTimeFetchedDataDetail${podcastId}`);

        if (!lastTimeFetchedData || (new Date() - new Date(lastTimeFetchedData)) > 24 * 60 * 60 * 1000) {
            fetchDetail(podcastId)
        } else {
            const savedPodcastEpisodes = localStorage.getItem(podcastId);
            setPodcastEpisodes(JSON.parse(savedPodcastEpisodes, new PodcastEpisodeObject()));
        }

    }, [podcastId])
    const fetchDetail = async (podcastId) => {
        setIsLoading(true)
        let detail = await Api.getPodcastDetail(podcastId)
        localStorage.setItem(podcastId, JSON.stringify(detail))
        localStorage.setItem(`lastTimeFetchedDataDetail${podcastId}`, new Date().toISOString())
        setPodcastEpisodes(detail)
        setIsLoading(false)
    }

    const formatTime = (millis) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    const formatToCalendar = (strDate) => {
        return new Date(strDate).toLocaleDateString('es-ES')
    }

    const goToDetailEpisode = (episode) => {
        navigate(`/podcast/${location.state.podcast.id}/episode/${episode.id}`,
            {state: {podcast: location.state.podcast, episode: episode}})
    }

    return (
        <>
            <CustomHeader loading={isLoading}/>
            <section className={"podcast-detail"}>
                <PodcastDetailBox podcast={location.state.podcast}/>
                <div className={"podcasts-episodes"}>
                    <h2 className={"box-style"}> Episodes: {podcastEpisodes ? podcastEpisodes.length : 0}</h2>
                    <div className={"box-style"}>
                        <table className={"table-episodes"}>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Duration</th>
                            </tr>
                            </thead>
                            <tbody>
                            {podcastEpisodes ? podcastEpisodes.map((epi, index) => {
                                return (
                                    <tr key={index}>
                                        <td onClick={() => goToDetailEpisode(epi)}> {epi.trackName}</td>
                                        <td>{formatToCalendar(epi.releaseDate)}</td>
                                        <td>{formatTime(epi.trackTimeMillis)}</td>
                                    </tr>
                                )
                            }) : <></>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PodcastDetail;
