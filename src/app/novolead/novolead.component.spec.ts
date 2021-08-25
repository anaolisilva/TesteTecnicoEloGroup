import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoleadComponent } from './novolead.component';

describe('NovoleadComponent', () => {
  let component: NovoleadComponent;
  let fixture: ComponentFixture<NovoleadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoleadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
