import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaFinalComponent } from './pantalla-final.component';

describe('PantallaFinalComponent', () => {
  let component: PantallaFinalComponent;
  let fixture: ComponentFixture<PantallaFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaFinalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
