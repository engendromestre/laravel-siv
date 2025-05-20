export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: IRole[];
    permissions: IPermission[];
}

export interface ResultsUser {
    current_page: number;
    data: IUser[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    search?: string;
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
