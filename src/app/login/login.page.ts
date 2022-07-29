import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  errorMessage: String;
  passwordTypeInput  =  'password';
  loginForm: FormGroup;
  
  validation_messages={
    email:[
      {type: "required", message:"El Email es obligatorio."},
      {type: "pattern", message:"Email no válido."}
    ],
    password:[
      {type: "required", message:"La contraseña es obligatoria. "},
      {type: "minlength", message:"Tamaño mínimo de 6 caracteres."}
    ]
    
  }
  
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthenticateService, 
    private navCtrl: NavController,
    private alertController: AlertController
  ) { 

    this.loginForm = this.formBuilder.group({

      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      )
    })
  }

  ngOnInit() {
  }

  goToRegister(){
    this.navCtrl.navigateForward("/register");
  }

  loginUser(credentials){
    this.authService.loginUser(credentials).then( (res: any) => {
      Storage.set({key: "isUserLoggedIn", value: 'true'})
      Storage.set({key: "user_id", value: res.user.id})
      this.navCtrl.navigateForward("/menu")
    }).catch(err => {
      this.presentAlert("Oops!", "Hubo un error", err)
    })
  }

  async presentAlert(header, subHeader, message){
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}