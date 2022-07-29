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
@ViewChild('passwordEyeRegister', { read: ElementRef }) 


export class LoginPage implements OnInit {
  passwordEye: ElementRef;
  passwordTypeInput  =  'password';
  loginForm: FormGroup;
  
  validation_messages={
    email:[
      {type: "required", message:"El Email es obligatorio. "},
      {type: "pattern", message:"El Email no es válido. "}
    ],
    password:[
      {type: "required", message:"La contraseña es obligatoria. "},
      {type: "minlength", message:"La contraseña es mínimo de 6 caracteres. "}
    ]
    
  }

  errorMessage: String;
  
  constructor(private formBuilder: FormBuilder, 
    private authService: AuthenticateService, 
    private navCtrl: NavController,
    private alertController: AlertController) { 

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

  togglePasswordMode() {
    //cambiar tipo input
  this.passwordTypeInput = this.passwordTypeInput === 'text' 
  ? 'password' : 'text';
   //obtener el input
   const nativeEl = this.passwordEye.nativeElement.querySelector('input');
   //obtener el indice de la posición del texto actual en el input
   const inputSelection = nativeEl.selectionStart;
   //ejecuto el focus al input
   nativeEl.focus();
  //espero un milisegundo y actualizo la posición del indice del texto
   setTimeout(() => {
       nativeEl.setSelectionRange(inputSelection, inputSelection);
   }, 1);
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

  goToRegister(){
    this.navCtrl.navigateForward("/register");
  }

}