import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {
  goBack=false;
  url_server = "https://music-back-seminario.herokuapp.com/";
  header = {'Access-Control-Request-Headers': '*',
    'Content-Type': 'application/json'};
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', observe: 'response' })
  };

  constructor(
    private http: HttpClient, 
    private alertController: AlertController) { 
  }

  loginUser(credentials){
    let params = {
      "user": credentials
    }
    return new Promise((accept, reject) =>{
      this.http.post(`${this.url_server}login`, params, this.httpOptions)
      .subscribe((data: any)=>{
        if(data.status =="OK"
          ){
            accept(data);
          }else{
            reject("Email o Contraseña no valido");
          }
      },
      (error) =>{
        reject("Petición errada")
      }
      )
    });
  }

  registerUser(userData) {
    let params = {
      "user": userData
    }
    return new Promise((accept, reject)=>{
      this.http.post(`${this.url_server}signup`, params, this.httpOptions)
      .subscribe((data: any)=>{
        if(data.status=="OK"){
          accept(data.msg);
        }else{
          reject(data.errors)
        }
      },
      (error)=>{
        reject("Solicitud erronea") 
      }
      )
    });
  }

  async presentAlert(header, subHeader, message){
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler:()=>{this.goBack=true}
        }
      ]
    });
    await alert.present();
  }
}