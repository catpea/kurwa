import {isEmpty, pick, omit} from "lodash-es";
import { Node } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';

export default async function patch(id, patch){
  const owner = this.user.id;
  const blessed = omit( JSON.parse(patch), ['id', 'owner']);
  const updated = await Node.query().patch(blessed).where({id, owner});
  const data = (await Node.query().where({id, owner}).first()).toJSON();
  return [{
    kind: 'node',
    updated,data,
  }];
}
