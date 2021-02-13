const DEFAULT_PLAYLIST = "favorites";
const DEFAULT_VOLUME = 0.65;
const initialPlaylistState = {
    accessToken: "",
    currentPlaylist: DEFAULT_PLAYLIST,
    currentSongId: '',
    currentSongPlay: "",
    device:"",
    playing: false,
    shuffle: false,
    repeat: false,
    showSearch: false,
    loginUser: {},
    newReleases: [],
    newReleaseClicked: false,
    playLists: {   
        favorites: {
            songs:[],
            playlistImageUrl: 'https://cdn.playlists.net/images/playlists/image/medium/673e299a03f8fa20f478fb171a102ef6.jpg',
            amountOfSongs:0,
            description: "My Favorite Songs",
        },
    },
    volume: DEFAULT_VOLUME
}

const MusicPlayerReducer = (state = initialPlaylistState, action) => {
    const {type, payload} = action;

    switch (type) {
        case 'LOGIN_USER': 
            return{
                ...state,
                loginUser: payload.userInfo,
            }
        
        case 'SET_PLAY_DEVICE': 
            return {
                ...state,
                device: payload.device
            }
        
        case 'ADD_PLAYLIST': 
            return {
                ...state,
                playLists: {
                    ...state.playLists,
                    [payload.playlistName]: {
                        songs:"",
                        playlistImageUrl: "https://images.8tracks.com/cover/i/008/822/503/11067513_795328067183788_6873783629470273312_n-7055.jpg?rect=0,0,600,600&q=98&fm=jpg&fit=max",
                        amountOfSongs: 0,
                        description: "",
                    },
                },
            }
        
        case 'SHOW_SEARCH_BAR': 
            return {
                ...state,
                showSearch: !state.showSearch
            }
        
        case 'SET_REPEAT_PLAY': 
            return {
                ...state,
                repeat: !state.repeat
            }
        
        case 'SET_SHUFFLE_PLAY': 
            return {
                ...state,
                shuffle: !state.shuffle
            }
        
        case 'SET_DISCOVER_WEEKLY': 
    
            return {
                ...state,
                playLists: {
                    ...state.playLists,
                    [payload.weeklyPlaylist.name]: {
                        songs:payload.weeklyPlaylist.tracks.items,
                        playlistImageUrl: payload.weeklyPlaylist.images[0].url,
                        amountOfSongs: payload.weeklyPlaylist.tracks.total,
                        description: payload.weeklyPlaylist.description,
                    }
                },
            }
        
        case 'PLAYLIST_ACTIVE': 
            return {
                ...state,
                currentPlaylist:payload.playlistName,
            }
        case 'SET_RELEASE_VISABLE': 
            return {
                ...state,
                newReleaseClicked:payload.state,
            }
        case 'ADD_PLAYLIST_DATA': {
            return {
                ...state,
                playLists: {
                    ...state.playLists,
                    [payload.name]: {
                        songs:payload.songs,
                        playlistImageUrl: payload.imageUrl,
                        amountOfSongs: payload.amountOfSongs,
                        description: payload.description,
                    }
                },
            }
        }
        case 'PLAY':
            return {
                ...state,
                playing: true,
                currentSongId: payload.songId || state.currentSongId,
                currentSongPlay: state.playLists[state.currentPlaylist].songs[payload.songId]
        }
        case 'PAUSE':
            return { 
                ...state, 
                playing: false 
        }
        case 'SET_VOLUME':
            return { 
                ...state, 
                volume: parseFloat(payload.volume) 
        }
        case 'ADD_FAVORITE':
            return {
                ...state,
                playLists: {
                    ...state.playLists,
                    favorites: {
                        ...state.playLists.favorites,
                        songs:[...state.playLists.favorites.songs, payload.addedSong],
                        amountOfSongs: state.playLists.favorites.amountOfSongs + 1
                    }
                }
        }
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                playLists: {
                    ...state.playLists,
                    favorites: {
                        ...state.playLists.favorites,
                        songs:state.playLists.favorites.songs.filter(
                            song => song.track.name !== payload.songName),
                        amountOfSongs: state.playLists.favorites.amountOfSongs - 1
                    }
                }
            }
        case 'SET_NEW_RELEASE': 
            return {
                ...state,
                newReleases: payload.newReleases,
            }
        case 'SAVE_ACCESSTOKEN':
            return {
                ...state,
                accessToken: payload.accessToken,
            }
        default: {
            return state;
        }
    }
}

export default MusicPlayerReducer;