import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanrepasComponent } from './add-planrepas.component';

describe('AddPlanrepasComponent', () => {
  let component: AddPlanrepasComponent;
  let fixture: ComponentFixture<AddPlanrepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanrepasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanrepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
