import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionEnvioComponent } from './direccion-local.component';

describe('DireccionLocalComponent', () => {
  let component: DireccionEnvioComponent;
  let fixture: ComponentFixture<DireccionEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DireccionEnvioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DireccionEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
