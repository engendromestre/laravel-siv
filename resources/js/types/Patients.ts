import { Admission } from './Admissions';

export interface Patient {
    id?: number;
    register: string;
    name: string;
    gender: 'm' | 'f';
    mother_name: string;
    birth_date: string;
    status: 'a' | 'i';
    photo: string | File | null;
    photo_url?: string | null;
    admissions?: Admission[];
}

export interface Results {
    current_page: number;
    data: Patient[];
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
