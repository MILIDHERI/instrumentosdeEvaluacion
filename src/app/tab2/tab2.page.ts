import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private navCtrl: NavController) {}

  startTest() {
    // Instrumento fijo para el test de 25 preguntas
    const instrument = {
      name: 'Test de 25 preguntas',
      description: 'Un test con preguntas fijas'
    };

    // Navega a la página de instrumentos-parte1 con los parámetros del test
    this.navCtrl.navigateForward('/instrumentos-parte1', {
      queryParams: {
        name: instrument.name,
        description: instrument.description
      }
    });
  }
}
