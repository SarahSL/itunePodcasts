import {useNavigate} from 'react-router';

function CustomHeader() {
    const navigate = useNavigate()

    const goToMainPage = () => {
        navigate('/');
    }

    return (
        <>
            <section className={"header"}>
                <button className='home-button-title' onClick={goToMainPage}>Podcaster</button>
            </section>
        </>
    );
}

export default CustomHeader;
