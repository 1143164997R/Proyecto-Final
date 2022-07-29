import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { AuthenticateService } from '../services/authenticate.service';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  registerResult: boolean = true;
  errMessage;
  validation_messages={
    name:[
      {type: "required", message:"El nombre es obligatorio. "},
    ],
    last_name:[
      {type: "required", message:"El apellido es obligatorio. "},
    ],
    email:[
      {type: "required", message:"El Email es obligatorio. "},
      {type: "pattern", message:"El Email no es válido. "}
    ],
    password:[
      {type: "required", message:"La contraseña es obligatoria. "},
      {type: "minlength", message:"La contraseña es mínimo de 6 caracteres. "}
    ]
  }

  constructor(
    private alertController: AlertController,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) 
  { 
    this.registerForm = this.formBuilder.group({
      name: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      last_name: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
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
    });
  }
  ngOnInit() {
  }

  goToLogin() {
    this.navCtrl.navigateBack("/login").then((resp) => {
      console.log(resp)
    })
  }

  register(registerFormValues) {
    this.authService.registerUser(registerFormValues).then( (data) => {
      this.errMessage="";
      this.navCtrl.navigateBack("/login");
      this.presentAlert("Exito", "El usuario ha sido registrado",this.errMessage);
    }).catch(err =>{
      this.presentAlert("Oops", "Hubo un error", err)
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