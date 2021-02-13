import React, {useEffect, useState} from 'react';
import './MusicPlayer.css';
import {connect} from 'react-redux';

import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';
import Playbar from './Playbar/Playbar';
import Loading from '../Loading/Loading';
import SpotifyWebApi from 'spotify-web-api-js';
import queryString from 'query-string';

import { loginUser, addPlaylistData, setActivePlayDevice, setDiscoverWeekly, setNewReleaseAlbums, saveAccessToken } from '../../store/actions/MusicPlayerActions';
const spotify = new SpotifyWebApi();

const MusicPlayer = ({MusicPlayerData, dispatch}) => {
    console.log('render MusicPlayer');
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 6000);
    }, [])

    useEffect(() => {
        dispatch(saveAccessToken(accessToken));
        if (accessToken !== 'undefined'){
            spotify.setAccessToken(accessToken);
        
            spotify.getMe().then(user => {
                
                let userInfo = {
                    userName: user.display_name,
                    userImage: user.images[0].url
                }

                dispatch(loginUser(userInfo));
            });
            spotify.getUserPlaylists().then( playlists => {
                
                let playlistsData = playlists.items;
                let trackDataPromises = playlistsData.map((promiseItem) => {
                    let responsePromise = spotify.getPlaylistTracks(promiseItem.id);
                    
                    return responsePromise
                });

                let allTracksDataPromise = Promise.all(trackDataPromises);
                    let allPlaylistData = allTracksDataPromise.then(trackDatas => {
                        trackDatas.forEach((trackData, index) =>{
                            playlistsData[index].tracksData = trackData;
                            if(playlists.items[index].description !== "undefined"){
                                playlistsData[index].description = playlists.items[index].description;
                            }else{
                                playlistsData[index].description = "";
                            }
                            
                        });
                        return playlistsData;
                        
                    })
                    return allPlaylistData;
                
            }).then(userPlaylistsData => {
                userPlaylistsData.forEach(playlist => {
                    dispatch(addPlaylistData(playlist.name, playlist.tracksData.items, playlist.tracks.total, playlist.images[0].url, playlist.description));
                })
            });
           
            spotify.getMyDevices()
            .then(data => {
                    let device = "";
                    
                    if(data.devices.length > 0) {
                        device = {
                            id: data.devices[0].id,
                            name: data.devices[0].name,
                            volume: data.devices[0].volume_percent
                        }
                    } 
                    dispatch(setActivePlayDevice(device));
            });

            spotify.getPlaylist("4GpBODwgLjOwL6JcBunQcr").then((response) => {
                dispatch(setDiscoverWeekly(response));
            });

            spotify.getNewReleases({country: "IL", limit: 50, offset: 0})
            .then(res => res)
            .then(albums => albums.albums.items)
            .then(albumData => {
                let albums = albumData.map(item => {
                    return(
                        {
                            image: item.images[2].url,
                            releaseDate: item.release_date,
                            albumName: item.name,
                            amountOfSongs: item.total_tracks,
                            artistName: item.artists[0].name,
                            songs: [],
                        }
                    )
                });
                albumData.forEach((album, index) => {
                    spotify.getAlbum(album.id)
                    .then(albumTracks => {
                        albums[index].songs = albumTracks.tracks.items;
                    });
                });
                dispatch(setNewReleaseAlbums(albums));

            });    
            
        } 
    },[accessToken,dispatch]);
    
    return (
        <>
        {loading === false ? (<div className="MusicPlayer">
            <Sidebar/>
            <Content/>
            <Playbar/>
        </div>):
        (<Loading/>)
        }
        </>
    ) 

}

const mapStateToProps = ({MusicPlayerData}) => {
    return {MusicPlayerData}
}

export default connect(mapStateToProps)(MusicPlayer);