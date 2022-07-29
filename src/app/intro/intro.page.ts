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
    initialSlide: 0,
    slidesPerView: 1, 
    centeredSlide: true, 
    speed: 400 
  }

  slides = [
    {
      titulo: "Bienvenido!",
      subtitulo: "Gracias por instalar esta app!",
      descripcion: "Conozca todas sus funciones"
    },
    {
      titulo: "Qué es?",
      subtitulo: "Buena pregunta!",
      descripcion: "Esta app de música es el resultado de todo lo visto en el seminario"
    },
    {
      titulo: "Cómo se usa?",
      subtitulo: "Muy fácil!",
      descripcion: "Te registras, inicias sesión y ya puedes acceder a nuestras bases de datos con canciones!"
    },
    {
      titulo: "Que disfrutes!",
      subtitulo: "Eso es todo por ahora.",
      descripcion: "Presione en la X arriba a la derecha para cerrar estas ventanas"
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
