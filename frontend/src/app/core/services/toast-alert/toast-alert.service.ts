import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToaskAlertMessage } from './toast-alert.types';

@Injectable({
  providedIn: 'root',
})
export class ToastAlertService {
  private messageService = inject(MessageService);

  addSuccessMessage({ title, description }: ToaskAlertMessage) {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: description,
    });
  }

  addWarningMessage({ title, description }: ToaskAlertMessage) {
    this.messageService.add({
      severity: 'warning',
      summary: title,
      detail: description,
    });
  }

  addDangerMessage({ title, description }: ToaskAlertMessage) {
    this.messageService.add({
      severity: 'danger',
      summary: title,
      detail: description,
    });
  }

  addInfoMessage({ title, description }: ToaskAlertMessage) {
    this.messageService.add({
      severity: 'info',
      summary: title,
      detail: description,
    });
  }
}
