import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTypeDetailComponent } from './food-type-detail.component';

describe('FoodTypeDetailComponent', () => {
  let component: FoodTypeDetailComponent;
  let fixture: ComponentFixture<FoodTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodTypeDetailComponent]
    });
    fixture = TestBed.createComponent(FoodTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
