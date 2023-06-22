import { Account, User, Session } from '$lib/server/db/index.js';


// import {account} from '$lib/api/index.js';
export async function handle({ event, resolve }) {

  const user = await User.query().where({id:1}).first();
  // const token = event.cookies.get('token');
  // if (token) {
  //   const user = await account.getUser(token);
    event.locals.user = user.toJSON();
    // console.log('event.locals.user', event.locals.user);
  // }else{
    // event.locals.user = {};
  // }

  const response = await resolve(event);
  // response.headers.set('x-custom-header', 'potato');
  return response;
}
