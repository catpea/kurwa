import { readable, writable, get } from "svelte/store";
import { cloneDeep, flatten, debounce, omit } from "lodash-es";



class Pojo {
  _clientVersion = {};
  async load(pojo) {
    this._serverVersion = cloneDeep(pojo);
    this._clientVersion = cloneDeep(pojo);
    this.announce();
  }
  get pojo() {
    return this._clientVersion;
  }
  get state() {
    return cloneDeep(this._clientVersion);
  }
}

class Writables extends Pojo {

  #writability;
  #writables = {};

  constructor() {
    super();
    this.#writability = new Proxy(this, this.handler());
    this.debouncedSave = debounce(this.save, 999);
  }

  handler() {
    return {
      get(node, prop, receiver) {
        if (node.keys.includes(prop)) {
          const keyword = "$";
          const surrogate = prop + keyword;
          // console.log('Examining prop', prop);
          const readonly = node.readOnly.includes(prop)
          const isSurrogate = prop.endsWith(keyword);
          if (isSurrogate) return node[surrogate];
          const isRegistered = node.writables[prop];
          if (isRegistered) return node.writables[prop];
          const kind = readonly ? readable : writable;
          // if (readonly) // console.log(`Node ${prop} is read only.`);
          if (!node[surrogate]) node[surrogate] = kind(node[prop]);



          if (!readonly) node.destructible({ id: surrogate, destroy: node[surrogate].subscribe((value) => {
            // console.warn( `UN-THROTTLED WRITABLE UPDATE OPERATION`);
            // console.log( `Setting [${prop}] of [node.id=${node.id}] to:`, value );
            node[prop] = value;
            // console.info('SAVE ME')
            node.debouncedSave(); // no to await result...

          }), });
          if (!readonly) node.writables[prop] = node[surrogate];
          return node[surrogate];
        }
      },
    };
  }

  announce() {

    Object.entries(this.#writables).forEach(([propertyName, writableInstance]) => {
      // console.log( 'Announce attempt!', propertyName, );
      const existingData = get(writableInstance);
      const updatedData = this[propertyName]; // from geter which draws data based on updated pojo!
      // console.log( `Changing ${propertyName} Data From/To`, existingData,updatedData );
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


  get writable() {
    return this.#writability;
  }

  get keys() {
    return Object.keys(this._clientVersion);
  }
  get writables() {
    return this.#writables;
  }
}

class Properties extends Writables {

  // NOTE: when adding new features remember to reuse writables.

  readOnly = ['id']; // replacement for getOwnPropertyDescriptor which creates anomalies as new features are added


  //////////////////////////////////////////////////////////////////////////////////////

  get id() {
    return this._clientVersion.id;
  }

  get parent() {
    return this._clientVersion.parent;
  }
  set parent(value) {
    //TODO: verify
    this._clientVersion.parent = value;
  }

  get created() {
    return new Date(this._clientVersion.created);
  }
  set created(date) {
    //TODO: verify
    this._clientVersion.created = date.toISOString();
  }

  get updated() {
    return new Date(this._clientVersion.updated);
  }
  set updated(date) {
    //TODO: verify
    this._clientVersion.updated = date.toISOString();
  }

  get revision() {
    return this._clientVersion.revision;
  }
  set revision(value) {
    if (value <= this._clientVersion.revision) throw new Error("Revision can only be incremented.");
    this._clientVersion.revision = value;
  }

  get cache() {
    return JSON.parse(this._clientVersion.cache || "{}");
  }
  set cache(value) {
    //TODO: verify
    this._clientVersion.cache = JSON.stringify(value);
  }

  get data() {
    return JSON.parse(this._clientVersion.data || "{}");
  }
  set data(value) {
    //TODO: verify
    this._clientVersion.data = JSON.stringify(value);
  }

  get tags() {
    return new Set(JSON.parse(this._clientVersion.tags || "[]"));
  }
  set tags(value) {
    //TODO: verify
    this._clientVersion.tags = JSON.stringify(Array.from(value));
  }

  get name() {
    return this._clientVersion.name;
  }
  set name(value) {
    //TODO: verify
    this._clientVersion.name = value;
  }

  get type() {
    return this._clientVersion.type;
  }
  set type(value) {
    //TODO: verify
    this._clientVersion.type = value;
  }

  get description() {
    return this._clientVersion.description;
  }
  set description(value) {
    //TODO: verify
    this._clientVersion.description = value;
  }

  get left() {
    return this._clientVersion.left;
  }
  set left(value) {
    //TODO: verify
    this._clientVersion.left = value;
  }

  get top() {
    return this._clientVersion.top;
  }
  set top(value) {
    //TODO: verify
    this._clientVersion.top = value;
  }

  get order() {
    return this._clientVersion.order;
  }
  set order(value) {
    //TODO: verify
    this._clientVersion.order = value;
  }











	#ioBuilder(json, existing=[]){
		let master;
    try {
      master = JSON.parse(json);
    }catch(e){
      master = [];
    }
    master.forEach(anchor=>{
      const located = existing.find(o=>o.id==anchor.id);
      if(located){
        anchor.top = located.top;
        anchor.left = located.left;
        anchor.data = located.data;
      }else{
        anchor.top = writable(anchor.top);
        anchor.left = writable(anchor.left);
        anchor.data = writable(anchor.value||null);
      }
    })
		return master;
	}

	#inputStructure = null;
  #outputStructure = null;

  get input() {
		if(!this.#inputStructure){
      // Create New
      this.#inputStructure = this.#ioBuilder(this._clientVersion.input);
    }else{
      // Already Exists, update existing values based on pojo
      this.#inputStructure = this.#ioBuilder(this._clientVersion.input, this.#inputStructure);
    }
    return this.#inputStructure;
  }
  set input(value) {
    const clean = cloneDeep(value).map((o) => omit(o, ['data'] ));

    clean.forEach((o) => (o.top = get(o.top)));
    clean.forEach((o) => (o.left = get(o.left)));
    this._clientVersion.input = JSON.stringify(clean);
    // console.log("SET input", this._clientVersion.input);
  }

  get output() {
    if(!this.#outputStructure){
      // Create New
      this.#outputStructure = this.#ioBuilder(this._clientVersion.output);
    }else{
      // Already Exists, update existing values based on pojo
      this.#outputStructure = this.#ioBuilder(this._clientVersion.output, this.#outputStructure);
    }
    return this.#outputStructure;
  }
  set output(value) {
    const clean = cloneDeep(value).map((o) => omit(o, ['data'] ));
    clean.forEach((o) => (o.top = get(o.top)));
    clean.forEach((o) => (o.left = get(o.left)));
    this._clientVersion.output = JSON.stringify(clean);
    // console.log("SET output", this._clientVersion.output);
  }












  get properties() {
    return JSON.parse(this._clientVersion.properties || "{}");
  }
  set properties(value) {
    //TODO: verify
    this._clientVersion.properties = JSON.stringify(value);
  }

  get values() {
    return JSON.parse(this._clientVersion.values || "{}");
  }
  set values(value) {
    //TODO: verify
    this._clientVersion.values = JSON.stringify(value);
  }


  get edges() {
    //  "edges": [{id:'a', source:'2', output:'out', destination:'3', input:'b', color:"gold"}]

    let rehydrated;

     try {
      rehydrated = JSON.parse(this._clientVersion.edges || "[]");
     } catch(e){
       rehydrated = [];
     }

    rehydrated.forEach((o) => (o.color = writable(o.color)));
    rehydrated.forEach(edge => {
      try{
    	edge.source = this.system.nodes[edge.source];
    	edge.destination = this.system.nodes[edge.destination];
    	edge.output = edge.source.output.find(o=>o.id==edge.output);
      edge.input = edge.destination.input.find(o=>o.id==edge.input);
    }catch(e){
      edge.error=e;
    }
    })

    return rehydrated.filter(o=>!o.error);
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
    this._clientVersion.edges = dehydrated;
  }

  get extends() {
    return JSON.parse(this._clientVersion.extends || "[]");
  }
  set extends(value) {
    //TODO: verify
    this._clientVersion.extends = JSON.stringify(value);
  }

  get validate() {
    return JSON.parse(
      this._clientVersion.validate || "function validate(input){ return null; }"
    );
  }
  set validate(fn) {
    //TODO: verify
    this._clientVersion.validate = fn.toString();
  }
  get program() {
    return JSON.parse(
      this._clientVersion.program || "function program(input){ return null; }"
    );
  }
  set program(fn) {
    //TODO: verify
    this._clientVersion.program = fn.toString();
  }
  get test() {
    return JSON.parse(this._clientVersion.test || "function test(input){ return null; }");
  }
  set test(fn) {
    //TODO: verify
    this._clientVersion.test = fn.toString();
  }
}

export default class Node extends Properties {

  // NOTE: users.user.alice when each wrapped in writable = $users $user $name, which creates a datqa monitoring system for when users are added, user properties are added/removed and when name changes.

  system;

  constructor(system) {
    super();
    this.system = system;
  }

  viewChildren = writable([]);
  async view(){
    this.viewChildren.set( await this.system.list(this.id) );
    this.destructible({ id: 'viewChildren', destroy: this.system.records.subscribe(value=>{ this.viewChildren.set( Object.values(value).filter(o=>o.parent==this.id) ) }) })
    return {nodes: this.viewChildren, edges: this.writable.edges }
  }

  add(){}
  connect(){}
  remove(){}

  async save(){


    const patch = {};
    for (const prop in this._clientVersion) {
      // console.warn('WARNING: does not take multiple users editing the same thing under consideration.');
      if(this._clientVersion[prop] != this._serverVersion[prop]) patch[prop] = this._clientVersion[prop];
    }

    const changes = Object.keys(patch).length;
    if(changes > 0){
      console.log(patch);
      await this.system.patch(this.id, JSON.stringify(patch));
    }
  }
}
