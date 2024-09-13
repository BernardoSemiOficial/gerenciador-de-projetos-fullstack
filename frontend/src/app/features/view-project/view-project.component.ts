import { Component, input } from '@angular/core';
import { AppFooterComponent } from '@shared/app-footer/app-footer.component';
import { AppHeaderComponent } from '@shared/app-header/app-header.component';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.scss',
})
export class ViewProjectComponent {
  projectId = input.required<string>();
}
