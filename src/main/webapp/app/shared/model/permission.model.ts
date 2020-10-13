import { PermissionType } from 'app/shared/model/enumerations/permission-type.model';

export interface IPermission {
  id?: number;
  name?: string;
  url?: string;
  type?: PermissionType;
  permissions?: IPermission[];
  parent?: IPermission;
}

export class Permission implements IPermission {
  constructor(
    public id?: number,
    public name?: string,
    public url?: string,
    public type?: PermissionType,
    public permissions?: IPermission[],
    public parent?: IPermission
  ) {}
}
