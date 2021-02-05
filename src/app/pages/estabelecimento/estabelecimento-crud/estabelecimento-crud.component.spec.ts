import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoCrudComponent } from './estabelecimento-crud.component';

describe('EstabelecimentoCrudComponent', () => {
  let component: EstabelecimentoCrudComponent;
  let fixture: ComponentFixture<EstabelecimentoCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstabelecimentoCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstabelecimentoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
