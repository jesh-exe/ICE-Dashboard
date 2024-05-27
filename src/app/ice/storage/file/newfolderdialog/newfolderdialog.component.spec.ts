import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfolderdialogComponent } from './newfolderdialog.component';

describe('NewfolderdialogComponent', () => {
  let component: NewfolderdialogComponent;
  let fixture: ComponentFixture<NewfolderdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewfolderdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfolderdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
