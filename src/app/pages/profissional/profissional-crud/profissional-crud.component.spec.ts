import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalCrudComponent } from './profissional-crud.component';

describe('ProfissionalCrudComponent', () => {
  let component: ProfissionalCrudComponent;
  let fixture: ComponentFixture<ProfissionalCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionalCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
