import {chunk} from "lodash-es";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

// rm database.db; npm run migration; npm run seed;

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
      "id": 1,
      "owner": 1,
      "parent": null,
      created,
      updated,
      "revision": null,
      "cache": null,
      "data": null,
      "tags": null,
      "name": "root",
      "type": null,
      "extends": null,
      "description": "Hello, this is root speaking...",
      "top": null,
      "left": null,
      "order": null,
      "input": JSON.stringify([]),
      "output": JSON.stringify([]),
      "properties": null,
      "values": null,
      "program": null,
      "validate": null,
      "test": null,
      "edges": JSON.stringify([
        {
          "id": "a",
          "source": 2,
          "output": "out",
          "destination": 3,
          "input": "in",
          "color": "gold"
        }
      ])
    }
  ]);

  await knex('node').insert([
    {
      "id": 2,
      "owner": 1,
      "parent": 1,
      created,
      updated,
      "revision": null,
      "cache": null,
      "data": null,
      "tags": null,
      "name": "Heartbeat Data",
      "type": "heartbeat",
      "extends": null,
      "description": null,
      "top": 86.18656630880866,
      "left": 51.55969892642601,
      "order": null,
      "input": JSON.stringify([
        {
          "id": "in",
          "name": "Input",
          "top": 203.0014860650553,
          "left": 104.8287236544463
        },
        {
          "id": "transform",
          "name": "Transform",
          "top": 235.0014860650553,
          "left": 104.8287236544463,
          "value":"UPPERCASE",
        },
        {
          "id": "order",
          "name": "Order",
          "top": 267.0014860650553,
          "left": 104.8287236544463
        }
      ]),
      "output": JSON.stringify([
        {
          "id": "out",
          "name": "Output",
          "top": 117.75297564655878,
          "left": 313.8287236544463
        },
        {
          "id": "debug",
          "name": "Debug",
          "top": 164.75297564655878,
          "left": 313.8287236544463
        }
      ]),
      "properties": null,
      "values": null,
      "program": null,
      "validate": null,
      "test": null,
      "edges": JSON.stringify([])
    }
  ]);



  await knex('node').insert([

    {
      "id": 3,
      "owner": 1,
      "parent": 1,
      created,
      updated,
      "revision": null,
      "cache": null,
      "data": null,
      "tags": null,
      "name": "Print Text",
      "type": "debug",
      "extends": null,
      "description": null,
      "top": 60.81343369119133,
      "left": 493.440301073574,
      "order": null,
      "input": JSON.stringify([
        {
          "id": "in",
          "name": "Input",
          "top": 96.99759486101675,
          "left": 398.83091713725656
        },
        {
          "id": "transform",
          "name": "Transform",
          "top": 128.99758380392325,
          "left": 398.83091713725656
        },
        {
          "id": "order",
          "name": "Order",
          "top": 160.99758380392325,
          "left": 398.83091713725656
        }
      ]),
      "output": JSON.stringify([
        {
          "id": "out",
          "name": "Output",
          "top": 58.74637017733809,
          "left": 607.8309171372566
        },
        {
          "id": "debug",
          "name": "Debug",
          "top": 156.75,
          "left": 568.8333333333334
        }
      ]),
      "properties": null,
      "values": null,
      "program": null,
      "validate": null,
      "test": null,
      "edges": JSON.stringify([])
    }
  ]);


}
