import {account} from '$lib/api/index.js';

export async function load(event) {
  return {
      userrrr: {}
  };
}

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const result = await account.resetPassword({email});
        return result;
    },
};
