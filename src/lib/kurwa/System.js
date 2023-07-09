import View from '$lib/kurwa/system/View.js';
import Database from '$lib/kurwa/system/Database.js';

class System {
  database = new Database();

  async view(...arg){ // produces a recursive node
    const view = new View(this, ...arg);
    await view.goto(); // TODO: set root -- null means home or root like `cd;`
    return view;
  }

  mount(){
    console.log(`System Mounted`);
  }

  destroy(){
    console.log(`System Destroyed`);
  }

}

export default System;
