import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación

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
  sectionIndex = 0; // Para rastrear el índice de la pregunta actual

  constructor(private router: Router) {}

  selectAnswer(isCorrect: boolean) {
    // Compara la respuesta del paciente con la respuesta correcta
    const correct = this.correctAnswers[this.sectionIndex] === 'Correcta'; // O el valor esperado
    this.feedback[this.sectionIndex] = isCorrect === correct ? 'Correcto' : 'Incorrecto';
    
    // Avanzar a la siguiente pregunta
    this.nextQuestion();
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
}
