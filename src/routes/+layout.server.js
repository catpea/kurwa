// import Api from '$lib/server/api/index.js';
import {pick} from 'lodash-es';

export async function load(event) {
    return {
      // user: await Api(event.locals.user).system.getUser()
    };
}
