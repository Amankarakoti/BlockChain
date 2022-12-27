import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPageComponent } from './send-page.component';

describe('SendPageComponent', () => {
  let component: SendPageComponent;
  let fixture: ComponentFixture<SendPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
