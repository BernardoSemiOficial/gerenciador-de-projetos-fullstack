import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule],
  providers: [ToastAlertService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = '@gerenciador-de-tarefas/frontend';
}
