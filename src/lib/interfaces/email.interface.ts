import type { Role } from '$lib/interfaces/access.interface';

export interface Email {
    id: number,
    email: string,
    roles: Role[]
}