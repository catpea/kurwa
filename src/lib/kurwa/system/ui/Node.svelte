<script>

  import nodes from '$lib/nodes/index.js';

  import { onMount,onDestroy,  hasContext,getContext,setContext } from 'svelte';
  import { v4 as guid } from 'uuid';
  import { debounce } from 'lodash-es';

  import Writable from '$lib/ui/Writable.svelte';
  import Value from '$lib/ui/Value.svelte';
  import {draggable} from '$lib/kurwa/system/actions/draggable.js';
  import {pullable} from '$lib/kurwa/system/actions/pullable.js';

  import { writable, get } from 'svelte/store';

  let unsubscribe = [];
  const system = getContext('system');

  export let coverage;
  export let translate;
  const {z} = translate;

  export let node;

  onMount(async () => {

  });

  onDestroy(() => {
    unsubscribe.map(o=>o());
  });



  $: payload($z); // Update when scale changes

  let root = {}; // root element

  const { id, name, left, top, input, output } = node.writable; // auto-writables;

  // input.subscribe(value=>{
  //   console.log('INPUT CHANGEDDDDDDDDDD!!!', value);
  // });



  let registered = {}; // anchor registration

  async function removeNode(id){
    await system.remove(id);
  }

  function getAnchorPosition(anchorNode) {
    const cardNode = anchorNode.offsetParent;
    const halfAnchorPointHeight = ( anchorNode.getBoundingClientRect().height / $z /2);
    const halfAnchorPointWidth  = ( anchorNode.getBoundingClientRect().width / $z /2);
    let left = 0;
    let top = 0;
    left = ((cardNode.offsetLeft + anchorNode.offsetLeft)) + halfAnchorPointWidth;
    top =  ((cardNode.offsetTop  + anchorNode.offsetTop )) + halfAnchorPointHeight;
    return { top, left };
  }

  const payload = ()=>{ // when a change in node has occurred, visit all registered anchors, and get their position.
    for (const key in registered) {
      const {node:anchorNode, anchor} = registered[key];
      const position = getAnchorPosition( anchorNode );
      anchor.top.set(position.top);
      anchor.left.set(position.left);
    }
  };

  // Node's DOM Node Monitoring
  function monitor(node, {update}){
    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationList, observer) => update();
    const debounced = debounce(callback, 12);
    const observer = new MutationObserver(debounced);
    observer.observe(node, config);
    setTimeout(()=>payload(),1); // TIMING PROBLEM
    return {
  		destroy() {
        observer.disconnect();
  		}
  	};
  }

  // Registration Of All Anchors Inside This Node
  function register(node, anchor){
    registered[anchor.id] = {node, anchor};
    return {
  		destroy() {
        delete registered[anchor.id];
  		}
  	};
  }

</script>

{#if node}
  <div bind:this={root} use:monitor={{update: payload}} class="card position-absolute shadow panzoom-exclude" use:draggable={{handle:'.card-header', left, top, translate, coverage}} style="left: {$left}px; top: {$top}px; width: 18rem; opacity: .75;">
    <div class="user-select-none card-header pe-1">
      {$name}
      <i on:click={()=>removeNode($id)} class="bi bi-x-circle float-end"></i>
    </div>
    {#if $output}
      {#each $output as anchor (anchor.id)}
        <div class="row g-0 ">
          <div class="col-11">
            <div class="card-body">
              <h6 class="card-title">{anchor.name}</h6>
              <Writable value={anchor.data}/>
            </div>
          </div>
          <div class="col-1 d-flex align-items-center flex-row-reverse">
            <i data-node={node.id} data-anchor={anchor.id} class="anchor-point bi bi-arrow-right-circle-fill text-success fs-4" use:register={anchor} use:pullable={{type: 'output', data:{vertex:{}, link:{}}, node, anchor, translate, system}}></i>
          </div>
        </div>
      {/each}
    {/if}
    {#if $input}
      {#each $input as anchor (anchor.id)}
        <div class="row g-0">
          <div class="col-1">
            <i data-node={node.id} data-anchor={anchor.id} class="anchor-point bi bi-arrow-right-square-fill text-info fs-4" use:register={anchor} use:pullable={{type: 'input', data:{vertex:{}, link:{}}, node, anchor, translate, system}}></i>
          </div>
          <div class="col-11 m-0">
            <div class="card-body p-0">
              <h6 class="card-title">{anchor.name}</h6>
              <Writable value={anchor.data}/>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
{/if}
