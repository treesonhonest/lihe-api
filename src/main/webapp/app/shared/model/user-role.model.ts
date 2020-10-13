export interface IUserRole {
  id?: number;
  roleId?: number;
  userId?: number;
}

export class UserRole implements IUserRole {
  constructor(public id?: number, public roleId?: number, public userId?: number) {}
}
