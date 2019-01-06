import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountSelectorComponent } from './user-account-selector.component';

describe('UserAccountSelectorComponent', () => {
  let component: UserAccountSelectorComponent;
  let fixture: ComponentFixture<UserAccountSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
