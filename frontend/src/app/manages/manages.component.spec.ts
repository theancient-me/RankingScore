import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesComponent } from './manages.component';

describe('ManagesComponent', () => {
  let component: ManagesComponent;
  let fixture: ComponentFixture<ManagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
