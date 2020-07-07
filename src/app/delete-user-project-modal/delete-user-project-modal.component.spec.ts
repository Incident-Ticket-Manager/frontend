import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserProjectModalComponent } from './delete-user-project-modal.component';

describe('DeleteUserProjectModalComponent', () => {
  let component: DeleteUserProjectModalComponent;
  let fixture: ComponentFixture<DeleteUserProjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUserProjectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
