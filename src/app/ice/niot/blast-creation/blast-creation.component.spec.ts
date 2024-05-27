import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlastCreationComponent } from './blast-creation.component';

describe('BlastCreationComponent', () => {
  let component: BlastCreationComponent;
  let fixture: ComponentFixture<BlastCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlastCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlastCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
