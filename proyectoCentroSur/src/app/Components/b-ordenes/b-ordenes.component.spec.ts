import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BOrdenesComponent } from './b-ordenes.component';

describe('BOrdenesComponent', () => {
  let component: BOrdenesComponent;
  let fixture: ComponentFixture<BOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BOrdenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
