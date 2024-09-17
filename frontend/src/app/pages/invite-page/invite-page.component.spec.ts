import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePageComponent } from './invite-page.component';

describe('InvitePageComponent', () => {
  let component: InvitePageComponent;
  let fixture: ComponentFixture<InvitePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
