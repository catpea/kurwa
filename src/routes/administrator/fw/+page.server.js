// import { flatten, startCase, omit } from 'lodash-es';

import {reflect} from '$lib/server/api/index.js';
// import defense from '$lib/server/defense/index.js';
// import * as validators from '$lib/validators.js';

// const policies = await defense();

export async function load(event) {
  // const api = await Api(event.locals.user).index;
  // const defense = Object.keys(await policies).map(name=>omit(policies[name], 'program'))
  return {
    reflect: reflect()
  };
}

// export const actions = {
//   api: async ({ locals, request }) => {
//     const payload = await request.json();
//     const {category, name, parameters } = payload;
//     if(!category) return [{kind: 'flash', title:'Missing Data', message:'The API call was missing the "category" parameter.'}];
//     if(!name) return [{kind: 'flash', title:'Missing Data', message:'The API call was missing the "name" parameter.'}];
//     const response = await Api(locals.user)[category][name](...parameters);
//     return response;
//   }
// };
