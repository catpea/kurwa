<script>

import { v4 as guid } from 'uuid';
import Panzoom from '@panzoom/panzoom'
import { onMount,onDestroy,  hasContext,getContext,setContext } from 'svelte';
import { writable, get } from 'svelte/store';
import Value from '$lib/ui/Value.svelte';
import Source from '$lib/ui/Source.svelte';
import Node from '../components/Node.svelte';
import Anchor from '../components/Anchor.svelte';
import {pulline} from '../components/traits/pullable.js';

export let location;
export let scale = writable(1);

export let nodes;
export let edges;

// based on location, we must fetch nodes and edges with parent=location;
// apply them to nodes and edges arrays....


let node = {};

const debug = getContext('debug');

const workspaceId = guid();

const pullineActive = pulline.active;
const translate = {x:writable(0), y:writable(0), z:scale}
const {x,y,z} = translate;

function panzoom(elem, options){

  // This example also showcases the canvas option
  // Pointer events anywhere in the parent move
  // the target.
  const panzoom = Panzoom(elem, { startScale: options.scale, canvas: true })
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
    $scale = event.detail.scale;
  })

}

</script>

<div bind:this={node} class="panzoom-parent position-relative" style=" overflow: hidden; user-select: none; touch-action: none; cursor: move;">

{#if debug}
  <span class="position-absolute top-0 fw-light badge rounded-pill bg-dark" style="left: 1px;">
    scale={$scale}/{$z}
    offset={node.offsetLeft||'?'}x{node.offsetTop||'?'}
    nodes={nodes.length}
    edges={edges.length}
  </span>
{/if}

<svg class="position-absolute top-0 left-0 w-100 h-100"><defs><pattern id="graph-pattern-{workspaceId}" x={ $x*$z } y={ $y*$z } width="{64*$z}" height="{64*$z}" patternUnits="userSpaceOnUse"><circle class="background-dot " style="fill: var(--bs-primary-border-subtle);" r="{ 1 }" cx={32} cy={32}></circle></pattern></defs><rect width="100%" height="100%" fill="url(#graph-pattern-{workspaceId})"></rect></svg>

	<div use:panzoom={{scale: $scale}} class="w-100" style=" height: 480px; ">

    <div class="position-relative">

      <svg class="position-absolute" style="top: -1000px; left:-1000px;    width:  5000px; height: 5000px;">
      <defs>
        <marker id="circle" markerWidth="16" markerHeight="16" refX="8" refY="8">
          <circle cx="8" cy="8" r="2" stroke="green" fill="#ff0000" />
        </marker>
      </defs>
      <polyline
        fill="none"
        stroke="black"
        points="20,100 40,60 70,80 100,20"
        marker-mid="url(#circle)" />
        {#if $pullineActive}
          <Anchor color={writable("green")} x1={pulline.x1} y1={pulline.y1} x2={pulline.x2} y2={pulline.y2}  {translate} />
        {/if}
        {#each edges as edge (edge.id)}
          <Anchor color={edge.color} edge={edge.id} x1={edge.output.left} y1={edge.output.top} x2={edge.input.left} y2={edge.input.top} {translate} />
        {/each}
      </svg>

       {#each nodes as node (node.id)}
         <Node bind:node {translate}/>
       {/each}

	    </div>

	</div>
</div>
