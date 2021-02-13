import React, {useState} from 'react';
import {connect} from 'react-redux';


import {calcMillitoMinutes} from '../Utils/utils';
import './Content.css';
import PlayPause from '../PlayPause/PlayPause';
import Favorite from '../Favorite/Favorite';
import {getArtist} from '../Utils/utils';
import CardList from '../CardList/CardList';

const Content = ({MusicPlayerData, dispatch}) => {
    console.log('render Content');
    const [playVisibleId, setPlayVisibleId] = useState(false);
    const currentPlaylist = MusicPlayerData.currentPlaylist;
    const currentPlaylistSongs = MusicPlayerData.playLists[currentPlaylist].songs;
    const favoritePlaylist = MusicPlayerData.playLists['favorites'].songs;
    const favoriteSong = songId => {
        if(favoritePlaylist.length === 0){
            return false
        }
        if(favoritePlaylist.filter(song => currentPlaylistSongs[songId].track.name === song.track.name).length > 0){
            return true
        }
    }
  
    return(
        <div className="Content">
            <div className="user-controll-bar">
                <div className="search-bar" style={{visibility:MusicPlayerData.showSearch?"hidden":"visible"}}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                    <input placeholder="Search for artists, Songs"></input>
                </div>
                <div className="user-info">
                    <div className="user-pic">
                        {MusicPlayerData.loginUser.userImage? <img className="img-user" src={MusicPlayerData.loginUser.userImage} alt=""/>:
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>}
                        
                    </div>
                    <h4 className="user-name">{MusicPlayerData.loginUser.userName}</h4>
                </div>
            </div>
            {!MusicPlayerData.newReleaseClicked ?
            (<div className="content-heading">
                {(MusicPlayerData.playLists[currentPlaylist].playlistImageUrl !== "")?
                    (<img className="album-picture" alt="album" 
                    src={MusicPlayerData.playLists[currentPlaylist].playlistImageUrl}/>):null
                }
                <div className="body-heading">
                    <strong>PLAYLIST</strong>
                    <h2 className="playlist-title">{currentPlaylist}</h2>
                    <p className="description">{MusicPlayerData.playLists[currentPlaylist].description}</p>
                    <p className="description">{`${MusicPlayerData.playLists[currentPlaylist].amountOfSongs} Songs`}</p>
                </div>
                
            </div>):null}
            
            
            {!MusicPlayerData.newReleaseClicked ? (MusicPlayerData.playLists[currentPlaylist].amountOfSongs === 0 ?
                (<p style={{ marginTop: 25 }}>
                    Your playlist is empty. Start by adding some
                    songs...
                </p>):
                (<table>
                    <thead>
                        <tr>
                            <th/>
                            <th></th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Length</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentPlaylistSongs.map((song, index) => {
                        const songTitle = song.track.name;
                        let artistName = "";
                        let time = 0;
                        const pic = song.track.album.images[2].url;
                        if(currentPlaylistSongs){
                            artistName = getArtist(song);
                            time = calcMillitoMinutes(song.track.duration_ms);
                        }
                        return (
                            <tr className="songRow" key={index}>
                                <td
                                    onMouseEnter={() =>
                                        setPlayVisibleId(index)
                                    }
                                    onMouseLeave={() =>
                                        setPlayVisibleId('')
                                    }
                                    style={{ width: '75px', paddingLeft: '5px' }}
                                >
                                    <PlayPause
                                        playing={MusicPlayerData.playing}
                                        songId={index}
                                        isCurrentSong={
                                            MusicPlayerData.currentSongId === index
                                        }
                                        visible={playVisibleId === index}
                                    />
                                    <span style={{ marginRight: 10 }} />
                                    <Favorite
                                        favoriteSong={favoriteSong}
                                        songId={index}
                                    />
                                    
                                    {currentPlaylist === 'home'?(
                                        <>
                                        <span style={{ marginRight: 10 }} />
                                        <i
                                            className="fa fa-plus"
                                            // onClick={() => {
                                            //     dispatch({
                                            //     type: 'ADD_TO_PLAYLIST',
                                            //     songId: id
                                            //     })
                                            // }}
                                        />
                                        </>
                                    ):null}
                                </td>
                                <td><img style={{width: 20,height: 20, marginTop: 0, marginBottom: 0, padding: '0'}} alt="song-pic" src={pic}/></td>
                                <td>{songTitle}</td>
                                <td>{artistName}</td>
                                <td>{time}</td>
                            </tr>
                        )
                        })}
                    </tbody>
                  </table>
                )):<CardList/>
            }
            
        </div>
    )
}




const mapStateToProps = ({MusicPlayerData}) => {
    return {MusicPlayerData}
}

export default connect(mapStateToProps)(Content);