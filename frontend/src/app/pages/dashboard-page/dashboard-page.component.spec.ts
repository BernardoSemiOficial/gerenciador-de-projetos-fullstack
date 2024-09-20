import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { DashboardPageComponent } from './dashboard-page.component';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent],
    })
      .overrideComponent(DashboardPageComponent, {
        remove: { imports: [DashboardComponent] },
        add: { imports: [DashboardStubComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ standalone: true, selector: 'app-dashboard', template: '' })
class DashboardStubComponent {}
