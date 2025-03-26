import { Config } from 'ziggy-js';
import User from './Auth';
import Patient from './Patients';

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        patient: Patient;
    };
    ziggy: Config & { location: string };
};
