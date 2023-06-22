import {isEmpty, pick} from "lodash-es";
import { User, Session } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';

export default async function getUser(username){
  const user = await User.query().where({username: this.user.username}).first();
  const packet = pick(user, ['name', 'username', 'company', 'position', 'email']);
  console.log({packet});
  packet.kind = 'user';
  return [packet];
}
