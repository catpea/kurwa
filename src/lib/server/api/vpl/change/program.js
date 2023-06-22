import {isEmpty, pick} from "lodash-es";
import { Vertex,Link } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';

export default async function change(name, id, property, value){
  const owner = this.user.id;
  const tables = { vertex: Vertex, link: Link  };
  const table = tables[name];
  const patch = {[property]:value}
  const updated = await table.query().patch(patch).where({id, owner});
  const results = (await table.query().where({id, owner})).map(o=>o.toJSON());
  return [{
    kind: 'changes',
    updated,results,
  }];
}
