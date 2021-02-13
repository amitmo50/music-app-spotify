import React from 'react';
import {connect} from 'react-redux';

import AlbumCard from '../AlbumCard/AlbumCard';
import './CardList.css';
const CardList = ({MusicPlayerData, dispatch}) => {
    return(
        <div className="cards-content">
            {MusicPlayerData.newReleases.map((item, index) => {
                return <AlbumCard image={item.image} artist={item.artistName} releaseDate={item.releaseDate} albumName={item.albumName} key={index}/>
            })}
        </div>
    )
}


const mapStateToProps = ({MusicPlayerData}) => {
    return {MusicPlayerData}
}

export default connect(mapStateToProps)(CardList);