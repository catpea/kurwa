import {isEmpty, pick} from "lodash-es";
import { Node } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';

export default async function node(id){
  const owner = this.user.id;
  const node = await Node.query().where({owner, id}).first();
  return [{kind:'node', data:node.toJSON()}];
}
