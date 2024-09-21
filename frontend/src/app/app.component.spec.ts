import { TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { DialogConfirmationService } from '@core/services/dialog-confirmation/dialog-confirmation.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogConfirmationServiceMock } from 'src/__mocks__/services/dialog-confirmation.service.mock';
import { ToastAlertServiceMock } from 'src/__mocks__/services/toast-alert.service.mock';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [RouterOutlet, ToastModule, ConfirmDialogModule],
        providers: [
          MessageService,
          ConfirmationService,
          { provide: ToastAlertService, useClass: ToastAlertServiceMock },
          {
            provide: DialogConfirmationService,
            useClass: DialogConfirmationServiceMock,
          },
        ],
      },
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the '@gerenciador-de-tarefas/frontend' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('@gerenciador-de-tarefas/frontend');
  });
});
