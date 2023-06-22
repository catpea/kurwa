import {isEmpty, pick} from "lodash-es";
import { Vertex,Link } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';

export default async function destroy(id){
  const owner = this.user.id;
  const deleted = await Vertex.query().delete().where({owner, id:parseInt(id)});
  return [deleted];
}
