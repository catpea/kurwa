import {isEmpty, pick} from "lodash-es";
import { Node } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';

export default async function list(){
  const owner = this.user.id;
  const nodes = await Node.query().where({owner,});
  const data = [
    ...nodes.map(o=>o.toJSON()),
  ];
  return [{kind:'nodes', data}];
}
