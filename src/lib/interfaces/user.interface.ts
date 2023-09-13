export interface Token {
	refresh?: string;
	access?: string;
}

export interface Access {
    endpoint: string;
	permissions: number;
}

export interface Role {
	id: number;
	name: string;
	label: string;
	description: string
}

export interface User {
	id?: string;
	email?: string;
	username: string;
	password?: string;
	tokens?: Token;
	bio?: string;
	full_name: string;
	birth_date?: string;
	is_staff?: boolean;
	is_superuser?: boolean;
	role: Role;
	access?: Access[];
}

export interface UserResponse {
	user?: User;
}
