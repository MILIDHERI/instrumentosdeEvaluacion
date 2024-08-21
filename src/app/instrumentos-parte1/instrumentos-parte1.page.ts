import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { jsPDF } from 'jspdf';  // Importa jsPDF

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
    // Lógica para generar y guardar la información en PDF
    const doc = new jsPDF();
    
    // Agrega contenido al PDF
    doc.text('Detalles del Instrumento', 10, 10);
    doc.text(`Nombre del paciente: ${this.name}`, 10, 20);
    doc.text(`Fecha de la evaluación: ${this.evaluationDate}`, 10, 30);
    
    // Guarda el PDF en el dispositivo
    doc.save('formulario.pdf');
    
    console.log('PDF guardado con éxito');
  }

  modify() {
    // Lógica para modificar la información
    console.log('Información modificada:', this.name, this.evaluationDate);
  }
}
