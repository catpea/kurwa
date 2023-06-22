import {startCase} from 'lodash-es';
import noArguments from './policies/no-arguments/index.js';
import activeUser from './policies/active-user/index.js';
import rateLimit from './policies/rate-limit/index.js';

const functions = {
  noArguments,
  activeUser,
  rateLimit,
};

export const rules = Object.fromEntries( Object.keys(functions).map(name=>functions[name]).map(({metadata, program})=>[startCase(metadata.name).replace(/ /g,''),{...metadata, program}]) );
