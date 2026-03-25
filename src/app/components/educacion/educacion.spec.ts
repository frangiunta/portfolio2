import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Educacion } from './educacion';

describe('Educacion', () => {
  let component: Educacion;
  let fixture: ComponentFixture<Educacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Educacion],
    }).compileComponents();

    fixture = TestBed.createComponent(Educacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
