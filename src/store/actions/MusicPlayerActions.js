
export const addPlaylist = (playlistName) => {
    return {
        type: "ADD_PLAYLIST",
        payload: {playlistName}
    }
}

export const activePlayList = (playlistName) => {
    return {
        type: "PLAYLIST_ACTIVE",
        payload: {playlistName}
    }
}

export const addPlaylistData = (name, songs, amountOfSongs, imageUrl, description) => {
    return {
        type: "ADD_PLAYLIST_DATA",
        payload: {name, songs, amountOfSongs, imageUrl, description}
    }
}

export const playSong = (songId) => {
    return {
        type: "PLAY",
        payload: {songId}
    }
}

export const pauseSong = () => {
    return {
        type: "PAUSE",
    }
}

export const setVolumeState = (volume) => {
    return {
        type: "SET_VOLUME",
        payload: {volume}
    }
}

export const addToFavorite = (addedSong) => {
    return {
        type:"ADD_FAVORITE",
        payload: {addedSong}
    }
}

export const removeFromFavorite = (songName) => {
    return {
        type:"REMOVE_FAVORITE",
        payload: {songName}
    }
}

export const loginUser = (userInfo) => {
    return {
        type:"LOGIN_USER",
        payload: {userInfo}
    }
}

export const setRepeatPlay = () => {
    return {
        type:"SET_REPEAT_PLAY",
    }
}

export const setSufflePlay = () => {
    return {
        type:"SET_SHUFFLE_PLAY",
    }
}

export const setDiscoverWeekly = (weeklyPlaylist) => {
    return {
        type: "SET_DISCOVER_WEEKLY",
        payload: {weeklyPlaylist}
    }
}

export const showSearchBar = () => {
    return {
        type:"SHOW_SEARCH_BAR",
    }
}

export const setActivePlayDevice = (device) => {
    return {
        type: "SET_PLAY_DEVICE",
        payload: {device}
    }
}

export const setNewReleaseAlbums = (newReleases) => {
    return {
        type: "SET_NEW_RELEASE",
        payload: {newReleases}
    }
}
export const setVisabilityRelease = (state) => {
    return {
        type: "SET_RELEASE_VISABLE",
        payload: {state}
    }
}
export const saveAccessToken = (accessToken) => {
    return {
        type: "SAVE_ACCESSTOKEN",
        payload: {accessToken}
    }
}