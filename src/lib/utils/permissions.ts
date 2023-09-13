import type { User, Access } from '$lib/interfaces/user.interface';

export const displayEditor = (user: User, user_id: string) => {
    console.log(user);
    console.log(typeof(user.id));
    console.log(typeof(user_id));

    if (user.id === user_id) {
        return true;
    }
    let access;
    if ('access' in user) {
        access = user.access;
    } else {
        return false;
    }
    let permissions = access.find(e => e.endpoint=="profile").permissions;
    console.log(permissions);
    if (permissions & 2 || permissions & 4 || permissions & 8) {
        return true;
    } else {
        return false;
    }
}

export const displayDestroy = (permissions: number) => {
    if (!permissions) return false;
    if (permissions & 4) {
        return true;
    } else {
        return false;
    }
}

export function getPermissions(user: User, access: any[]): Access[] {
    let roleId = user.role.id;
    let permissions = access
        .filter((e) => e.role.id == roleId)
        .map((e) => {
            return { endpoint: e.endpoint.name, permissions: e.permissions };
        });
    console.log(JSON.stringify(permissions));
    return permissions;
}