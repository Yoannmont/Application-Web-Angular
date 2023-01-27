import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanrepasPageComponent } from './add-planrepas-page.component';

describe('AddPlanrepasPageComponent', () => {
  let component: AddPlanrepasPageComponent;
  let fixture: ComponentFixture<AddPlanrepasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanrepasPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanrepasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
