import {isEmpty, pick} from "lodash-es";
import { Vertex,Link } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';

export default async function connect(parent, source, target){
  const owner = this.user.id;
  const created = (new Date()).toISOString();
  const updated = (new Date()).toISOString();

  const model = 'link';
  const link = await Link.query().insert({
    owner,
    created, updated,

    parent,
    model,
    source, target,
  });

  return [{kind:'identity', id:link.id}];
}
