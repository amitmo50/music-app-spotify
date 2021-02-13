export const calcMillitoMinutes = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
export const getArtist = (song) => {
    let artistName = "";
    if(song.track.artists.length === 1){
        artistName = song.track.artists[0].name;
    }else{                                
        song.track.artists.forEach(artist => {
            artistName += artist.name + " & ";
            
        })
        artistName = artistName.slice(0, -3);                                
    }
    return artistName;
}