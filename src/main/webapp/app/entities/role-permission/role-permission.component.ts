import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRolePermission } from 'app/shared/model/role-permission.model';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionDeleteDialogComponent } from './role-permission-delete-dialog.component';

@Component({
  selector: 'jhi-role-permission',
  templateUrl: './role-permission.component.html',
})
export class RolePermissionComponent implements OnInit, OnDestroy {
  rolePermissions?: IRolePermission[];
  eventSubscriber?: Subscription;

  constructor(
    protected rolePermissionService: RolePermissionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.rolePermissionService.query().subscribe((res: HttpResponse<IRolePermission[]>) => (this.rolePermissions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRolePermissions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRolePermission): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRolePermissions(): void {
    this.eventSubscriber = this.eventManager.subscribe('rolePermissionListModification', () => this.loadAll());
  }

  delete(rolePermission: IRolePermission): void {
    const modalRef = this.modalService.open(RolePermissionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rolePermission = rolePermission;
  }
}
