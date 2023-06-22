export function up(knex) {
 //execute: knex migrate:latest

  return knex.schema

  .createTable('account', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('uuid');
    table.string('active');
    table.string('created');
  })
  .createTable('user', (table) => {
    table.increments('id').primary();
    table.integer('account').references('account.id');
    table.string('uuid');
    table.string('firstname');
    table.string('middlename');
    table.string('lastname');
    table.string('username').unique();
    table.string('company');
    table.string('position');
    table.string('email').unique();
    table.string('password');
    table.string('groups');
    table.string('active');
    table.boolean('halt'); // prevent login attempts
    table.string('created');
    table.string('updated');
    table.string('visited');
    table.string('visits');
  })
  .createTable('session', (table) => {
    table.increments('id').primary();
    table.integer('owner').references('user.id');
    table.string('token');
    table.string('expires');
    table.string('updated');
    table.string('created');
  })


  // ultra fast schema for a vpl, note that nodes nest, there is always a root node.
  // when user first opens the applicaion, they will be looking inside the root node.
  // when they add a node, it will have the parent id of root node,
  // BUT, when they add a connection, that information is stored in the parent.edges - THIS IS FAST, and sufficent.
  .createTable('node', (table) => {

    table.increments('id').primary();
    table.integer('owner').references('user.id');
    table.integer('parent').references('node.id'); // can belong to a node
    table.string('created');
    table.string('updated');
    table.string('revision');
    table.string('cache');
    table.string('data');
    table.integer('tags');
    table.string('name');
    table.string('type');
    table.string('extends'); // what other record are we inheriting from (used for node libraries)
    table.string('description');

    // NODE SPECIFIC
    // geometric position and z-index for selecting
    table.string('x');
    table.string('y');
    table.string('z');

    // JSON: list of inputs and outputs, this eliminates additional queries and allows editing via built-in code editor
    table.string('input');
    table.string('output');

    // JSON: list of properties the node contains
    table.string('properties');
    table.string('values'); // list of values that override propery defaults

    // JavaScript:
    table.string('program'); // funcion executed when writables notify of changes
    table.string('validate'); // node validation
    table.string('test'); // test is node is operational

    // EDGES
    // for when a node is a parent or just root.
    table.string('edges'); // edges present within this node - edges listed here connect all anchors of all.

  })


};

export function down(knex) {
};
