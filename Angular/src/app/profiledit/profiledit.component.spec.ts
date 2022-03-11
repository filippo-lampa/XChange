import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileditComponent } from './profiledit.component';

describe('ProfileditComponent', () => {
  let component: ProfileditComponent;
  let fixture: ComponentFixture<ProfileditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
