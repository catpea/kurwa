import {rules} from '$lib/server/rules/index.js';
import {permissions} from '$lib/server/permissions/index.js';
import {omit, pick, startCase, camelCase, isEmpty, first} from 'lodash-es';

import { flash, code, session, user } from '$lib/packet.js';
import { VALID_PACKET } from '$lib/code.js';
import metadata from './metadata.json';

import {Account} from './account/index.js'
import {System} from './system/index.js'
import {Vpl} from './vpl/index.js'

function nameArguments(data, schema){
  const response = {};
  let index = 0;
  for (const entry of schema) {
    response[entry.name] = data[index];
    index++;
  }
  return response;
}

class Api {
  #log = [flash('Hello', 'world')];

  get metadata() {
    return metadata;
  }

  get categories() {
    return Object.getOwnPropertyNames( Reflect.getPrototypeOf( this ) ).filter(o=>!['execute', 'permits', 'validates', 'log', 'can', 'has', 'metadata', 'constructor', 'categories'].includes(o));
  }

  has(category) {
    return this.categories.includes(camelCase(category));
  }

  log(...input){
    if(input) this.#log = [...this.#log, ...input];
    return this.#log;
  }

  async permits(user, category, action) {
    const context = {user};
    const complaints = [];
    //console.log('permits', category, action, this[category]);
    for (const permission of this[category][camelCase(action)].permissions) {
      const access = await permissions.allow(user, permission);
      //console.log({access});
      if(access.denied){
        complaints.push( flash(`Permission Failue: ${access.title}`, `User permission system stopped execution of unauthorized packet. ${access.message}`, 'danger') );
      }
    }

    const noComplaints = complaints.length === 0;
    if(noComplaints){
       return VALID_PACKET;
     }else{
       this.log(...complaints);
       return false;
     }
  }

  async validates(user, category, action, input) {
    const context = {user};
    const complaints = [];
    for (const ruleName of this[category][camelCase(action)].rules) {
      const access = await rules[ruleName].program.bind(context)(nameArguments(input, this[category][camelCase(action)].schema), input);
      if(access.denied){
        complaints.push( flash(`Packet Validation Failue At ${rules[ruleName].name}`, `Rule responsible for ${rules[ruleName].description} stopped execution of invalid, malformed or dangerous packet. The validator responsible stated the following reason: "${access.message}"`, 'danger') );
      }
    }
    const noComplaints = complaints.length === 0;
    if(noComplaints){
       return VALID_PACKET;
     }else{
       this.log(...complaints);
       return false;
     }
  }

  async execute(user, category, action, input) {
    const context = {user};
    //console.log('this[category][action]', this[category][action]);
    return this[category][camelCase(action)].program.bind(context)(...input);
  }

  ///////////////////////////

  get account(){
    return new Account();
  }
  get system(){
    return new System();
  }
  get vpl(){
    return new Vpl();
  }

}

export function reflect(){
  const api = new Api();
  const response = { categories: [], actions: [], permissions: [], rules: [], schema: [], tests: [], }
  //console.log('api.categories',api.categories);
  for (const category of api.categories) {
    response.categories.push(api[category].metadata);
    //console.log('api[category].actions', category, api[category].actions);
    for (const action of api[category].actions) {
      //console.log({action});
      response.actions.push({ category:api[category].metadata, action: api[category][action].metadata })
      response.permissions.push({category:api[category].metadata.name, action:api[category][action].metadata.name, data:api[category][action].permissions});
      response.rules.push({category:api[category].metadata.name, action:api[category][action].metadata.name, data:api[category][action].rules});
      response.schema.push({category:api[category].metadata.name, action:api[category][action].metadata.name, data:api[category][action].schema});
      response.tests.push({category:api[category].metadata.name, action:api[category][action].metadata.name, data:api[category][action].tests});
    }
  }
  return response;
}

export async function execute({user, packet}){
  const api = new Api();
  const { category, action, input } = packet;

  const hasCategory = api.has( category );
  const categoryHasAction = api[category].has( action );
  const apiPermits = await api.permits(user, category, action);
  const apiValidates = await api.validates(user, category, action, input);
  //console.log({hasCategory, categoryHasAction, apiPermits, apiValidates });

  if( api.has( category ) && api[category].has( action ) && await api.permits(user, category, action) && await api.validates(user, category, action, input) ){
    return await api.execute(user, category, action, input);
  }else{
    return api.log();
  }
}
