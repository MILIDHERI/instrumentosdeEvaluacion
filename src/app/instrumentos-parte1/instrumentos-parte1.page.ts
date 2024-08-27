import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { jsPDF } from 'jspdf';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@Component({
  selector: 'app-instrumentos-parte1',
  templateUrl: './instrumentos-parte1.page.html',
  styleUrls: ['./instrumentos-parte1.page.scss'],
  providers: [File, FileOpener]
})
export class InstrumentosParte1Page implements OnInit {

  name: string = '';          
  evaluationDate: string = ''; 

  constructor(
    private navCtrl: NavController, 
    private file: File, 
    private fileOpener: FileOpener, 
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  // Método para navegar hacia atrás
  goBack() {
    this.navCtrl.back();
  }

  // Método para guardar el PDF y abrirlo o mostrar la ruta
  async save() {
    if (!this.name || !this.evaluationDate) {
      this.showAlert('Error', 'Por favor, completa todos los campos antes de guardar.');
      return;
    }
  
    const filePath = `${this.file.dataDirectory}formulario.pdf`;
  
    try {
      // Crear el PDF con jsPDF
      const doc = new jsPDF();
      doc.text('Detalles del Instrumento', 10, 10);
      doc.text(`Nombre del paciente: ${this.name}`, 10, 20);
      doc.text(`Fecha de la evaluación: ${this.evaluationDate}`, 10, 30);
  
      // Guardar el archivo en el almacenamiento interno
      const blob = doc.output('blob');
      await this.file.writeFile(this.file.dataDirectory, 'formulario.pdf', blob, { replace: true });
  
      // Intentar abrir el archivo PDF
      await this.fileOpener.open(filePath, 'application/pdf');
  
      this.showAlert('Éxito', `El PDF ha sido guardado y se ha abierto correctamente en la ruta: ${filePath}.`);
  
    } catch (error) {
      // Manejar errores y mostrar alerta con la ruta del archivo
      this.showAlert('Error', `No se pudo abrir el PDF automáticamente. El archivo se guardó en: ${filePath}. Por favor, intenta abrirlo manualmente.`);
      console.error('Error al guardar o abrir el PDF:', error);
    }
  }
  

  // Método para modificar el PDF (puedes implementar lo que necesites aquí)
  modify() {
    this.showAlert('Modificar', 'Método de modificación aún no implementado.');
  }

  // Método para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
