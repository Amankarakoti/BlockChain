import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievePageComponent } from './recieve-page.component';

describe('RecievePageComponent', () => {
  let component: RecievePageComponent;
  let fixture: ComponentFixture<RecievePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecievePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecievePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
