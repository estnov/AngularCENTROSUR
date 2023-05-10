import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCompletosComponent } from './listar-completos.component';

describe('ListarCompletosComponent', () => {
  let component: ListarCompletosComponent;
  let fixture: ComponentFixture<ListarCompletosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCompletosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCompletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
