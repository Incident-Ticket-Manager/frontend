import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifProjectComponent } from './modif-project.component';

describe('ModifProjectComponent', () => {
  let component: ModifProjectComponent;
  let fixture: ComponentFixture<ModifProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
