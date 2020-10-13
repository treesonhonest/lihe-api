import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserRole, UserRole } from 'app/shared/model/user-role.model';
import { UserRoleService } from './user-role.service';
import { UserRoleComponent } from './user-role.component';
import { UserRoleDetailComponent } from './user-role-detail.component';
import { UserRoleUpdateComponent } from './user-role-update.component';

@Injectable({ providedIn: 'root' })
export class UserRoleResolve implements Resolve<IUserRole> {
  constructor(private service: UserRoleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserRole> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userRole: HttpResponse<UserRole>) => {
          if (userRole.body) {
            return of(userRole.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserRole());
  }
}

export const userRoleRoute: Routes = [
  {
    path: '',
    component: UserRoleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserRoles',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserRoleDetailComponent,
    resolve: {
      userRole: UserRoleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserRoles',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserRoleUpdateComponent,
    resolve: {
      userRole: UserRoleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserRoles',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserRoleUpdateComponent,
    resolve: {
      userRole: UserRoleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'UserRoles',
    },
    canActivate: [UserRouteAccessService],
  },
];
