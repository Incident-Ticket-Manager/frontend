import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserProjectModalComponent } from './add-user-project-modal.component';

describe('AddUserProjectModalComponent', () => {
  let component: AddUserProjectModalComponent;
  let fixture: ComponentFixture<AddUserProjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserProjectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
