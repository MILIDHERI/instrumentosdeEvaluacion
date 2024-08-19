import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstrumentosParte1Page } from './instrumentos-parte1.page';

const routes: Routes = [
  {
    path: '',
    component: InstrumentosParte1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrumentosParte1PageRoutingModule {}
