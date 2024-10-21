import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountDataComponent } from './acount-data.component';

describe('AcountDataComponent', () => {
  let component: AcountDataComponent;
  let fixture: ComponentFixture<AcountDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcountDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcountDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
