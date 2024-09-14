import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment/environment';

import {
  PayloadCreateProjectForUser,
  PayloadEditProjectForUser,
  ResponseCreateProjectForUser,
  ResponseEditProjectForUser,
  ResponseGetProject,
} from './project.service.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http: HttpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getProject(projectId: string) {
    return this.http.get<ResponseGetProject>(
      this.baseUrl + `/projects/${projectId}`
    );
  }

  createProjectForUser(userId: string, payload: PayloadCreateProjectForUser) {
    return this.http.post<ResponseCreateProjectForUser>(
      this.baseUrl + `/projects/${userId}`,
      payload
    );
  }

  editProjectForUser(projectId: string, payload: PayloadEditProjectForUser) {
    return this.http.put<ResponseEditProjectForUser>(
      this.baseUrl + `/projects/${projectId}`,
      payload
    );
  }
}
