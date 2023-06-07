import { error } from '@sveltejs/kit';
import { variables } from '$lib/utils/constants';
import { getCurrentUser } from '$lib/utils/requestUtils';
import type { User, UserResponse } from '$lib/interfaces/user.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const [userRes, errs] = await getCurrentUser(
        fetch,
        `${variables.BASE_API_URI}/accounts/token/refresh/`,
        `${variables.BASE_API_URI}/accounts/user/`
    );
    const userResponse: User = userRes;
    if (errs.length > 0) {
        return {
            status: 302,
            redirect: '/accounts/login'
        };
    }
    return {
        response: userResponse
    };
  }