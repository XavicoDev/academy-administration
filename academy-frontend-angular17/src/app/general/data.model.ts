export interface ResponseList {
    data: any;
    status: number;
}

export interface ResponseRegister {
    message: string;
    errors: any;
    data: any;
    status: number;
}

export interface Student {
    id?: number;
    first_name: string;
    last_name: string;
    age: number;
    ci: string;
    mail: string;
    created_at?: string;
    updated_at?: string;
}

export interface Course {
    id?: number;
    name: string;
    schedule: string;
    start_date: number;
    end_date: string;
    type: string;
    created_at?: string;
    updated_at?: string;
}
