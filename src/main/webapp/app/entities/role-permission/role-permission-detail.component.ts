import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRolePermission } from 'app/shared/model/role-permission.model';

@Component({
  selector: 'jhi-role-permission-detail',
  templateUrl: './role-permission-detail.component.html',
})
export class RolePermissionDetailComponent implements OnInit {
  rolePermission: IRolePermission | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rolePermission }) => (this.rolePermission = rolePermission));
  }

  previousState(): void {
    window.history.back();
  }
}
