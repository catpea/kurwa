import { cloneDeep } from 'lodash-es';

export class Tree {
  #poke = 0;
  #root = {};
  #node = [];
  #edge = [];
  #hear = [];
  constructor(node, edge){
    this.#node = node;
    this.#edge = edge;
    this.#root = this.#edge.find(o=>!o.source).target;
  }
  get poke(){
    return this.#poke;
  }
  set poke(value){
    this.#poke = value;
  }
  get peek(){
    const tree = this;
    return new Proxy({}, {
      get(empty, id, receiver) {
        if (id === 'then') return null; // caused by interaction with promises
        return tree.node(id);
      }
    });
  }
  root(id){
    return this.node(this.#root);
  }
  node(id){
    return this.#node.find(o=>o.id==id);
  }
  list(id){
    return this.#edge.filter(o=>o.source===(id||this.#root)).map(o=>this.#node.find(x=>o.target===x.id));
  }
  base(id, path=[]){
    const parent = this.#edge.find(o=>o.target==id);
    if(parent?.source){
      path.unshift(parent.source);
      this.base(parent.source, path);
    }
    return path;
  }
  dump(id){
    const root = cloneDeep( this.node((id||this.#root)) );
    root.list = cloneDeep(this.list(id));
    for (const child of root.list) {
      child.list = this.dump(child.id);
    }
    return root;
  }
  move(id,parent){
  }
  copy(id,parent){
  }
  kill(id){
  }
  hear(){
    this.#hear.map(o=>o())
  }
  flux(listener){
    this.#hear.push(listener);
    return () => this.#hear = this.#hear.filter(o => o !== listener);

  }
}

export default Tree;
