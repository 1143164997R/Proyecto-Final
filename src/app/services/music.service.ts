import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as artist from './artists.json';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  url_server="https://music-back-seminario.herokuapp.com/";
  header = {'Access-Control-Request-Headers': '*'};
  httpHeader = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }
  
  constructor(
	private http: HttpClient
  ) { }

  getArtistsFromJson(){
    return artist;
  }

  getArtists() {
    return fetch(`${this.url_server}artists`, { 
      mode: 'cors' , 
      headers: this.header
    }).then(
      (response) => response.json()
    );
  }

  getAlbums(){
    return fetch(`${this.url_server}albums`,{
      mode: 'cors',
      headers: this.header
    }).then(
      (albums) => albums.json()
    );
  }

  getArtistTracks(artist_id) {
    return fetch(`${this.url_server}tracks/artist/${artist_id}`, { 
      mode: 'cors' , 
      headers: this.header
    } ).then(
      (albums) => albums.json()
    );
  }

  searchTracks(keyword){
    let params = {
      "track":{
        "q":keyword
      }
    }
    return this.http.post(`${this.url_server}search_track`, params, this.httpHeader)
  }
}