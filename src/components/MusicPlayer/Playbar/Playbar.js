import React, {useCallback} from 'react';
import {connect} from 'react-redux';

import './Playbar.css';
import {calcMillitoMinutes} from '../Utils/utils';
import {playSong, pauseSong, setVolumeState, setSufflePlay, setRepeatPlay} from '../../../store/actions/MusicPlayerActions';
import {getArtist} from '../Utils/utils';
//  Icons for playbar
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';

const Playbar = ({MusicPlayerData, dispatch}) => {
    console.log('render Playbar');
  
    const playOrPause = () => {
        if(MusicPlayerData.currentSongId){
            MusicPlayerData.playing ? dispatch(pauseSong()) : dispatch(playSong());
        }
        
    }

    const setVolume = useCallback(e =>{
            dispatch(setVolumeState(e.target.value))
        },
        [dispatch]
    )

  
    const currentSongId = MusicPlayerData.currentSongId;

    const getSongDuration = () => {
        let duration = 0;
        if(MusicPlayerData.currentSongPlay){
            duration = MusicPlayerData.currentSongPlay.track.duration_ms;
            
        }
        return duration;
    }
    const handleProgress = (currentTime, duration) => 600 * (currentTime / duration);

    return(
        <div className="Playbar">
            <div className="left">
                {MusicPlayerData.currentSongPlay?<>
                    <img className="album-image" src={MusicPlayerData.currentSongPlay.track.album.images[2].url} alt="picutre"/>
                    <div className="song-details">
                        <h5 className="song-name">{MusicPlayerData.currentSongPlay.track.name}</h5>
                        <p className="artist">{getArtist(MusicPlayerData.currentSongPlay)}</p>
                    </div>
                </>: null}
            </div>
            <div className="middle">
                <div className="control-panel">
                    <ShuffleIcon onClick={() => dispatch(setSufflePlay())} style={{color: MusicPlayerData.shuffle? "#2a9df4": "#fff"}} className="shuffle"/>
                    <SkipPreviousIcon className="previous"/>
                    {MusicPlayerData.playing ? (<PauseCircleOutlineIcon fontSize="large" className="play-pause-circle" onClick={playOrPause}/>):(<PlayCircleOutlineIcon fontSize="large" className="play-pause-circle" onClick={playOrPause}/>)}
                    <SkipNextIcon className="next"/>
                    <RepeatIcon onClick={() => dispatch(setRepeatPlay())} style={{color: MusicPlayerData.repeat? "#2a9df4": "#fff"}} className="repeat"/>
                </div>
                <div style={{ marginTop: 2.5 }}>
                    <span>{calcMillitoMinutes(0)}</span>

                    <div className="progress-container">
                        <div
                        className="bar"
                        style={{
                            width: MusicPlayerData.currentSongPlay !== ""? handleProgress(0, getSongDuration()) : 0
                        }}
                        />
                    </div>

                    {currentSongId?(<span>{calcMillitoMinutes(getSongDuration())}</span>):null}
                </div>
            </div>
            <div className="right">
                    <i className="fa fa-volume-up" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        value={MusicPlayerData.volume}
                        step="0.01"
                        style={{ marginLeft: 5 }}
                        onChange={setVolume}
                        className="volum"
                    />
                </div>
        </div>
    )
}

//export default Playbar;
const mapStateToProps = ({MusicPlayerData}) => {
    return {MusicPlayerData}
}

export default connect(mapStateToProps)(Playbar);