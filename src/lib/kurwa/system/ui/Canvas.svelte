<script>
  import {toolbox} from '$lib/actions/toolbox.js';

  export let translate = {};
  export let top = writable(0);
  export let left = writable(0);
  export let width = writable(1);
  export let height = writable(1);

  async function createNode(seed){
    const options = {
      name: "My Node",
      input: JSON.stringify([ { id: "in", name: "Input", top: 0, left: 0 } ]),
      output: JSON.stringify([ { id: "out", name: "Output", top: 0, left: 0 } ]),
      edges: JSON.stringify([]),
    };
    const node = Object.assign({}, seed, options)
    // await system.create($location.id, JSON.stringify(node))
  }

</script>

<svg use:toolbox={{translate, operation:createNode}} class="position-absolute" style="border: 10px solid gold; top:{$top}px; left:{$left}px; width:{$width}px; height:{$height}px;">
  <defs>
    <marker id="circle" markerWidth="16" markerHeight="16" refX="8" refY="8">
      <circle cx="8" cy="8" r="2" stroke="green" fill="#ff0000" />
    </marker>
  </defs>
  <slot></slot>
</svg>
