/*
  NOTES
  pullable is in Node -> card -> icon -> .
*/
import {first} from 'lodash-es';
import { v4 as guid } from 'uuid';
import { get, writable } from 'svelte/store';
import {Base} from './Base.js';
export const pulline =  { active:writable(false), x1:writable(0), y1:writable(0), x2:writable(0), y2:writable(0) } ;

class Toolbox extends Base {
  description = 'The system for pulling new nodes out of anchors';

  // Regarding Object Configuration
  element;
  operation;
  translate;

  constructor({element, operation, translate}){
    super()
    this.element = element;
    this.operation = operation;
    this.translate = translate;
    this.create();
  }

  create(){
    this.on(this.element, 'dblclick: primary', this.activate);
    console.log(`Installed dblclick on`, this.element);
  }
  destroy(){
    this.off('mousedown: primary');
    if(this.destructors.length) console.error(`lol, ${this.description} has memory leaks now.`);
  }

  activate(e) {
    this.operate(e);
    // this.on( document, 'mouseup: end dragging operation', this.deactivate);
  };
  deactivate(e) {
    // this.off('mouseup: end dragging operation');
  }

  operate(e){
    console.log('TODO: offset layer positioning!!!');
    let {layerX:left,layerY:top} = e;
    left = left - 1000;
    top = top - 1000;
    const position = {left, top};
    this.operation(position)
  }

}


export function toolbox(element, options={}){
  const operation = new Toolbox({element, ...options});
  return {
		destroy() {
			operation.destroy();
		}
	};
}
