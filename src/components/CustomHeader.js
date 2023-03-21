import {useNavigate} from 'react-router';
import React from 'react';
import Loading from "./Loading";

function CustomHeader(props) {
    const navigate = useNavigate()

    const goToMainPage = () => {
        navigate('/');
    }

    return (
        <>

            <section className={"header"}>
                <button className='home-button-title' onClick={goToMainPage}>Podcaster</button>
                {props.loading ? <Loading/> : <></>}
            </section>
        </>
    );
}

export default CustomHeader;
