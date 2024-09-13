import { Component, Input } from '@angular/core';
import { ViewProjectComponent } from '@features/projects/view-project/view-project.component';

@Component({
  selector: 'app-view-project-page',
  standalone: true,
  imports: [ViewProjectComponent],
  templateUrl: './view-project-page.component.html',
  styleUrl: './view-project-page.component.scss',
})
export class ViewProjectPageComponent {
  id: string = '';

  @Input() set projectId(id: string) {
    this.id = id;
  }
}
