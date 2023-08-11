import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSyncPageComponent } from './new-sync-page.component';

describe('NewSyncPageComponent', () => {
  let component: NewSyncPageComponent;
  let fixture: ComponentFixture<NewSyncPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSyncPageComponent]
    });
    fixture = TestBed.createComponent(NewSyncPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
