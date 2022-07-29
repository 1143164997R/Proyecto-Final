import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit{

  slideOpt={
    initialSlide: 0, //Slide inicial
    slidesPerView: 1, //Slide por vista
    centeredSlide: true, //Que las Slides esten centradas
    speed: 400 //Velocidad de transición de cada Slide en milisegundos
  }

  slides = [
    {
      titulo: "PlayerPro",
      subtitulo: "Gracias por descargar nuestra aplicación de música!",
      icono: "play-circle-outline",
      imagen: "assets/Images/slide4.jpg",
      descripcion: "PlayerPro es un conjunto de 3 aplicaciones que pueden funcionar tanto juntas como individualmente, combinando sus funciones para utilizarlas todas a la vez o poder utiliar individualmente cada una para lo que requiera ustes, el usuario :)"
    },
    {
      titulo: "Bienvenido a PlayerPro!",
      subtitulo: "Primera Aplicación de PlayerPro",
      icono: "musical-notes-outline",
      imagen: "assets/Images/slide1.jpg",
      descripcion: "PlayerPro Green, la principal aplicación de PlayerPro sobre la cual se pueden agregar las demás. PPG saca toda su información de internet y necesitas estar conectado para escuchar música."
    },
    {
      titulo: "Explorando PlayerPro",
      subtitulo: "Segunda Aplicación de PlayerPro",
      icono: "musical-note-outline",
      imagen: "assets/Images/slide2.jpg",
      descripcion: "PlayerPro Red, la expansión de PPG para uso local. Esta versión te permite almacenar la música en tu dispositivo y trabaja fuera de conexión a internet."
    },
    {
      titulo: "Descubriendo PlayerPro",
      subtitulo: "Tercera Aplicación de PlayerPro",
      icono: "play-outline",
      imagen: "assets/Images/slide3.jpg",
      descripcion: "PlayerPro Blue, es la expansión de PPG que introduce la capacidad de relacionarse con otros usuarios, interactuar con amigos, crear grupos para escuchar playlists creadas por un usurio, entre muchsa otras opciones que encontrará en la aplicación."
    },
  ]


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  terminar(){
    Storage.set({key: "isIntroShowed", value: 'true'});
    this.router.navigateByUrl("/login");
  }

}
