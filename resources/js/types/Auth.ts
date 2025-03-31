export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: IRole[];
    permissions: IPermission[];
}

export interface IPermission {
    id: number;
    name: string;
}

export interface IRole {
    id: number;
    name: string;
    permissions: IPermission[];
    users: IUser[];
}

export interface IRoleForm {
    user_id: number;
    name: string;
    permissions: number[];
}
