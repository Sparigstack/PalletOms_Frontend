import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncPageComponent } from './sync-page.component';

describe('SyncPageComponent', () => {
  let component: SyncPageComponent;
  let fixture: ComponentFixture<SyncPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SyncPageComponent]
    });
    fixture = TestBed.createComponent(SyncPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
