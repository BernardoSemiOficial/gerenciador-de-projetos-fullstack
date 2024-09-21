import { Injectable } from '@angular/core';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectServiceMock {
  getProject() {
    return of({});
  }
  getTasksForProject() {
    return of({});
  }
  createProjectForUser() {
    return of({});
  }
  editProjectForUser() {
    return of({});
  }
  deleteProject() {
    return of({});
  }
}
