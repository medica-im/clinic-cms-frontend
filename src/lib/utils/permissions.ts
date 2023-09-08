export const displayEditor = (permissions: number) => {
    if (!permissions) return false;
    if (permissions & 2 || permissions & 4) {
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