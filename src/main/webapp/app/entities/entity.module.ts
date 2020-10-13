import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user-role',
        loadChildren: () => import('./user-role/user-role.module').then(m => m.LiheApiUserRoleModule),
      },
      {
        path: 'permission',
        loadChildren: () => import('./permission/permission.module').then(m => m.LiheApiPermissionModule),
      },
      {
        path: 'role-permission',
        loadChildren: () => import('./role-permission/role-permission.module').then(m => m.LiheApiRolePermissionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class LiheApiEntityModule {}
