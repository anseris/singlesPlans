import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeSimpleComponent } from './mensaje-simple.component';

describe('MensajeSimpleComponent', () => {
  let component: MensajeSimpleComponent;
  let fixture: ComponentFixture<MensajeSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajeSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
