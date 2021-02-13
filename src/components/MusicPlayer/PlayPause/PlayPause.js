import React from 'react';
import {connect} from 'react-redux';

import {playSong, pauseSong} from '../../../store/actions/MusicPlayerActions';

const PlayPause = ({ MusicPlayerData, dispatch, playing, songId, isCurrentSong, visible }) => {
    
    const style = { visibility: visible ? 'visible' : 'hidden' }
  
    if (isCurrentSong && playing) {
      return (
        <i
          className="fa fa-pause"
          onClick={() => dispatch(pauseSong())}
          style={style}
        />
      )
    } else {
      return (
        <i
          className="fa fa-play"
          onClick={() => dispatch(playSong(songId))}
          style={style}
        />
      )
    }
}

const mapStateToProps = ({MusicPlayerData}) => {
    return {MusicPlayerData}
}

export default connect(mapStateToProps)(PlayPause);