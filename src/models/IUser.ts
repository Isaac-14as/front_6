export interface IUser {
    id: number;
    email: string;
    password: string;
    gender: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    first_name: string;
    last_name: string;
    patronymic: string;
    date_of_birth: string;
}

