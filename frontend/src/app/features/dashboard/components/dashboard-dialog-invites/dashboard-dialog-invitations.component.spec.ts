import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDialogInvitationsComponent } from './dashboard-dialog-invitations.component';

describe('DashboardDialogInvitationsComponent', () => {
  let component: DashboardDialogInvitationsComponent;
  let fixture: ComponentFixture<DashboardDialogInvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDialogInvitationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardDialogInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
