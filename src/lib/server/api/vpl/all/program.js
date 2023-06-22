import {isEmpty, pick} from "lodash-es";
import { Vertex,Link } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';

export default async function list(parent){

  const owner = this.user.id;

  const vertices = await Vertex.query().where({owner, parent});
  const links = await Link.query().where({owner, parent});

  const data = [
    ...vertices.map(o=>o.toJSON()),
    ...links.map(o=>o.toJSON()),
  ];

  return [{kind:'list', data}];
}
