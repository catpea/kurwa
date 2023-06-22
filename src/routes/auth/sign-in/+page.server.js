import {SIGN_IN_SUCCESS} from '$lib/code.js';
import {account} from '$lib/api/index.js';
import { User, Session } from '$lib/db/index.js';

export async function load(event) {
  return {
      userrrr: {}
  };
}

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    const result = await account.signIn({email, password});
    if(result.code == SIGN_IN_SUCCESS){
      cookies.set('token', result.session.token, {httpOnly:true,secure:true, path: '/'});
    }
    return result;
  },
};
