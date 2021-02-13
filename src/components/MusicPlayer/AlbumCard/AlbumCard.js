import React from 'react';

import './AlbumCard.css';

const AlbumCard = ({artist, image, releaseDate, albumName}) => {

    return (
        <article className="card">
            <div className="cover" style={{backgroundImage: `url(${image})`}}>
                <div className="cover-text" >
                    Album
                </div>
                <div className="wrapper">
                    <button className="play-button"><i className="fas fa-play"></i></button>
                </div>
                <i className="watermark fab fa-spotify"></i>

            </div>
            <div className="description">
                <h2 className="card-name">{releaseDate}</h2>
                <h3 className="card-album-name">{albumName}</h3>
                <p className="card-about">{artist}</p>
            </div>
        </article>
    )
}

export default AlbumCard;