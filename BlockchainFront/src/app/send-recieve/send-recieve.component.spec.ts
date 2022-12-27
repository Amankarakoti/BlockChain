import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRecieveComponent } from './send-recieve.component';

describe('SendRecieveComponent', () => {
  let component: SendRecieveComponent;
  let fixture: ComponentFixture<SendRecieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendRecieveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
