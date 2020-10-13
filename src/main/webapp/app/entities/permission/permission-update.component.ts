import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPermission, Permission } from 'app/shared/model/permission.model';
import { PermissionService } from './permission.service';

@Component({
  selector: 'jhi-permission-update',
  templateUrl: './permission-update.component.html',
})
export class PermissionUpdateComponent implements OnInit {
  isSaving = false;
  permissions: IPermission[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    url: [],
    type: [],
    parent: [],
  });

  constructor(protected permissionService: PermissionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ permission }) => {
      this.updateForm(permission);

      this.permissionService.query().subscribe((res: HttpResponse<IPermission[]>) => (this.permissions = res.body || []));
    });
  }

  updateForm(permission: IPermission): void {
    this.editForm.patchValue({
      id: permission.id,
      name: permission.name,
      url: permission.url,
      type: permission.type,
      parent: permission.parent,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const permission = this.createFromForm();
    if (permission.id !== undefined) {
      this.subscribeToSaveResponse(this.permissionService.update(permission));
    } else {
      this.subscribeToSaveResponse(this.permissionService.create(permission));
    }
  }

  private createFromForm(): IPermission {
    return {
      ...new Permission(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      url: this.editForm.get(['url'])!.value,
      type: this.editForm.get(['type'])!.value,
      parent: this.editForm.get(['parent'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPermission>>): void {
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

  trackById(index: number, item: IPermission): any {
    return item.id;
  }
}
