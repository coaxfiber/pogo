import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchzoomComponent } from './merchzoom.component';

describe('MerchzoomComponent', () => {
  let component: MerchzoomComponent;
  let fixture: ComponentFixture<MerchzoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchzoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchzoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
