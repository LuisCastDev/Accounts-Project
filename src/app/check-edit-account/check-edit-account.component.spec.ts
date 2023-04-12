import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckEditAccountComponent } from './check-edit-account.component';

describe('CheckEditAccountComponent', () => {
  let component: CheckEditAccountComponent;
  let fixture: ComponentFixture<CheckEditAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckEditAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
