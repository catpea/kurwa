import {isEmpty} from "lodash-es";
import { User, Session } from '$lib/server/db/index.js';
import { flash, code, session, user } from '$lib/packet.js';
import {USER_EXISTS, USER_SIGNED_UP } from '$lib/code.js';
import bcrypt from "bcrypt";

export default async function signIn(username, password){

    const {existing} = await User.query().count('active', {as: 'existing'}).where('username', username).first();
    const userExists = existing > 0;
    const userDoesNotExist = existing == 0;
    if(userExists){
      return [
        flash('Account Exists', 'Please try anoter username, sign-in, of fill out the forgot password form.', 'warning'),
        code(USER_EXISTS),
      ];
    }else if(userDoesNotExist){
      const user = await User.query().insert({ created: (new Date()).toISOString(), updated: (new Date()).toISOString(), visited: (new Date()).toISOString(), visits: 0, active: true, email, password: bcrypt.hashSync(password, 10), groups: 'registered' });
      return [
        flash('Account Created', 'You can sign in now.', 'success'),
        code(USER_SIGNED_UP),
      ];
    }

}
