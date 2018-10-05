import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';

let defaultStyle = {
  color: '#fff',
}

let fakeserverData = {
                      user : {
                        name:'Allan',
                        playlists: [
                        {
                          name: 'MyFavs',
                          songs: [{name:'Yo', duration: 1234},{name : ' yo yo yoy oii',duration: 45623},{name: 'killa cam',duration: 12345}]
                       }
                       ]
                     }
                    };



class PlaylistCounter extends Component{
  render() {
    return (
            <div style={{...defaultStyle, width: '40%', display: 'inline-block'}} 
            className="aggregate">
              <h2>{this.props.playlists.length} Playlists</h2>
            </div>
      );
  }
}


class HoursCounter extends Component{
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist)=>{
      return songs.concat(eachPlaylist.songs)
    },[]);

    let totalhours = Math.floor((allSongs.reduce((sum,eachSong)=> {return sum + eachSong.duration},0))/3600)
    
    return (
            <div style={{...defaultStyle, width: '40%', display: 'inline-block'}} 
            className="aggregate">
              <h2>{totalhours} Hours</h2>
            </div>
      );
  }
}


class Filter extends Component{
  render() {
    


    return (
          <div style={defaultStyle}>
            <img/>
              <input type = 'text' onKeyUp={event =>this.props.onTextChange(event.target.value)}/>
          </div>

      );
  }}

class Playlist extends Component{
  render() {
    
    return(
        <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
          <img src = {this.props.playlist.image} style={{width :'160px'}}/>
            <h3>{this.props.playlist.name}</h3>
            <ul >
            {
              this.props.playlist.songs.slice(0,3).map(song=><li>{song.name}</li>)
            }
            </ul>
        </div>
      )
    }
  }


class App extends Component {

  constructor(){
    super();
    this.state = { 
      serverData: {},
      filterString: ''
    }
  }

  componentDidMount(){
    let accessToken =queryString.parse(window.location.search).access_token;
    
    if(!accessToken)
    {
      return;
    }
    var userID;
    var username;

    fetch('https://api.spotify.com/v1/me', {
      headers:{'Authorization' : 'Bearer ' + accessToken }})

    .then((response)=> response.json())
    .then((data)=> {
        this.setState({serverData : {user :{name:data.display_name}}})
        username = data.display_name;
        userID = data.id;
       
      });
    
    
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers:{'Authorization' : 'Bearer ' + accessToken }})

    .then((response)=> response.json())
    .then((data)=>{
        let playlists = [];
        let playlistobject = {};
        let songsarray = [];
        var songsobject = {}
        var duration = 0;

        data.items.map(item=>{
        
          //get all the songs in the playlist
          let playlistname = item.name;
          fetch('https://api.spotify.com/v1/playlists/'+item.id+'/tracks', {
              headers:{'Authorization' : 'Bearer ' + accessToken }})
          .then((response)=>response.json())
          .then((data)=>{
                
                songsobject = {}
                songsarray = [];
                songsobject = data.items.map((item)=>{
                      return({name: item.track.name, duration: item.track.duration_ms});
                    });
                playlists.push({'name': item.name,'image' : item.images[0].url, 'songs' : songsobject})
                this.setState({serverData: {user:{'name' : username, 'playlists' : playlists}}});
          });
              //console.log(songsobject);
              //playlists.push({'name': item.name,'image' : item.images[0].url, 'songs' : songsobject})
              //console.log("playlist is")
              // playlists.push({'name': item.name,'image' : item.images[0].url, 'songs' : [songsobject]})
              //console.log(playlists)        
        });
        
    });
    
   }



  render() {
        var test = function(){}

    let playlistsToRender = 
      this.state.serverData.user && this.state.serverData.user.playlists
       ? this.state.serverData.user.playlists.filter((playlist)=>{
            
            let playlistmatch = playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase());
            //var tracksmatch;

            let tracksmatch = playlist.songs.find((song)=>song.name.toLowerCase().includes(this.state.filterString.toLowerCase()))


            return (playlistmatch || tracksmatch)



          })
       : []
    return (
      <div className="App">

      { this.state.serverData.user ?


        <div>

          <h1 style={{...defaultStyle, 'font-size' : '54px'}}>
          {this.state.serverData.user.name}'s Playlist
          </h1>

          <PlaylistCounter playlists= {playlistsToRender} /> 

          <HoursCounter playlists= {playlistsToRender} /> 
          
          <Filter onTextChange = {text=> this.setState({filterString : text})}/>
          
          {playlistsToRender.map(playlist =>
          
          <Playlist playlist = {playlist}/>    
          
          )}

     

      </div> : <button onClick = {()=>{
        window.location = window.location.href.includes('localhost') 
        ? "http://localhost:8888/login" 
        : window.location = "https://allanplaylists-backend.herokuapp.com/login"
      }}
      >Click Me</button>
      
      
        
    }
    </div>
    );
  }
}

export default App;
