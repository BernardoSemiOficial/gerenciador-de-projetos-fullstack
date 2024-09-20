import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserService } from '@core/services/user/user.service';
import { UserServiceMock } from 'src/__mocks__/services/user.service.mock';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: UserService, useValue: UserServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    TestBed.inject(UserServiceMock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
