export class Base {
  // Regarding System Internals (not dragging, dropping, etc...)
  destructors = [];

  on(eventTarget, id, eventHandler){
    const [eventName] = id.split(/\W/,1);
    const that = this;
    const handler = function(...input){
      eventHandler.bind(that)(...input);
    };
    eventTarget.addEventListener(eventName, handler);
    const destructor = () => eventTarget.removeEventListener( eventName , handler );
    this.destructors.push({id, destructor});
  }
  off(id){
    const clean = this.destructors.filter(o=>o.id==id);
     //console.log('cleaning', ...clean.map(o=>o.id));
    clean.map(o=>o.destructor());
    this.destructors = [...this.destructors.filter(o=>o.id!==id)]
  }
}
