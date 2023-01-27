import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlanrepasPageComponent } from './delete-planrepas-page.component';

describe('DeletePlanrepasPageComponent', () => {
  let component: DeletePlanrepasPageComponent;
  let fixture: ComponentFixture<DeletePlanrepasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePlanrepasPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePlanrepasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
