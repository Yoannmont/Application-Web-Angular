import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingQueryComponent } from './pending-query.component';

describe('PendingQueryComponent', () => {
  let component: PendingQueryComponent;
  let fixture: ComponentFixture<PendingQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
