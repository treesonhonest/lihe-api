import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPermission } from 'app/shared/model/permission.model';

@Component({
  selector: 'jhi-permission-detail',
  templateUrl: './permission-detail.component.html',
})
export class PermissionDetailComponent implements OnInit {
  permission: IPermission | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ permission }) => (this.permission = permission));
  }

  previousState(): void {
    window.history.back();
  }
}
