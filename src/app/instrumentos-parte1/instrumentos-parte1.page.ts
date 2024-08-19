import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-instrumentos-parte1',
  templateUrl: './instrumentos-parte1.page.html',
  styleUrls: ['./instrumentos-parte1.page.scss'],
})
export class InstrumentosParte1Page implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back(); // Navega hacia la pantalla anterior
  }

  save() {
    // Lógica para guardar la información
    console.log('Información guardada');
  }

  modify() {
    // Lógica para modificar la información
    console.log('Información modificada');
  }
}

