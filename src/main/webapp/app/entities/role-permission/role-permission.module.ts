import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LiheApiSharedModule } from 'app/shared/shared.module';
import { RolePermissionComponent } from './role-permission.component';
import { RolePermissionDetailComponent } from './role-permission-detail.component';
import { RolePermissionUpdateComponent } from './role-permission-update.component';
import { RolePermissionDeleteDialogComponent } from './role-permission-delete-dialog.component';
import { rolePermissionRoute } from './role-permission.route';

@NgModule({
  imports: [LiheApiSharedModule, RouterModule.forChild(rolePermissionRoute)],
  declarations: [
    RolePermissionComponent,
    RolePermissionDetailComponent,
    RolePermissionUpdateComponent,
    RolePermissionDeleteDialogComponent,
  ],
  entryComponents: [RolePermissionDeleteDialogComponent],
})
export class LiheApiRolePermissionModule {}
