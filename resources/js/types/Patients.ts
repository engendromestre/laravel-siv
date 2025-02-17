export enum PatientStatus {
    ACTIVE = 'a',
    INACTIVE = 'i',
}

export interface PatientList {
    data: Patient[];
    meta: Meta;
}

export interface Patient {
    id: number;
    name: string;
    motherName: string;
    birthDate: Date;
    status: PatientStatus;
    photos: { url: string };
}

export interface Meta {
    currentPage: number;
    perPage: number;
    lastPage: number;
    total: number;
}
