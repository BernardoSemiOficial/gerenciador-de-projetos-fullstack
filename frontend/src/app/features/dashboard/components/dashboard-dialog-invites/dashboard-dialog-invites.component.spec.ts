import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDialogInvitesComponent } from './dashboard-dialog-invites.component';

describe('DashboardDialogInvitesComponent', () => {
  let component: DashboardDialogInvitesComponent;
  let fixture: ComponentFixture<DashboardDialogInvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDialogInvitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDialogInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
