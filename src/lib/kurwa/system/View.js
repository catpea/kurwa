// import EventEmitter from 'eventemitter3';
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();

class View {
  system;
  #location = 0;
  subscribers = [];

  constructor(system){
    this.system = system;
  }

  location(f){
    this.subscribers.push(f);
    f(this.#location);
  }

  async goto(location=null){
    if(location==null){
      this.#location = await this.system.database.root();
    }else{
      this.#location = await this.system.database.node(location);
    }
    console.log(`View location is ${this.#location.id}`);
    this.subscribers.map(f=>f(this.#location));
  }

  mount(){
    console.log(`View Mounted`);
  }

  destroy(){
    console.log(`View Destroyed`);
    this.subscribers = [];
  }

}

export default View;
