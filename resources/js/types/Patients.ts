export enum PatientStatus {
    ACTIVE = 'a',
    INACTIVE = 'i',
}

export interface PatientList {
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
}

export interface Patient {
    id: number;
    name: string;
    motherName: string;
    birthDate: Date;
    status: PatientStatus;
    photos: { url: string };
}
