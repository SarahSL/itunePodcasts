import '../App.css';
import React from 'react';
import '../components/CustomHeader'
import CustomHeader from "../components/CustomHeader";
import {useState} from "react";

function Podcasts() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <CustomHeader loading={isLoading}/>
            <section></section>
        </>
    );
}

export default Podcasts;
