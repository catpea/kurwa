/*
  NOTES
  pullable is in Node -> card -> icon -> .
*/
import {first} from 'lodash-es';
import { v4 as guid } from 'uuid';
import { get, writable } from 'svelte/store';
import {Base} from '../../lib/Base.js';
import {bus} from '../../lib/stores.js';
export const pulline =  { active:writable(false), x1:writable(0), y1:writable(0), x2:writable(0), y2:writable(0) } ;

class Pullable extends Base {
  description = 'The system for pulling new nodes out of anchors';

  // Regarding Object Configuration
  element;
  anchor;
  type;

  // Regarding Operations, temporary, use-case specific
  clientX = 0;
  clientY = 0;

  constructor({element, node, anchor, type, translate}){
    super()
    this.element = element;
    this.node = node;
    this.anchor = anchor;
    this.type = type;
    this.translate = translate;

    this.create();
  }

  create(){
    this.on(this.element, 'mousedown: primary', this.activate);
  }
  destroy(){
    this.off('mousedown: primary');
    console.log(`${this.description} destroyed! Exiting with ${this.destructors.length} listerenrs left.`);
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

    const makeConnection = e.target?.classList?.contains('anchor-point');
    const createChild = !makeConnection;


    const child = {
      id: guid(),   name: writable('New'), left:writable(get(pulline.x2)),  top: writable(get(pulline.y2)),
      outputs:[
        {id:guid(), name:'out', top:writable(0), left:writable(0)},
      ],
      inputs:[
        {id:guid(), name:'in',   top:writable(0), left:writable(0)},
        {id:guid(), name:'color', top:writable(0), left:writable(0)}
      ],
    };
    if(createChild) bus.set(['create', child]);

setTimeout(()=>{
  // without this the connecting line is not aware of position of node element, assumes it is 0,
  // line is drawn in the wron place, it flashes briefly, then node is positioned and it updates.

    if(createChild){
      if(this.type === 'output'){
        const connection = {
          id:guid(),
          source: this.node.id,
          destination: child.id,
          output: this.anchor.id,
          input: child.inputs[0].id,
          color: 'red',
        };
        bus.set(['connect', connection]);
      }else{
        const connection = {
          id:guid(),
          source: child.id,
          destination: this.node.id,
          input: this.anchor.id,
          output: child.outputs[0].id,
          color: 'red',
        };
        bus.set(['connect', connection]);
      }
    }else{

      const nodeId = e.target.dataset.node;
      const anchorId = e.target.dataset.anchor;

      if(this.node.id == nodeId){
        // cant do that
      }else{
        if(this.type === 'output'){
          const destination = nodeId;
          const input = anchorId;
          const connection = {
            id:guid(),
            source: this.node.id,
            destination,
            output: this.anchor.id,
            input,
            color: 'red',
          };
          bus.set(['connect', connection]);
        }else{
          const source = nodeId;
          const output = anchorId;
          const connection = {
            id:guid(),
            source,
            destination: this.node.id,
            input: this.anchor.id,
            output,
            color: 'red',
          };
          bus.set(['connect', connection]);
        }
      }
    }
},10)





    this.off('mousemove: dragging');
    this.off('mouseup: end dragging operation');
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
  console.log({options});
  const operation = new Pullable({element, ...options});
  return {
		destroy() {
			operation.destroy();
		}
	};
}
