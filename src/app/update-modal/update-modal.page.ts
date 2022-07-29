import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from "@ionic/storage";
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//MODAL PARA ACTUALIZAR NOMBRE Y APELLIDO. NO LISTO

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.page.html',
  styleUrls: ['./update-modal.page.scss'],
})
export class UpdateModalPage implements OnInit {
  updateName: FormGroup;

  constructor(
    private modalController: ModalController,
    private authService: AuthenticateService,
    private storage: Storage,
    private alertController: AlertController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss();
  }
}
