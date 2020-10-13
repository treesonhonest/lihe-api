import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserRole } from 'app/shared/model/user-role.model';
import { UserRoleService } from './user-role.service';

@Component({
  templateUrl: './user-role-delete-dialog.component.html',
})
export class UserRoleDeleteDialogComponent {
  userRole?: IUserRole;

  constructor(protected userRoleService: UserRoleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userRoleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userRoleListModification');
      this.activeModal.close();
    });
  }
}
