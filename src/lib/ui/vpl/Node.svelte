<script>

  // import { browser } from '$app/environment';
  import { onMount,onDestroy,  hasContext,getContext,setContext } from 'svelte';
  import { v4 as guid } from 'uuid';

  import Value from '$lib/ui/Value.svelte';
  import {draggable} from '$lib/actions/draggable.js';
  import {pullable} from '$lib/actions/pullable.js';

  import { writable, get } from 'svelte/store';

  let unsubscribe = [];
  const system = getContext('system');

  export let translate;
  const {z} = translate;

  export let node;
  onMount(async () => {


    const dynamicName = '/library/debug/logger/index.js'; // avoids detection by svelte compiler
    const {default:programModule} = await import(dynamicName);
    // await programModule({in:'HELLO', out:'WORLD'})


  });
  onDestroy(() => {
    unsubscribe.map(o=>o())
  });

  const tests = [
    {id:guid(), name:'name',     type:'string',            data:{vertex:{kind:'string-editor'}, link:{kind:'string'}},                top:writable(0), left:writable(0)},
    {id:guid(), name:'input',    type:'array of objects',  data:{vertex:{kind:'array-editor', format:{name:''}}, link:{kind:'enum'}}, top:writable(0), left:writable(0)},
    {id:guid(), name:'output',   type:'array of objects',  data:{vertex:{kind:'array-editor', format:{name:''}}, link:{kind:'enum'}}, top:writable(0), left:writable(0)},
    {id:guid(), name:'function', type:'function call',     data:{vertex:{kind:'code-editor'}, link:{kind:'function'}},                top:writable(0), left:writable(0)},
  ];

  $: payload($z); // Update when scale changes
  let root = {}; // root element
  const { id, name, left, top, input, output } = node.writable; // auto-writables;

  // input.subscribe(value=>{
  //   console.log('INPUT CHANGEDDDDDDDDDD!!!', value);
  // });



  let registered = {}; // anchor registration

  async function remove(id){
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
    const observer = new MutationObserver(callback);
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
  <div bind:this={root} use:monitor={{update: payload}} class="card position-absolute shadow panzoom-exclude" use:draggable={{handle:'.card-header', left, top, translate}} style="left: {$left}px; top: {$top}px; width: 18rem; opacity: .75;">
    <div class="user-select-none card-header pe-1">
      {$name}
      <i on:click={()=>remove($id)} class="bi bi-x-circle float-end"></i>
    </div>
    {#if $output}
      {#each $output as anchor (anchor.id)}
        <div class="row g-0 ">
          <div class="col-11">
            <div class="card-body d-flex align-items-center justify-content-end">
              <h6 class="card-title">{anchor.name}</h6>
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
              <h5 class="card-title p-1">{anchor.name}</h5>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
{/if}
