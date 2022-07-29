import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {
  newTime;
  song= {
    playing: false,
    name: '',
    preview_url: ''
  }
  searching = false;
  text = "ingrese una palabra";
  songs: any;
  currentSong: HTMLAudioElement;

  constructor(private modalController: ModalController, private musicService: MusicService) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalController.dismiss();
  }

  getTracks(keyword){
    this.searching = true;
    if(keyword.length > 0){
      this.musicService.searchTracks(keyword).subscribe(async resp =>{
        this.songs = resp;
        console.log(this.songs)
        if(this.songs.length === 0){
          this.text = "No se encontró ninguna canción"
        }
        this.searching = false;
      })
    }else{
      this.text = "Ingrese una palabra para buscar";
      this.songs = [];
    }
  }

  play(song){
    if(this.currentSong){
      this.pause();
    }
    this.song = song;
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.song.playing = true;
    this.currentSong.addEventListener('ended', () => this.song.playing = false);
  }

  pause(){
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
}



