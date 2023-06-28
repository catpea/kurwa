<script>
import {cloneDeep} from "lodash-es";
import JSON5 from "json5";

import { v4 as guid } from 'uuid';
import Panzoom from '@panzoom/panzoom'
import { onMount,onDestroy,  hasContext,getContext,setContext } from 'svelte';
import { writable, get } from 'svelte/store';

import Value from '$lib/ui/Value.svelte';
import Source from '$lib/ui/Source.svelte';
import Node from '$lib/ui/vpl/Node.svelte';
import Anchor from '$lib/ui/vpl/Anchor.svelte';
import {pulline} from '$lib/actions/pullable.js';
import {toolbox} from '$lib/actions/toolbox.js';

let unsubscribe = [];

const system = getContext('system');

export let location;

// z can be set via attribute
export let z;
const translate = {x:writable(0), y:writable(0), z}
const {x,y} = translate;

// NOTE: this only loads nodes and edges, the anchors are done within the node.
let parent = {};
let nodes = [];
let edges;

onMount(() => {

  // WARNING: View does not yet do z-order
  console.log('WARNING: View does not yet do z-order');


  unsubscribe.push(location.subscribe(async value=>{
    console.info('FINISH ME: Assemble Nodes In Here...! Or is this too much info, they can be assembeled inside api too');
    parent = await system.node($location);
    nodes = await system.list($location);
    edges = parent.writable.edges; // All the edges are stored in the parent.
    console.log('EDGES', $edges);
  }))

  unsubscribe.push(system.records.subscribe(async value=>{
    console.warn('system.records.subscribe un-throttled operation!');
    parent = Object.values(value).find(o=>o.id==$location);
    edges = parent.writable.edges; // All the edges are stored in the parent.
    nodes = Object.values(value).filter(o=>o.parent==$location)
  }))

  unsubscribe.push(parent.writable.edges.subscribe(async value=>{
    edges = parent.writable.edges; // All the edges are stored in the parent.
  }))


  // unsubscribe.push(system.records.subscribe(async value=>{
  //   console.info('FINISH ME: Assemble Nodes In Here...! Or is this too much info, they can be assembeled inside api too');
  //   parent = await system.node($location);
  //   nodes = await system.list($location);
  //   edges = parent.writable.edges; // All the edges are stored in the parent.
  //   console.log('EDGES', $edges);
  // }))

  // this.records.subscribe(records=>console.log('Records have changed', records))

});
onDestroy(() => {
  unsubscribe.map(o=>o())
});


// based on location, we must fetch nodes and edges with parent=location;
// apply them to nodes and edges arrays....


let node = {};

const debug = getContext('debug');

const workspaceId = guid();

const pullineActive = pulline.active;



function panzoom(elem, options){

  // This example also showcases the canvas option
  // Pointer events anywhere in the parent move
  // the target.
  const panzoom = Panzoom(elem, {
    startScale: options.scale,
    canvas: true,
    handleStartEvent: () => {},
  })
  const parent = elem.parentElement
  // No function bind needed
  parent.addEventListener('wheel', panzoom.zoomWithWheel)

  // // This demo binds to shift + wheel
  // parent.addEventListener('wheel', function(event) {
  //   if (!event.shiftKey) return
  //   panzoom.zoomWithWheel(event)
  // })

  elem.addEventListener('panzoomchange', (event) => {
    translate.x.set(event.detail.x);
    translate.y.set(event.detail.y);
    translate.z.set(event.detail.scale);
  })
}


async function createNode(seed){
  const options = {
    name: "My Node",
    input: JSON.stringify([ { id: "in", name: "Input", top: 0, left: 0 } ]),
    output: JSON.stringify([ { id: "out", name: "Output", top: 0, left: 0 } ]),
    edges: JSON.stringify([]),
  };
  const node = Object.assign({}, seed, options)
  await system.create($location, JSON.stringify(node))
}

async function destroyEdge({detail:{node, edge}}){
  console.log('destroyEdge', node, edge);

  parent.writables.edges.update(value=> value.filter(o=>o.id!==edge) )
}

</script>



{#if $location}
  <div bind:this={node} class="panzoom-parent position-relative" style=" overflow: hidden; user-select: none; touch-action: none; cursor: move;">

    <span class="position-absolute fw-light badge rounded bg-dark" style="left: 3px; top: 3px;">
      scale={$z.toFixed(2)}
    </span>

    <svg class="position-absolute top-0 left-0 w-100 h-100" style="pointer-events: none;"><defs><pattern id="graph-pattern-{workspaceId}" x={ $x*$z } y={ $y*$z } width="{64*$z}" height="{64*$z}" patternUnits="userSpaceOnUse"><circle class="background-dot " style="fill: var(--bs-primary-border-subtle);" r="{ 1 }" cx={32} cy={32}></circle></pattern></defs><rect width="100%" height="100%" fill="url(#graph-pattern-{workspaceId})"></rect></svg>
  	<div use:panzoom={{scale: $z}}   style="height: 480px; ">



        <svg use:toolbox={{translate, operation:createNode}} class="position-absolute" style="top: -1000px; left:-1000px; width:  5000px; height: 5000px;">
        <defs>
          <marker id="circle" markerWidth="16" markerHeight="16" refX="8" refY="8">
            <circle cx="8" cy="8" r="2" stroke="green" fill="#ff0000" />
          </marker>
        </defs>
        <polyline fill="none" stroke="black" points="20,100 40,60 70,80 100,20" marker-mid="url(#circle)" />
          {#if $pullineActive}
            <Anchor color={writable("green")} x1={pulline.x1} y1={pulline.y1} x2={pulline.x2} y2={pulline.y2}  {translate} />
          {/if}
          {#if $edges}
            {#each $edges as edge (edge.id)}
              <Anchor color={edge.color} node={$location} edge={edge.id} x1={edge.output.left} y1={edge.output.top} x2={edge.input.left} y2={edge.input.top} {translate} on:disconnect={destroyEdge}/>
            {/each}
          {/if}
        </svg>


        {#each nodes as node (node.id)}
          <Node bind:node {translate}/>
        {/each}

  	</div>
  </div>
{/if}
