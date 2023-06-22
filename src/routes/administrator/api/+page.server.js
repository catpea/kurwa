import { flatten, startCase, isEmpty } from 'lodash-es';
import {reflect, execute} from '$lib/server/api/index.js';
import {rules} from '$lib/server/rules/index.js';
import * as validators from '$lib/validators.js';

export async function load(event) {
  return {
    reflect: reflect()
  };
}

export const actions = {

  api: async ({ locals, request }) => {
    const {user} = locals;
    const packet = await request.json();
    if(isEmpty(user)) return [{kind: 'flash', title:'Missing User', message:'User object not available.'}];
    if(!packet.category) return [{kind: 'flash', title:'Missing Category', message:'The API call was missing the "category" parameter.'}];
    if(!packet.action) return [{kind: 'flash', title:'Missing Action', message:'The API call was missing the "action" parameter.'}];
    if(!packet.input) return [{kind: 'flash', title:'Missing Input', message:'The API call was missing the "input" parameter.'}];
    return await execute({user, packet});
  }

};
