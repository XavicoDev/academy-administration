import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosMatriculadosComponent } from './cursos-matriculados.component';

describe('CursosMatriculadosComponent', () => {
  let component: CursosMatriculadosComponent;
  let fixture: ComponentFixture<CursosMatriculadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosMatriculadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursosMatriculadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
