import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterContentMiddleComponent } from './footer-content-middle.component';

describe('FooterContentMiddleComponent', () => {
  let component: FooterContentMiddleComponent;
  let fixture: ComponentFixture<FooterContentMiddleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterContentMiddleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterContentMiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
