import {isEmpty, pick, omit} from "lodash-es";
import { Node } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';

export default async function create(parent, data){
  const owner = this.user.id;
  const created = (new Date()).toISOString();
  const updated = (new Date()).toISOString();
  const defaults = {
    name: "My Node",
    input: [
      {
        id: "in",
        name: "Input",
        top: 0,
        left: 0
      }
    ],
    output: [
      {
        id: "out",
        name: "Output",
        top: 0,
        left: 0
      }
    ],
    edges: []
  };
  const blessed = omit( JSON.parse(data), ['id', 'owner']);
  const enforced = {
      owner,
      parent,
      created,
      updated,
      revision:1,
  };
  const {id} = await Node.query().insert(Object.assign({}, defaults, blessed, enforced) );
  const node = (await Node.query().where({id, owner}).first()).toJSON();
  return [{kind:'node', data:node}];
}
