import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRolePermission, RolePermission } from 'app/shared/model/role-permission.model';
import { RolePermissionService } from './role-permission.service';

@Component({
  selector: 'jhi-role-permission-update',
  templateUrl: './role-permission-update.component.html',
})
export class RolePermissionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    roleId: [],
    permissionId: [],
  });

  constructor(protected rolePermissionService: RolePermissionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rolePermission }) => {
      this.updateForm(rolePermission);
    });
  }

  updateForm(rolePermission: IRolePermission): void {
    this.editForm.patchValue({
      id: rolePermission.id,
      roleId: rolePermission.roleId,
      permissionId: rolePermission.permissionId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rolePermission = this.createFromForm();
    if (rolePermission.id !== undefined) {
      this.subscribeToSaveResponse(this.rolePermissionService.update(rolePermission));
    } else {
      this.subscribeToSaveResponse(this.rolePermissionService.create(rolePermission));
    }
  }

  private createFromForm(): IRolePermission {
    return {
      ...new RolePermission(),
      id: this.editForm.get(['id'])!.value,
      roleId: this.editForm.get(['roleId'])!.value,
      permissionId: this.editForm.get(['permissionId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRolePermission>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
