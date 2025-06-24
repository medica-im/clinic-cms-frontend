import { fail } from '@sveltejs/kit';
import { variables } from '$lib/utils/constants.ts';
import type { Effector } from '$lib/interfaces/v2/effector.ts';
import type { Actions } from './$types';

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    let jsonString = JSON.stringify(Object.fromEntries(formData));
    let json = JSON.parse(jsonString);
    console.log(`data:${JSON.stringify(json)}`);
    const response = await fetch(`${variables.BASE_URI}/api/v2/effectors/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(json)
    });
    if (response.ok == false) {
      console.error(response.status)
      console.error(response.statusText)
      return {
        success: false,
        status: response.status
      }
    } else {
      const json = await response.json()
      console.log(`Success! Status: ${response.status} Status text: ${response.statusText}`);
      console.log(json);
      return {
        success: true,
        status: response.status,
        data: json
      }
    }
  }
} satisfies Actions;