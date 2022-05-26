import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  /**
   * Adds a track fom the results to a playlist with no repeats
   * 
   * @param {Object} track 
   */
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    // if repeat, return
    if(tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    // if no repeat, add the track and set the state
    tracks.push(track);
    this.setState({ playlistTracks:tracks });
  }

  /**
   * Removes a track from the playlist
   * 
   * @param {Object} track 
   */
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(savedTrack => savedTrack.id !== track.id); 
    this.setState( { playlistTracks:tracks} );
  }

  /**
   * Updates the playlist name
   * 
   * @param {string} name 
   */
  updatePlaylistName(name) {
    this.setState( { playlistName:name } ) ;
  }

  // save the playlist
  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    });
  }

  /**
   * Uses the Spotify Implicit Grant Workflow to search for tracks using the Spotify API
   * 
   * @param {string} term 
   */
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
  }

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} 
                         onAdd={this.addTrack}  />
          <Playlist playlistName={this.state.playlistName} 
                    playlistTracks={this.state.playlistTracks} 
                    onRemove={this.removeTrack} 
                    onNameChange={this.updatePlaylistName} 
                    onSave={this.savePlaylist} />
        </div>
      </div>
    </div>
    );
    
  }
}

export default App;
