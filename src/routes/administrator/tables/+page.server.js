import lo from 'lodash';
import { Account, User, Session, Node } from '$lib/server/db/index.js';

export async function load(event) {

  const user = {};

  const accounts = ( await Account.query() ).map(o=>({...o}));
  const users = ( await User.query() ).map(o=>({...o}));
  const sessions = ( await Session.query() ).map(o=>({...o}));

  const nodes = ( await Node.query() ).map(o=>({...o}));

  return {
      user,
      accounts,users,sessions,
      nodes,
  };

}
