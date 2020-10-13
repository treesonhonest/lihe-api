import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPermission } from 'app/shared/model/permission.model';

type EntityResponseType = HttpResponse<IPermission>;
type EntityArrayResponseType = HttpResponse<IPermission[]>;

@Injectable({ providedIn: 'root' })
export class PermissionService {
  public resourceUrl = SERVER_API_URL + 'api/permissions';

  constructor(protected http: HttpClient) {}

  create(permission: IPermission): Observable<EntityResponseType> {
    return this.http.post<IPermission>(this.resourceUrl, permission, { observe: 'response' });
  }

  update(permission: IPermission): Observable<EntityResponseType> {
    return this.http.put<IPermission>(this.resourceUrl, permission, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPermission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPermission[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
