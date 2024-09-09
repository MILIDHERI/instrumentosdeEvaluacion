import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular'; // Para el toast
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf'; // Asegúrate de instalar jsPDF

@Component({
  selector: 'app-instrumentos-parte1',
  templateUrl: './instrumentos-parte1.page.html',
  styleUrls: ['./instrumentos-parte1.page.scss']
})
export class InstrumentosParte1Page {
  answers: { [key: number]: string } = {};
  correctAnswers: { [key: number]: string } = {
    0: "2024",
    1: "Primavera",
    2: new Date().getDate().toString(),
    3: new Date().toLocaleDateString('es-ES', { weekday: 'long' }),
    4: new Date().toLocaleDateString('es-ES', { month: 'long' }),
    5: "Chile",
    6: "Valparaíso",
    7: "Viña del Mar",
    8: "Oficina",
    9: "Primer piso"
  };
  memoryAnswers = ["mesa", "llave", "libro"];
  userMemoryAnswer: string = '';
  questions = [
    "¿En qué año estamos?",
    "¿En qué estación del año?",
    "¿Qué día del mes es hoy?",
    "¿Qué día de la semana es hoy?",
    "¿En qué mes del año estamos?",
    "¿En qué país estamos?",
    "¿En qué provincia estamos?",
    "¿En qué ciudad estamos?",
    "¿Dónde estamos en este momento?",
    "¿En qué piso/planta estamos?"
  ];

  feedback: { [key: number]: string } = {};
  sectionIndex = 0;
  score = 0;
  showScore = false;
  userAnswer: string = '';
  answeredQuestions: Set<number> = new Set();

  constructor(private router: Router, private toastController: ToastController) {}

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 1500, // La barra desaparece después de 1.5 segundos
      position: 'bottom' // Aparece desde abajo
    });
    toast.present();
  }

  checkAnswer(answer: 'correct' | 'incorrect') {
    if (this.answeredQuestions.has(this.sectionIndex)) {
      return;
    }
  
    const correctAnswer = this.correctAnswers[this.sectionIndex];
    let message = '';
  
    if (answer === 'correct') {
      this.feedback[this.sectionIndex] = 'Correcto';
      this.score++;
      message = `Respuesta correcta. Puntos: +1`;
      this.showBottomSheet(message, 'success'); // Barra deslizante para respuesta correcta
    } else {
      this.feedback[this.sectionIndex] = 'Incorrecto';
      message = `Respuesta incorrecta. Correcto: ${correctAnswer}`;
      this.showBottomSheet(message, 'danger'); // Barra deslizante para respuesta incorrecta
    }
  
    this.answers[this.sectionIndex] = this.userAnswer;
    this.userAnswer = '';
    this.answeredQuestions.add(this.sectionIndex);
  
    // Avanza automáticamente a la siguiente pregunta
    setTimeout(() => {
      this.nextQuestion();
    }, 1500); // Espera a que la barra desaparezca antes de avanzar
  }
  

  checkMemoryAnswer() {
    const userMemoryWords = this.userMemoryAnswer.split(',').map(word => word.trim().toLowerCase());
    const correctMemoryCount = this.memoryAnswers.filter(word => userMemoryWords.includes(word)).length;
  
    this.feedback[10] = `Palabras correctas: ${correctMemoryCount} de ${this.memoryAnswers.length}`;
    this.score += correctMemoryCount;
    
    // Limita el puntaje total a 10
    if (this.score > 10) {
      this.score = 10;
    }
  
    this.userMemoryAnswer = '';
  
    // Mostrar barra deslizante con la notificación de la respuesta
    this.showBottomSheet(`Palabras correctas: ${correctMemoryCount}`, 'correct');
  
    // Avanzar automáticamente a la siguiente sección
    this.nextQuestion();
  }
  
  async showBottomSheet(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 1500, // La barra desaparecerá después de 1.5 segundos
      position: 'bottom' // Barra deslizante desde abajo
    });
    toast.present();
  }
  
  getCurrentQuestion() {
    return this.questions[this.sectionIndex];
  }

  getCurrentQuestionNumber() {
    return this.sectionIndex + 1;
  }

  nextQuestion() {
    if (this.sectionIndex < 14) { // El test tiene 14 secciones
      this.sectionIndex++;
    }
    // Si llegamos a la última pregunta de una sección, permitimos avanzar a la siguiente sección
    if (this.sectionIndex === 9) {
      this.continueToNextSection(); // Avanza de la sección de Orientación a la siguiente
    } else if (this.sectionIndex === 10) {
      this.continueToNextSection(); // Avanza de Memoria Inmediata a Atención y Cálculo
    }
  }

  previousQuestion() {
    if (this.sectionIndex > 0) {
      this.sectionIndex--;
    }
  }

  goToTab1() {
    this.router.navigate(['/tabs/tab1']);
  }
  

  displayScore() {
    this.showScore = true;
  }

  continueToNextSection() {
    if (this.sectionIndex === 9) { // Cambia de la sección Orientación a Memoria Inmediata
      this.sectionIndex = 10;
    } else if (this.sectionIndex === 10) { // Cambia de Memoria Inmediata a Atención y Cálculo
      this.sectionIndex = 11;
    } else if (this.sectionIndex === 11) { // Cambia de Atención y Cálculo a Recuerdo Diferido
      this.sectionIndex = 12;
    } else if (this.sectionIndex === 12) { // Cambia de Recuerdo Diferido a Lenguaje y Construcción
      this.sectionIndex = 13;
    } else if (this.sectionIndex === 13) { // Finaliza el test
      this.sectionIndex = 14;
    }
  }
  

  finishTest() {
    const doc = new jsPDF();
    doc.text('Resumen del Test Mini-Mental', 10, 10);
  
    this.questions.forEach((question, index) => {
      const answer = this.answers[index] || 'No respondida';
      const correctAnswer = this.correctAnswers[index];
      doc.text(`Pregunta ${index + 1}: ${question}`, 10, 20 + index * 20);
      doc.text(`Tu respuesta: ${answer}`, 10, 30 + index * 20);
      doc.text(`Respuesta correcta: ${correctAnswer}`, 10, 40 + index * 20);
      doc.text('-----------------------------------', 10, 50 + index * 20);
    });
  
    const memoryAnswer = this.userMemoryAnswer.split(',').map(word => word.trim()).join(', ');
    doc.text(`Respuestas Memoria Inmediata: ${memoryAnswer}`, 10, 60 + this.questions.length * 20);
    doc.text(`Puntaje Final: ${this.score}`, 10, 70 + this.questions.length * 20);
  
    // Guardar el PDF en la memoria del celular
    doc.save('Resumen_Test_Mini_Mental.pdf');
  }
}
