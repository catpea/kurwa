import {isEmpty, pick} from "lodash-es";
import { Vertex,Link } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';

export default async function create(parent, name){
  const owner = this.user.id;
  const created = (new Date()).toISOString();
  const updated = (new Date()).toISOString();

  const model = 'vertex';
  const vertex = await Vertex.query().insert({
    owner,
    parent,
    model,
    name,
    created,
    updated,
  });
  return [{kind:'identity', id:vertex.id}];
}
