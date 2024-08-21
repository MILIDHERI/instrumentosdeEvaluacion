import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-instrumentos-parte1',
  templateUrl: './instrumentos-parte1.page.html',
  styleUrls: ['./instrumentos-parte1.page.scss'],
})
export class InstrumentosParte1Page implements OnInit {

  name: string;              // Define la propiedad para el nombre del paciente
  evaluationDate: string;    // Define la propiedad para la fecha de evaluación

  constructor(private navCtrl: NavController) { 
    this.name = '';           // Inicializa la propiedad name
    this.evaluationDate = ''; // Inicializa la propiedad evaluationDate
  }

  ngOnInit() {
    // Código adicional si es necesario
  }

  goBack() {
    this.navCtrl.back(); // Navega hacia la pantalla anterior
  }

  save() {
    // Lógica para guardar la información
    console.log('Información guardada:', this.name, this.evaluationDate);
  }

  modify() {
    // Lógica para modificar la información
    console.log('Información modificada:', this.name, this.evaluationDate);
  }
}
