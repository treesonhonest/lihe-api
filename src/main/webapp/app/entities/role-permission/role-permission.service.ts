import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRolePermission } from 'app/shared/model/role-permission.model';

type EntityResponseType = HttpResponse<IRolePermission>;
type EntityArrayResponseType = HttpResponse<IRolePermission[]>;

@Injectable({ providedIn: 'root' })
export class RolePermissionService {
  public resourceUrl = SERVER_API_URL + 'api/role-permissions';

  constructor(protected http: HttpClient) {}

  create(rolePermission: IRolePermission): Observable<EntityResponseType> {
    return this.http.post<IRolePermission>(this.resourceUrl, rolePermission, { observe: 'response' });
  }

  update(rolePermission: IRolePermission): Observable<EntityResponseType> {
    return this.http.put<IRolePermission>(this.resourceUrl, rolePermission, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRolePermission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRolePermission[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
