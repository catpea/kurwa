import { readable, writable, get } from 'svelte/store';
import { cloneDeep, flatten } from 'lodash-es';

import api from '$lib/api.js';

import Node from '$lib/vpl/Node.js';

export default class System {

  nodes = {};
  records = writable();

  constructor(){
    this.records.set( this.nodes );
    // this.records.subscribe(records=>console.log('Records have changed', records))
  }

  async hydrate(pojo){
    // incoming server data...
    let response = null;
    const id = pojo.id;

    const miss = this.nodes[id]===undefined;

    if(miss){
      // console.log('Pojo not in records.');
      const node = new Node(this);
      await node.load(pojo);
      response = node;
      this.nodes[id]=node;
      this.records.set(this.nodes); // NOTE: ignored becasue old and new values are the same
    }else{
      // console.log('Pojo existed in records.');
      response = this.nodes[id];
      await response.load(pojo);
      this.records.set(this.nodes); // NOTE: ignored becasue old and new values are the same
    }

    // console.log(`Object ${response.id} has changed.`);
    return response;
  }







  async root(){
    const root = (await api.vpl.root()).data.find(o=>o.kind=="node")?.data;
    await this.children(root.id); // this is the reality of complex data structures - you __always__ need the whole thing to keep the SLOC low, and prevent your program from becoming mangeled. - In the future this may need to be replaced with .all.
    return await this.hydrate(root);
  }
  async children(parent){
    const nodes = (await api.vpl.list(parent)).data.find( (o) => o.kind == "nodes" )?.data;
    return await Promise.all( nodes.map(async node=>await this.hydrate(node)) );
  }
  async node(id){
    const node = (await api.vpl.node(id)).data.find(o=>o.kind=="node")?.data;
    return await this.hydrate(node);
  }
  async all(){
    const nodes = (await api.vpl.all()).data.find( (o) => o.kind == "nodes" )?.data;
    return await Promise.all( nodes.map(async node=>await this.hydrate(node)) );
  }
  async list(parent){
    const nodes = (await api.vpl.list(parent)).data.find( (o) => o.kind == "nodes" )?.data;
    return await Promise.all( nodes.map(async node=>await this.hydrate(node)) );
  }

  async create(id, data){
    const node = (await api.vpl.create(id, data)).data.find(o=>o.kind=="node")?.data;
    // console.log('create returned POJO', node);
    return await this.hydrate(node);
  }

  async patch(id, data){
    // console.log('sending patch to api.vpl.patch on server', id, data);
    const node = (await api.vpl.patch(id, data)).data.find(o=>o.kind=="node")?.data;
    // console.log('PATCH RETURNED POJO', node);
    return await this.hydrate(node);
  }

  async remove(id){
    const response = await api.vpl.remove(id);
    const count = response.data.find(o=>o.kind=="removed")?.data;
    if(count>0){
      delete this.nodes[id];
      this.records.set(this.nodes)
    }
  }













  // Garbage Collection

  async mount(){
    // console.log('system.mount()');
  }
  async destroy(){
    // console.log('system.destroy()');
  }

  //
  // async nodes(parent){
  // 	// NOTE: a node is a vertex, but it also has inouts and outputs
  //
  // 	// GET SERIALIZED STRUCTURE FROM DATABASE call api.vpl.* functions from here...
  // 	// HYDRATE with corresponding class, this will also add writables
  //
  // 	const result = (await api.vpl.all(parent)).data.find( (o) => o.kind == "dump" )?.data;
  //
  // 	return result;
  // }
  // async edges(parent){
  // 	// GET SERIALIZED STRUCTURE FROM DATABASE call api.vpl.* functions from here...
  // 	// HYDRATE with corresponding class, this will also add writables
  // 	return [];
  // }
  //
  // async anchors(id){
  // 	// this should be alinked list: vertex.input = x-y-color-context...
  // 	const input = [
  // 		// NOTE: this function follows a linked list...
  // 		// ...(await api.vpl.list(id, 'input')) .data.find( (o) => o.kind == "array" )?.data;
  // 	];
  // 	const output = [
  // 		// ...(await api.vpl.list(id, 'output')) .data.find( (o) => o.kind == "array" )?.data;
  // 	];
  //
  //
  //
  // 	// {id:'a',  source:'q', output:'z',  destination:'w', input:'b', color:"gold", instance:false }
  // 	return {input, output};
  // }
  //
  //
  //
  //
  // create(){
  // 	// call api.vpl.* functions from here...
  // }
  //
  // destroy(){
  // 	// call api.vpl.* functions from here...
  // }
  //
  // disconnect(){
  // 	// call api.vpl.* functions from here...
  // }
  //
  // connect(){
  // 	// call api.vpl.* functions from here...
  // }
}
