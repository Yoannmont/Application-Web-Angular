import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlanrepasComponent } from './delete-planrepas.component';

describe('DeletePlanrepasComponent', () => {
  let component: DeletePlanrepasComponent;
  let fixture: ComponentFixture<DeletePlanrepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePlanrepasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePlanrepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
