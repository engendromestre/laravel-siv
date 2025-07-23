export interface Admission {
    id?: number;
    admission_datetime: Date;
    discharge_datetime: Date;
    reason_for_admission?: string;
    user_id?: number;
    notes?: string;
    created_at?: Date;
}

export interface PatientAdmissions {
    id: number;
    register: string;
    gender: 'm' | 'f';
    name: string;
    birth_date: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    mother_name: string;
    photo: string;
    photo_url: string | null;
    status: 'a' | 'i';
    admissions: Admission[];
    lastAdmission?: Admission;
}

export interface Results {
    current_page: number;
    data: PatientAdmissions[];
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
