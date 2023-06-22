import {isEmpty} from "lodash-es";
import { User, Session } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '$lib/code.js';
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

export default async function signIn(username, password){

    const userInstance = await User.query().where({username}).first();
    const userExists = !isEmpty(userInstance);
    const authenticated = userExists?bcrypt.compareSync(password, userInstance.password):false;

    if(authenticated){
      const userSession = await Session.query().insert({ owner: userInstance.id, token: uuid(), expires: (new Date()).toISOString(), updated: (new Date()).toISOString(), created: (new Date()).toISOString(), });

      return [
        code(SIGN_IN_SUCCESS),
        flash('Sign-in Successs', 'You are logged in.', 'success'),
        session(userSession),
        user(userInstance),
      ];

    }else{
      return [
        code(SIGN_IN_FAILURE),
        flash('Sign-in Failed', 'Authentication failure, try again.', 'danger'),
      ];

    }

}
