import { readable, writable, get } from "svelte/store";
import { cloneDeep, flatten } from "lodash-es";

class Pojo {
  _pojo = {};
  async load(pojo) {
    this._pojo = pojo;
    this.announce();
  }
  get pojo() {
    return this._pojo;
  }
  get state() {
    return cloneDeep(this._pojo);
  }
}

class Writables extends Pojo {
  #writability;
  #writables = {};

  constructor() {
    super();
    this.#writability = new Proxy(this, this.handler());
  }

  handler() {
    return {
      get(node, prop, receiver) {
        if (node.keys.includes(prop)) {
          const keyword = "$";
          const surrogate = prop + keyword;
          const descriptor = node.descriptor(prop);
          const readonly = descriptor.set === undefined;
          const isSurrogate = prop.endsWith(keyword);
          if (isSurrogate) return node[surrogate];
          const isRegistered = node.writables[prop];
          if (isRegistered) return node.writables[prop];
          const kind = readonly ? readable : writable;
          if (readonly) console.log(`Node ${prop} is read only.`);
          if (!node[surrogate]) node[surrogate] = kind(node[prop]);



          if (!readonly) node.destructible({ id: surrogate, destroy: node[surrogate].subscribe((value) => {
            console.warn( `UN-THROTTLED WRITABLE UPDATE OPERATION`);
            console.log( `Setting [${prop}] of [node.id=${node.id}] to:`, value );
            node[prop] = value;
          }), });
          if (!readonly) node.writables[prop] = node[surrogate];
          return node[surrogate];
        }
      },
    };
  }

  announce() {

    Object.entries(this.#writables).forEach(([propertyName, writableInstance]) => {
      console.log( 'Announce attempt!', propertyName, );
      const existingData = get(writableInstance);
      const updatedData = this[propertyName]; // from geter which draws data based on updated pojo!
      console.log( `Changing ${propertyName} Data From/To`, existingData,updatedData );
      writableInstance.set( updatedData );
    });

  }

  unsubscribe = [];
  destructible(trash) {
    this.unsubscribe.push(trash);
  }
  destroy() {
    this.unsubscribe.map((o) => o.destroy());
  }
  descriptor(property) {
    return Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(this),
      property
    );
  }

  get writable() {
    return this.#writability;
  }

  get keys() {
    return Object.keys(this.pojo);
  }
  get writables() {
    return this.#writables;
  }
}


export default class Node extends Writables {

	//NOTE: please remember that you can't just return a writable here. Once you create it you have to reuse it, so that all componenets that grab it at various points in time, always get their data.

  nodes;

  constructor(nodes) {
    super();
    this.nodes = nodes; // set reference to the object holding all the nodes.
  }

  //////////////////////////////////////////////////////////////////////////////////////

  get id() {
    return this.pojo.id;
  }

  get parent() {
    return this.pojo.parent;
  }
  set parent(value) {
    //TODO: verify
    this.pojo.parent = value;
  }

  get created() {
    return new Date(this.pojo.created);
  }
  set created(date) {
    //TODO: verify
    this.pojo.created = date.toISOString();
  }

  get updated() {
    return new Date(this.pojo.updated);
  }
  set updated(date) {
    //TODO: verify
    this.pojo.updated = date.toISOString();
  }

  get revision() {
    return this.pojo.revision;
  }
  set revision(value) {
    if (value <= this.pojo.revision) throw new Error("Revision can only be incremented.");
    this.pojo.revision = value;
  }

  get cache() {
    return JSON.parse(this.pojo.cache || "{}");
  }
  set cache(value) {
    //TODO: verify
    this.pojo.cache = JSON.stringify(value);
  }

  get data() {
    return JSON.parse(this.pojo.data || "{}");
  }
  set data(value) {
    //TODO: verify
    this.pojo.data = JSON.stringify(value);
  }

  get tags() {
    return new Set(JSON.parse(this.pojo.tags || "[]"));
  }
  set tags(value) {
    //TODO: verify
    this.pojo.tags = JSON.stringify(Array.from(value));
  }

  get name() {
    return this.pojo.name;
  }
  set name(value) {
    //TODO: verify
    this.pojo.name = value;
  }

  get type() {
    return this.pojo.type;
  }
  set type(value) {
    //TODO: verify
    this.pojo.type = value;
  }

  get description() {
    return this.pojo.description;
  }
  set description(value) {
    //TODO: verify
    this.pojo.description = value;
  }

  get left() {
    return this.pojo.left;
  }
  set left(value) {
    //TODO: verify
    this.pojo.left = value;
  }

  get top() {
    return this.pojo.top;
  }
  set top(value) {
    //TODO: verify
    this.pojo.top = value;
  }

  get order() {
    return this.pojo.order;
  }
  set order(value) {
    //TODO: verify
    this.pojo.order = value;
  }











	#ioBuilder(json, existing=[]){
		const master = JSON.parse(json);
    master.forEach(anchor=>{
      const located = existing.find(o=>o.id==anchor.id);
      if(located){
        anchor.top = located.top;
        anchor.left = located.left;
      }else{
        anchor.top = writable(anchor.top);
        anchor.left = writable(anchor.left);
      }
    })
		return master;
	}

	#inputStructure = null;
  #outputStructure = null;

  get input() {
		if(!this.#inputStructure){
      // Create New
      this.#inputStructure = this.#ioBuilder(this.pojo.input);
    }else{
      // Already Exists, update existing values based on pojo
      this.#inputStructure = this.#ioBuilder(this.pojo.input, this.#inputStructure);
    }
    return this.#inputStructure;
  }
  set input(value) {
    const clean = cloneDeep(value);
    clean.forEach((o) => (o.top = get(o.top)));
    clean.forEach((o) => (o.left = get(o.left)));
    this.pojo.input = JSON.stringify(clean);
    console.log("SET input", this.pojo.input);
  }

  get output() {
    if(!this.#outputStructure){
      // Create New
      this.#outputStructure = this.#ioBuilder(this.pojo.output);
    }else{
      // Already Exists, update existing values based on pojo
      this.#outputStructure = this.#ioBuilder(this.pojo.output, this.#outputStructure);
    }
    return this.#outputStructure;
  }
  set output(value) {
    const clean = cloneDeep(value);
    clean.forEach((o) => (o.top = get(o.top)));
    clean.forEach((o) => (o.left = get(o.left)));
    this.pojo.output = JSON.stringify(clean);
    console.log("SET output", this.pojo.output);
  }












  get properties() {
    return JSON.parse(this.pojo.properties || "{}");
  }
  set properties(value) {
    //TODO: verify
    this.pojo.properties = JSON.stringify(value);
  }

  get values() {
    return JSON.parse(this.pojo.values || "{}");
  }
  set values(value) {
    //TODO: verify
    this.pojo.values = JSON.stringify(value);
  }


  get edges() {
    //  "edges": [{id:'a', source:'2', output:'out', destination:'3', input:'b', color:"gold"}]

    const rehydrated = JSON.parse(this.pojo.edges || "[]");
    rehydrated.forEach((o) => (o.color = writable(o.color)));
    rehydrated.forEach(edge => {
    	edge.source = this.nodes[edge.source];
    	edge.destination = this.nodes[edge.destination];
    	edge.output = edge.source.output.find(o=>o.id==edge.output);
      edge.input = edge.destination.input.find(o=>o.id==edge.input);
    })

    return rehydrated;
  }

  set edges(value) {
    const dormant = cloneDeep(value);
		dormant.forEach((edge) => {
      edge.color = get(edge.color);
      edge.source = edge.source.id;
      edge.destination = edge.destination.id;
      edge.output = edge.output.id;
      edge.input = edge.input.id;
    });
    const dehydrated = JSON.stringify(dormant);
    this.pojo.edges = dehydrated;
  }

  get extends() {
    return JSON.parse(this.pojo.extends || "[]");
  }
  set extends(value) {
    //TODO: verify
    this.pojo.extends = JSON.stringify(value);
  }

  get validate() {
    return JSON.parse(
      this.pojo.validate || "function validate(input){ return null; }"
    );
  }
  set validate(fn) {
    //TODO: verify
    this.pojo.validate = fn.toString();
  }
  get program() {
    return JSON.parse(
      this.pojo.program || "function program(input){ return null; }"
    );
  }
  set program(fn) {
    //TODO: verify
    this.pojo.program = fn.toString();
  }
  get test() {
    return JSON.parse(this.pojo.test || "function test(input){ return null; }");
  }
  set test(fn) {
    //TODO: verify
    this.pojo.test = fn.toString();
  }
}
