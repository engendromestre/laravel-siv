import { IRole } from './Auth';

export interface Results {
    current_page: number;
    data: IRole[];
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
