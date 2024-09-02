import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  userMemoryAnswer: string = ''; // Respuesta ingresada por el usuario en memoria inmediata

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
    "¿En qué piso/planta estamos?",
  ];

  feedback: { [key: number]: string } = {};
  correctAnswersFeedback: { [key: number]: string } = {};
  sectionIndex = 0;
  score = 0;
  showScore = false; // Controla la visibilidad del puntaje
  userAnswer: string = ''; // Respuesta ingresada por el usuario

  constructor(private router: Router) {}

  checkAnswer(answer: 'correct' | 'incorrect') {
    const correctAnswer = this.correctAnswers[this.sectionIndex];
    if (answer === 'correct') {
      this.feedback[this.sectionIndex] = 'Correcto';
      this.correctAnswersFeedback[this.sectionIndex] = '';
      this.score++;
    } else {
      this.feedback[this.sectionIndex] = 'Incorrecto';
      this.correctAnswersFeedback[this.sectionIndex] = `Respuesta correcta: ${correctAnswer}`;
    }
    this.answers[this.sectionIndex] = this.userAnswer;
    this.userAnswer = '';
  }

  checkMemoryAnswer() {
    const userMemoryWords = this.userMemoryAnswer.split(',').map(word => word.trim().toLowerCase());
    const correctMemoryCount = this.memoryAnswers.filter(word => userMemoryWords.includes(word)).length;

    this.feedback[10] = `Palabras correctas: ${correctMemoryCount} de ${this.memoryAnswers.length}`;
    this.score += correctMemoryCount;
    this.userMemoryAnswer = '';
  }

  getCurrentQuestion() {
    return this.questions[this.sectionIndex];
  }

  nextQuestion() {
    if (this.sectionIndex < this.questions.length - 1) {
      this.sectionIndex++;
    }
  }

  previousQuestion() {
    if (this.sectionIndex > 0) {
      this.sectionIndex--;
    }
  }

  goToTab1() {
    this.router.navigate(['/tabs/tab1']); // Cambia esta ruta según cómo esté configurada tu navegación
  }

  displayScore() {
    this.showScore = true; // Muestra el puntaje
  }

  continueToNextSection() {
    this.sectionIndex = 10; // O el índice correspondiente a la sección "Memoria Inmediata"
  }
}
