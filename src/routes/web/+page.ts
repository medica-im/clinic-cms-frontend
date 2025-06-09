import { getCurrentUser } from '$lib/utils/requestUtils';
import type { PageLoad } from './$types';
import type { Token, User, UserResponse } from '$lib/interfaces/user.interface';
import type { CustomError } from '$lib/interfaces/error.interface';

export const load: PageLoad = async ({ fetch, params }) => {
    const [user, errs] =   await getCurrentUser(fetch);
    if (errs.length > 0) {
        return {
            status: 302,
            redirect: '/accounts/login'
        };
    }
    return {
        user: user
    };
}