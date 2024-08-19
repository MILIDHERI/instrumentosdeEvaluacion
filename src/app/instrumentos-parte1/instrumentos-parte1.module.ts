import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstrumentosParte1PageRoutingModule } from './instrumentos-parte1-routing.module';

import { InstrumentosParte1Page } from './instrumentos-parte1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstrumentosParte1PageRoutingModule
  ],
  declarations: [InstrumentosParte1Page]
})
export class InstrumentosParte1PageModule {}
