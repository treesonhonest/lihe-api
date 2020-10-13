export interface IRolePermission {
  id?: number;
  roleId?: number;
  permissionId?: number;
}

export class RolePermission implements IRolePermission {
  constructor(public id?: number, public roleId?: number, public permissionId?: number) {}
}
