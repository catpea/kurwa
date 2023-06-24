import {chunk} from "lodash-es";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

export async function seed(knex) {

  const created = (new Date()).toISOString();
  const updated = (new Date()).toISOString();
  const visited = (new Date()).toISOString();

  await knex('account').insert([
    { id: 1, name:"Mephistopheles Premium",  uuid:uuid(), created, active: true },
    { id: 2, name:"Mephistopheles Standard", uuid:uuid(), created, active: true },
  ]);

  await knex('user').insert([
    { id: 1, account:1, uuid:uuid(), created, updated, visited, visits: 0, active: true, username:'a', firstname:'Alice', middlename:'X', lastname:'Smith', email:'a@b', company: 'Mephistopheles, Inc.', position: 'Developer', password: bcrypt.hashSync('123', 10), groups: 'administrator' },
    { id: 2, account:2, uuid:uuid(), created, updated, visited, visits: 0, active: true, username:'b', firstname:'Bob', middlename:'Z', lastname:'Smith', email:'b@c', company: 'Mephistopheles, Inc.', position: 'Developer', password: bcrypt.hashSync('123', 10), groups: 'registered' }
  ]);

  await knex('node').insert([
    {
      id: 1,
      owner:1,
      parent:null,
      name: 'root',
      created,
      updated,
    }
  ]);

  await knex('node').insert([
    {
      id: 2,
      owner:1,
      parent:1,
      name: 'Alice',
      created,
      updated,
      top: 100,
      left: 100,
      input: JSON.stringify([{id:'2a', name:'in', top:0, left:0}]),
      output: JSON.stringify([{id:'2b', name:'out', top:0, left:0}]),
    }
  ]);
  await knex('node').insert([
    {
      id: 3,
      owner:1,
      parent:1,
      name: 'Bob',
      created,
      updated,
      top: 100,
      left: 350,
      input: JSON.stringify([{id:'3a', name:'in', top:0, left:0}]),
      output: JSON.stringify([{id:'3b', name:'out', top:0, left:0}]),
    }
  ]);


}
