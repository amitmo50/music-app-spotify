import React from 'react';
import {connect} from 'react-redux';

import {addToFavorite, removeFromFavorite} from '../../../store/actions/MusicPlayerActions';

const Favorite = ({ MusicPlayerData, dispatch, favoriteSong, songId }) => {
    const addedSong = MusicPlayerData.playLists[MusicPlayerData.currentPlaylist].songs[songId];
    const songName = addedSong.track.name;
    const isFavorite = favoriteSong(songId);
    return isFavorite ? (
      <i
        className="fa fa-heart"
        onClick={() => dispatch(removeFromFavorite(songName))}
        
      />
    ) : (
      <i
        className="fa fa-heart-o"
        onClick={() => dispatch(addToFavorite(addedSong))}
      />
    )
}


const mapStateToProps = ({MusicPlayerData}) => {
    return {MusicPlayerData}
}

export default connect(mapStateToProps)(Favorite);