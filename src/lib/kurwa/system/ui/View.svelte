<script>
import {cloneDeep} from "lodash-es";
import JSON5 from "json5";

import { v4 as guid } from 'uuid';
import { onMount,onDestroy,  hasContext,getContext,setContext } from 'svelte';
import { writable, get } from 'svelte/store';

import Value from '$lib/ui/Value.svelte';
import Source from '$lib/ui/Source.svelte';
import Node from '$lib/ui/vpl/Node.svelte';
import Anchor from '$lib/ui/vpl/Anchor.svelte';
import {pulline} from '$lib/actions/pullable.js';
import {toolbox} from '$lib/actions/toolbox.js';
import panzoom from '$lib/kurwa/system/actions/panzoom.js';

let unsubscribe = [];
// let edgeSubscriptions = [];

const system = getContext('system');

export let location; // node

// Properties
const nodes = writable(); // children of location node;
const edges = writable(); // children of location node;

// z can be set via attribute
export let scale = 1;
const translate = {x:writable(0), y:writable(0), z:scale}
const {x,y,z} = translate;



onMount(async () => {
  console.warn('WARNING: View does not yet do z-order');
  // const view = await $location.view(); // .view returns writables.
  // nodes = view.nodes;
  // edges = view.edges;
  console.log('VIEW LOCATION: ', $location);

});

onDestroy(() => {
  // unsubscribe.map(o=>o())
  // edgeSubscriptions.map(o=>o())

});

// based on location, we must fetch nodes and edges with parent=location;
// apply them to nodes and edges arrays....

let node = {};

const workspaceId = guid();

const pullineActive = pulline.active;

async function createNode(seed){
  const options = {
    name: "My Node",
    input: JSON.stringify([ { id: "in", name: "Input", top: 0, left: 0 } ]),
    output: JSON.stringify([ { id: "out", name: "Output", top: 0, left: 0 } ]),
    edges: JSON.stringify([]),
  };
  const node = Object.assign({}, seed, options)
  await system.create($location.id, JSON.stringify(node))
}

async function destroyEdge({detail:{node, edge}}){
  console.log('destroyEdge', node, edge);
  $location.writables.edges.update(value=> value.filter(o=>o.id!==edge) )
}

</script>

<ol>
<li>redo pullline and other dep paths</li>
<li>eliminate the generic Node and use neat specialized nodes ColorNode, ConsoleNode, etc</li>
<li>make Anchor prettier, give it a menu</li>
<li>z-order</li>
<li>selection manager</li>
</ol>

<!-- {#if $nodes && $edges}
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
            <Anchor color={edge.color} node={$location.id} edge={edge.id} x1={edge.output.left} y1={edge.output.top} x2={edge.input.left} y2={edge.input.top} {translate} on:disconnect={destroyEdge}/>
          {/each}
        {/if}
      </svg>
      {#each $nodes as node (node.id)}
        <Node bind:node {translate}/>
      {/each}
  	</div>
  </div>
{/if} -->
