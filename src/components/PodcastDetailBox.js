import '../App.css';
import React from 'react';
import {useNavigate} from "react-router";

function PodcastDetailBox(props) {
    const navigate = useNavigate();
    const goToPodcastDetail = () => {
        navigate(`/podcast/${props.podcast.id}`, {state: {podcast: props.podcast}})
    }

    return (
        <>
            <div className={"podcast-detail-container box-style"} onClick={goToPodcastDetail}>
                <img className={"podcast-detail-img border-bottom-style"} src={props.podcast.image}
                     alt={"imagePodcast"}/>
                <h2 className={"border-bottom-style"}> {props.podcast.name}</h2>
                <p>{props.podcast.summary.label}</p>
            </div>
        </>
    );
}

export default PodcastDetailBox;
