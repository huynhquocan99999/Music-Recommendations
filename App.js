import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Listbox from './Listbox';
import Detail from './Detail';
import { Credentials } from './Credentials';
import {ExportReactCSV} from './Excal';
import axios from 'axios';
import "./App.css";

const App = () => {

  const spotify = Credentials();

  console.log('RENDERING APP.JS');
  const [token, setToken] = useState('');  
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
  const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
  const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});
  const [trackDetail, setTrackDetail] = useState(null);
  const [trackFeatures, setTrackFeatures] = useState({selectedFeature: Array[10], listOfFeaturesFromAPI: []});
  const [Excal,setExcal] = useState({ImportExcal: '', listExcal: []});
  const [trackDetail2, setTrackDetail2] = useState(null);
  useEffect(() => {
    
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);
      console.log("ABC");
      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (genreResponse => {        
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      });
      
    });

  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 

  const genreChanged = val => {
    setGenres({
      selectedGenre: val, 
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    });

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then(playlistResponse => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items
      })
    });

  }

  const playlistChanged = val => {
    console.log(val);
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    });
  }

  const buttonClicked = e => {
    e.preventDefault();
    
    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=100`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(tracksResponse => {
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: tracksResponse.data.items
      })
      console.log(tracksResponse);
    });
  }
    

  const listboxClicked = val => {

    const currentTracks = [...tracks.listOfTracksFromAPI];
    const trackInfo = currentTracks.filter(t => t.track.id === val);
    const trackInfo2 = currentTracks.filter(t =>{ return t.track.id})
    const ListFeatureID=[trackInfo2[0].track.id];
    console.log("test");
    const ListFeatureFromExcel1=[];
    console.log(val);
    setTrackDetail(trackInfo[0].track);
    //setTrackDetail2(trackInfo2[3].track);
    for(var i=1;i<trackInfo2.length;i++){
      
      const abcd =ListFeatureID.push(trackInfo2[i].track.id);
    }
   
    const ListFeatureFromExcel =ListFeatureID.toString();
    console.log(ListFeatureID);
    console.log(ListFeatureFromExcel);
    axios(`https://api.spotify.com/v1/audio-features?ids=${ListFeatureFromExcel}`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(FeaturesResponse => {
      setTrackFeatures({
        selectedFeature: trackFeatures.selectedFeature,
        listOfFeaturesFromAPI: FeaturesResponse.data.audio_features
      })
      
      console.log(FeaturesResponse);
    });
    
   Excal.listExcal = Excal.listExcal.concat( ListFeatureFromExcel1.concat(trackFeatures.listOfFeaturesFromAPI) );
   console.log(Excal.listExcal);
  }
  return (
    <div className="container">
      <form onSubmit={buttonClicked}>
          <div className="Genre" >
          <Dropdown label="Genre :" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
          </div>
          <div className="Playlist">
          <Dropdown label="Playlist :" options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
          </div>       
          <div className="Search">
            <button type='submit' className="Search1">
              Search
            </button>
          </div>
          <div className="row">
            <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
            {trackDetail && <Detail {...trackDetail} /> }
            <ExportReactCSV csvData={Excal.listExcal} fileName='Excel-file'/>
          </div>        
      </form>
    </div>
    //<Features options={trackFeatures.listOfFeaturesFromAPI} selectedValue={trackFeatures.selectedFeature}  />
    //{trackFeatures && <Features energy={trackFeatures.listOfFeaturesFromAPI}/>}
    //{trackDetail2 && <Detail {...trackDetail2} /> }
  );
}

export default App;