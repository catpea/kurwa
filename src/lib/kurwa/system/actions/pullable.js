/*
  NOTES
  pullable is in Node -> card -> icon -> .
*/
import {first} from 'lodash-es';
import { v4 as guid } from 'uuid';
import { get, writable } from 'svelte/store';
import {Base} from './Base.js';
export const pulline =  { active:writable(false), x1:writable(0), y1:writable(0), x2:writable(0), y2:writable(0) } ;

class Pullable extends Base {
  description = 'The system for pulling new nodes out of anchors';
  // Regarding Object Configuration
  element;
  anchor;
  type;
  system;
  // Regarding Operations, temporary, use-case specific
  clientX = 0;
  clientY = 0;
  constructor({element, node, anchor, type, translate, system}){
    super()
    this.element = element;
    this.node = node;
    this.anchor = anchor;
    this.type = type;
    this.translate = translate;
    this.system = system;

    this.create();
  }
  create(){
    this.on(this.element, 'mousedown: primary', this.activate);
  }
  destroy(){
    this.off('mousedown: primary');
     //console.log(`${this.description} destroyed! Exiting with ${this.destructors.length} listerenrs left.`);
    if(this.destructors.length) console.error(`lol, ${this.description} has memory leaks now.`);
  }
  activate(e) {
    pulline.x1.set(get(this.anchor.left));
    pulline.y1.set(get(this.anchor.top));
    // Initially the line starts and ends at the same point.
    pulline.x2.set(get(this.anchor.left));
    pulline.y2.set(get(this.anchor.top));
    pulline.active.set(true);
    this.clientX = e.clientX;
    this.clientY = e.clientY;
    this.on( document, 'mousemove: dragging', this.operate);
    this.on( document, 'mouseup: end dragging operation', this.deactivate);
  };
  deactivate(e) {
    pulline.active.set(false);
    this.off('mousemove: dragging');
    this.off('mouseup: end dragging operation');
    if(!e.target.dataset.node) return;
    if(!e.target.dataset.anchor) return;
    const parent = Object.values(get(this.system.records)).find(o=>o.id==this.node.parent);
    const edges = [];
    if(this.type === 'output'){
      edges.push({id:guid(), source:this.system.nodes[this.node.id], output:this.system.nodes[this.node.id].output.find(o=>o.id==this.anchor.id), destination:this.system.nodes[e.target.dataset.node], input:this.system.nodes[e.target.dataset.node].input.find(o=>o.id==e.target.dataset.anchor), color:writable("gold")})
    }else{
      edges.push({id:guid(), source:this.system.nodes[e.target.dataset.node], output:this.system.nodes[e.target.dataset.node].output.find(o=>o.id==e.target.dataset.anchor), destination:this.system.nodes[this.node.id], input:this.system.nodes[this.node.id].input.find(o=>o.id==this.anchor.id), color:writable("gold")})
    }
    // console.log('XXX2: edges about to ehange', parent.id, parent);
    const existing = get(parent.writables.edges);
    const updated = existing.concat(...edges);
    parent.writables.edges.set( [...updated] );

  }
  operate(e){
    // NOTE: this fires every few ms.
    // How far the mouse has been moved in the last few ms
    const scale = get(this.translate.z); // (dx/scale)
    const dx = e.clientX - this.clientX;
    const dy = e.clientY - this.clientY;
    // Set the position of element
    // this.element.style.left = `${this.element.offsetLeft + dx}px`;
    // this.element.style.top = `${this.element.offsetTop + dy}px`;
    pulline.x2.set( get(pulline.x2) + (dx/scale) );
    pulline.y2.set( get(pulline.y2) + (dy/scale) );
    // update known position
    this.clientX = e.clientX;
    this.clientY = e.clientY;
  }
}

export function pullable(element, options){
  const operation = new Pullable({element, ...options});
  return {
		destroy() {
			operation.destroy();
		}
	};
}
