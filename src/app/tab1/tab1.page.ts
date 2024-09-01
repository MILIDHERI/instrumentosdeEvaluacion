import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  patientName: string = '';
  testDate: string = '';

  constructor(private navCtrl: NavController) {}

  goToTest() {
    if (this.patientName.trim() && this.testDate.trim()) {
      this.navCtrl.navigateForward('/instrumentos-parte1', {
        queryParams: {
          name: this.patientName,
          date: this.testDate
        }
      });
    } else {
      console.error('El nombre del paciente y la fecha son obligatorios');
    }
  }
}
