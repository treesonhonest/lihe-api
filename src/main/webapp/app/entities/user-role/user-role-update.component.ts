import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserRole, UserRole } from 'app/shared/model/user-role.model';
import { UserRoleService } from './user-role.service';

@Component({
  selector: 'jhi-user-role-update',
  templateUrl: './user-role-update.component.html',
})
export class UserRoleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    roleId: [null, [Validators.required]],
    userId: [null, [Validators.required]],
  });

  constructor(protected userRoleService: UserRoleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userRole }) => {
      this.updateForm(userRole);
    });
  }

  updateForm(userRole: IUserRole): void {
    this.editForm.patchValue({
      id: userRole.id,
      roleId: userRole.roleId,
      userId: userRole.userId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userRole = this.createFromForm();
    if (userRole.id !== undefined) {
      this.subscribeToSaveResponse(this.userRoleService.update(userRole));
    } else {
      this.subscribeToSaveResponse(this.userRoleService.create(userRole));
    }
  }

  private createFromForm(): IUserRole {
    return {
      ...new UserRole(),
      id: this.editForm.get(['id'])!.value,
      roleId: this.editForm.get(['roleId'])!.value,
      userId: this.editForm.get(['userId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserRole>>): void {
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
