import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstrumentosParte1Page } from './instrumentos-parte1.page';

describe('InstrumentosParte1Page', () => {
  let component: InstrumentosParte1Page;
  let fixture: ComponentFixture<InstrumentosParte1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentosParte1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
