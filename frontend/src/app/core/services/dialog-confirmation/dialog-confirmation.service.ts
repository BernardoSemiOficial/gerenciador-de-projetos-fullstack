import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogConfirmation } from './dialog-confirmation.types';

@Injectable({
  providedIn: 'root',
})
export class DialogConfirmationService {
  confirmationService = inject(ConfirmationService);

  addConfirmation({
    title,
    description,
    icon,
    acceptCallback,
    rejectCallback,
  }: DialogConfirmation) {
    this.confirmationService.confirm({
      header: title,
      message: description,
      icon: icon,
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        acceptCallback();
      },
      reject: () => {
        rejectCallback?.();
      },
    });
  }
}
