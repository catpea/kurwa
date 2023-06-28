import {isEmpty, pick} from "lodash-es";
import { Node } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';

export default async function remove(id){
  const owner = this.user.id;
  const count = await Node.query().delete().where({owner, id});
  return [{ kind:'removed', id, data:count }];
}
