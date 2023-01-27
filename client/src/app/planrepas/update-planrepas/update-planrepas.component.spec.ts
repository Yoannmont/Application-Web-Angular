import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlanrepasComponent } from './update-planrepas.component';

describe('UpdatePlanrepasComponent', () => {
  let component: UpdatePlanrepasComponent;
  let fixture: ComponentFixture<UpdatePlanrepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePlanrepasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePlanrepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
