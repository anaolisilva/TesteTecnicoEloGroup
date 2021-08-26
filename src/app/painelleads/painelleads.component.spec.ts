import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelleadsComponent } from './painelleads.component';

describe('PainelleadsComponent', () => {
  let component: PainelleadsComponent;
  let fixture: ComponentFixture<PainelleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelleadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
