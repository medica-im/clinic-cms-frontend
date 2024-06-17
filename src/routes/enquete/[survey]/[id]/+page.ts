import { variables } from '$lib/utils/constants';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';

import type { PageLoad } from './$types';
export const load: PageLoad = async ({ fetch, params }) => {
    const surveyName = params.survey;
    const responseUrl = `${variables.BASE_API_URI}/surveys/${surveyName}/responses/${params.id}/`;

    const fetchSurvey = async () => {
        const url = `${variables.BASE_API_URI}/surveys/${surveyName}`;
        const res = await fetch(url);
        const survey = await res.json();
        return survey;
    }
    const fetchResponse = async () => {
        try {
            const [response, err] = await handleRequestsWithPermissions(fetch, responseUrl);
            if (response) {
                console.log(`responses:${JSON.stringify(response)}`)
                response.surveyName=surveyName;
                return response;
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
        response: await fetchResponse(),
        responseUrl: responseUrl,
        surveyName: surveyName
    };
};