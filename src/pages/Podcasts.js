import '../App.css';
import React from 'react';
import '../components/CustomHeader'
import CustomHeader from "../components/CustomHeader";
import {useEffect, useState} from "react";
import Api from "../services/Api";
import {PodcastObject} from "../model/PodcastObject"
import {useNavigate} from "react-router";

function Podcasts() {
    const [podcasts, setPodcasts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const lastTimeFetchedData = localStorage.getItem('lastTimeFetchedData');

        if (!lastTimeFetchedData || (new Date() - new Date(lastTimeFetchedData)) > 24 * 60 * 60 * 1000) {
            fetchPodcasts()
        } else {
            const savedPodcasts = localStorage.getItem('podcasts');
            setPodcasts(JSON.parse(savedPodcasts, new PodcastObject()));
        }
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPodcasts = podcasts.filter((podcast) => {
        const nameMatch = podcast.name.toLowerCase().includes(searchTerm.toLowerCase());
        const artistMatch = podcast.artist.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || artistMatch;
    });

    const fetchPodcasts = async () => {
        setIsLoading(true)
        const podcasts = await Api.getPodcasts()
        localStorage.setItem("podcasts", JSON.stringify(podcasts))
        localStorage.setItem("lastTimeFetchedData", new Date().toISOString())
        setPodcasts(podcasts)
        setIsLoading(false)
    }
    const goToPodcastDetail = (podcast) => {
        navigate(`/podcast/${podcast.id}`, {state: {podcast: podcast}})
    }

    return (
        <>
            <CustomHeader loading={isLoading}/>
            <section className={"podcasts"}>
                <div className={"podcasts-filter-container"}>
                    <p className={"podcasts-search-text"}>{filteredPodcasts.length}</p>
                    <input placeholder={"Filter podcasts..."} className={"podcasts-search-input"} type={"search"}
                           onChange={handleSearchChange}/>
                </div>
                <div className={"podcasts-container"}>
                    {filteredPodcasts ?
                        filteredPodcasts.map((pod, index) => {
                            return (
                                <div className={"podcasts-item"} key={index} onClick={() => goToPodcastDetail(pod)}>
                                    <img className={"podcasts-item-img"} src={pod.image} alt={"imagePodcast"}/>
                                    <div className={"podcasts-item-text"}>
                                        <p style={{fontWeight: 'bold'}}>{pod.name}</p>
                                        <p>Author: {pod.artist}</p>
                                    </div>
                                </div>
                            )
                        }) : <></>
                    }
                </div>

            </section>
        </>
    );
}

export default Podcasts;
