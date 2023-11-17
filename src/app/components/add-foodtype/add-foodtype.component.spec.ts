import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodtypeComponent } from './add-foodtype.component';

describe('AddFoodtypeComponent', () => {
  let component: AddFoodtypeComponent;
  let fixture: ComponentFixture<AddFoodtypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFoodtypeComponent]
    });
    fixture = TestBed.createComponent(AddFoodtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
