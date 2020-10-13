import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRolePermission, RolePermission } from 'app/shared/model/role-permission.model';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionComponent } from './role-permission.component';
import { RolePermissionDetailComponent } from './role-permission-detail.component';
import { RolePermissionUpdateComponent } from './role-permission-update.component';

@Injectable({ providedIn: 'root' })
export class RolePermissionResolve implements Resolve<IRolePermission> {
  constructor(private service: RolePermissionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRolePermission> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((rolePermission: HttpResponse<RolePermission>) => {
          if (rolePermission.body) {
            return of(rolePermission.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RolePermission());
  }
}

export const rolePermissionRoute: Routes = [
  {
    path: '',
    component: RolePermissionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RolePermissions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RolePermissionDetailComponent,
    resolve: {
      rolePermission: RolePermissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RolePermissions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RolePermissionUpdateComponent,
    resolve: {
      rolePermission: RolePermissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RolePermissions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RolePermissionUpdateComponent,
    resolve: {
      rolePermission: RolePermissionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RolePermissions',
    },
    canActivate: [UserRouteAccessService],
  },
];
