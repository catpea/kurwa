// import acl from '$lib/acl/index.js';
import {account} from '$lib/api/index.js';
export async function load({locals, cookies}) {

  // const verdict = acl.allows(locals.user, 'sign-out');
  // if(verdict.deny) return acl.flash(verdict);

  const token = cookies.get('token');
  if(!token) return {flash:{title:"Not Signed In", message:"You are not signed in."}};
  const result = await account.signOut(token);
  cookies.delete('token', {path: '/'}); // always deleted
  return result;

}
