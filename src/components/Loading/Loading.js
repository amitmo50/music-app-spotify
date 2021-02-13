import React from 'react';
import './Loading.css';
import LoadingGif from '../../assets/loading/loading.gif';

const Loading = () => {
    return (
        <div className="loading-container"><img className="loading-gif" src={LoadingGif} alt="Loading..."/></div>
    )
}

export default Loading;