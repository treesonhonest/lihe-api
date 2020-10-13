import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserRole } from 'app/shared/model/user-role.model';
import { UserRoleService } from './user-role.service';
import { UserRoleDeleteDialogComponent } from './user-role-delete-dialog.component';

@Component({
  selector: 'jhi-user-role',
  templateUrl: './user-role.component.html',
})
export class UserRoleComponent implements OnInit, OnDestroy {
  userRoles?: IUserRole[];
  eventSubscriber?: Subscription;

  constructor(protected userRoleService: UserRoleService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.userRoleService.query().subscribe((res: HttpResponse<IUserRole[]>) => (this.userRoles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserRoles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserRole): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserRoles(): void {
    this.eventSubscriber = this.eventManager.subscribe('userRoleListModification', () => this.loadAll());
  }

  delete(userRole: IUserRole): void {
    const modalRef = this.modalService.open(UserRoleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userRole = userRole;
  }
}
