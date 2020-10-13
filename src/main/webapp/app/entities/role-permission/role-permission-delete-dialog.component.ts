import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRolePermission } from 'app/shared/model/role-permission.model';
import { RolePermissionService } from './role-permission.service';

@Component({
  templateUrl: './role-permission-delete-dialog.component.html',
})
export class RolePermissionDeleteDialogComponent {
  rolePermission?: IRolePermission;

  constructor(
    protected rolePermissionService: RolePermissionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rolePermissionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('rolePermissionListModification');
      this.activeModal.close();
    });
  }
}
