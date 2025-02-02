import { Role } from "./Role";

export interface User {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    image?: null;
    notification_token?: null;
    roles: Role[];
}