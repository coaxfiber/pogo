import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRegComponent } from './update-reg.component';

describe('UpdateRegComponent', () => {
  let component: UpdateRegComponent;
  let fixture: ComponentFixture<UpdateRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
