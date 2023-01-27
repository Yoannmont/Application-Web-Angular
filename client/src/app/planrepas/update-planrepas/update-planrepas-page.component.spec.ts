import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlanrepasPageComponent } from './update-planrepas-page.component';

describe('UpdatePlanrepasPageComponent', () => {
  let component: UpdatePlanrepasPageComponent;
  let fixture: ComponentFixture<UpdatePlanrepasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePlanrepasPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePlanrepasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
