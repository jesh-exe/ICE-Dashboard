import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiotProjectFormComponent } from './niot-project-form.component';

describe('NiotProjectFormComponent', () => {
  let component: NiotProjectFormComponent;
  let fixture: ComponentFixture<NiotProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiotProjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiotProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
