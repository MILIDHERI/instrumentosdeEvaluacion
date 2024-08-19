import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

interface Instrument {
  name: string;
  description: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  instruments: Instrument[] = [
    { name: 'Test de Jebsen-Taylor', description: 'Medición de habilidades motoras finas' },
    { name: 'Datos generales', description: 'Nombre,Fecha' }
  ];

  constructor(private alertCtrl: AlertController, private navCtrl: NavController) {}

  async openAddInstrumentModal() {
    const alert = await this.alertCtrl.create({
      header: 'Añadir Instrumento',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre del instrumento' },
        { name: 'description', type: 'text', placeholder: 'Descripción' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Guardar', handler: data => this.addInstrument(data) }
      ]
    });

    await alert.present();
  }

  addInstrument(data: { name: string, description: string }) {
    if (data.name && data.description) {
      this.instruments.push(data);
    }
  }

  openInstrument(instrument: Instrument) {
    this.navCtrl.navigateForward('/instrumentos-parte1', {  /* #esto lleva a la nueva vista */
      queryParams: {
        name: instrument.name,
        description: instrument.description
      }
    });
  }

  async deleteInstrument(instrument: Instrument) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Instrumento',
      message: `¿Estás seguro de que deseas eliminar el instrumento "${instrument.name}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.instruments = this.instruments.filter(i => i !== instrument);
          }
        }
      ]
    });

    await alert.present();
  }
}

