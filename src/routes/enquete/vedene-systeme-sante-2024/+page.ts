import { variables } from '$lib/utils/constants';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';

import type { PageLoad } from './$types';
export const load: PageLoad = async ({ fetch, params }) => {
    const surveyName = 'vedene-systeme-sante-2024';
    const responsesUrl = `${variables.BASE_API_URI}/surveys/${surveyName}/responses/`;

    const fetchSurvey = async () => {
        const url = `${variables.BASE_API_URI}/surveys/${surveyName}`;
        const res = await fetch(url);
        const survey = await res.json();
        return survey;
    }
    const fetchResponses = async () => {
        try {
            const [responses, err] = await handleRequestsWithPermissions(fetch, responsesUrl);
            if (responses) {
                if (responses?.length) {
                    responses.sort((a, b) => (a.created > b.created) ? -1 : ((a.created < b.created) ? 1 : 0));
                    responses.forEach(e=>e.surveyName=surveyName);
                }
                return responses;
            } else {
                console.error(JSON.stringify(err));
            }
        } catch (err) {
            console.error(JSON.stringify(err));
            return {};
        };
    }
    return {
        survey: await fetchSurvey(),
        responses: await fetchResponses(),
        responsesUrl: responsesUrl,
        surveyName: surveyName
    };
};