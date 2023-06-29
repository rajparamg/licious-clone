import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPopularSearchComponent } from './footer-popular-search.component';

describe('FooterPopularSearchComponent', () => {
  let component: FooterPopularSearchComponent;
  let fixture: ComponentFixture<FooterPopularSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterPopularSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterPopularSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
