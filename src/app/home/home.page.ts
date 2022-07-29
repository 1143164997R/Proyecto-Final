import { Component } from '@angular/core';
import { MusicService } from '../services/music.service';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { SearchModalPage } from '../search-modal/search-modal.page';
import {artists} from '../services/artists.json';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  artists: any;
  artistsjson: any;
  artistsFromJson: any;
  albums: any;
  test:any;
  currentSong: HTMLAudioElement;
  newTime;

  slideOps = {
    initialSlide: 1,
    slidesPerView: 3,
    centeredSlides: true,
    speed: 400
  }

  song = {
    playing: false,
    name: '',
    preview_url: ''
  }
  
  
  constructor(
    private musicService: MusicService,
    private modalController: ModalController) {}

  ionViewDidEnter(){
    //Lista artistas api
    this.musicService.getArtists().then(listArtists =>{
      this.artists = listArtists;
    });

    //Lista artistas apijson. NO SE COMO MOSTRARLO
    this.artistsFromJson = this.musicService.getArtistsFromJson();
    this.test = this.artistsFromJson.artists;
    
    //albums api
    this.musicService.getAlbums().then(listAlbums =>{
      this.albums = listAlbums;
    })
  }

  async showJsonArtistSongs(test){
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps:{
        images: test.images.url,
        artist: test.name
      }
    });
    modal.onDidDismiss().then( dataReturned => {
      this.song = dataReturned.data
    })
    return await modal.present();
  }

  async showArtistSongs(artist){
    const songs = await this.musicService.getArtistTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps:{
        songs: songs,
        artist: artist.name
      }
    });
    modal.onDidDismiss().then( dataReturned => {
      this.song = dataReturned.data
    })
    return await modal.present();
  }

  async showAlbumSongs(album){
    const songs = await this.musicService.getArtistTracks(album.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps:{
        songs: songs,
        artist: album.name
      }
    });
    modal.onDidDismiss().then( dataReturned => {
      this.song = dataReturned.data
    })
    return await modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = (1 / this.currentSong.duration ) * this.currentSong.currentTime;
    })
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }


  parseTime( time = "0.00") {
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime / 60 ).toString();
      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60 ).toString();
      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    }
  }

  async openSearchModal(){
    const modal = await this.modalController.create({
      component: SearchModalPage
    });
    modal.present();
  }
}
