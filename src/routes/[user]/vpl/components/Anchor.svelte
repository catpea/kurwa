<script>
  import { onMount,onDestroy,  hasContext,getContext,setContext } from 'svelte';


  export let edge;
  export let color;
  export let x1;
  export let y1;
  export let x2;
  export let y2;

  export let translate;
  const {x,y,z} = translate;
  const test = 1000;

  $: ml = ((($x2+test)-($x1+test)) /2); // half the distance
  $: a1 = (($x1+test)+ml);
  $: b1 = (($y1+test));
  $: a2 = (($x2+test)-ml);
  $: b2 = (($y2+test));




  const bus = getContext('bus');

  function disconnect() {
    bus.set(['disconnect', edge]);
  }

</script>

<style>

.ants {
  fill: none;
  stroke: var(--stroke-color);

  stroke-width: 3px;

  stroke-dasharray: 4;
  animation: walk 1.5s linear infinite;
  will-change: stroke-dashoffset
}

@keyframes walk {
  0% {
    stroke-dashoffset: 16
  }
}

</style>

<!--
 Line Version
 <path on:click={disconnect} class="anchor-line ants panzoom-exclude" stroke-linecap="round" style="cursor: not-allowed; --stroke-color: {$color};" d="M {$x1+1000}, {$y1+1000} L {$x2+1000} {$y2+1000}"></path>
-->
<!-- <path on:click={disconnect} class="anchor-line ants panzoom-exclude"  marker-mid="url(#circle)" stroke-linecap="round" style="cursor: not-allowed; --stroke-color: {$color};" d="M {$x1+test}, {$y1+test} L {$x2+test} {$y2+test}"></path> -->

<!-- Curve -->
<path on:click={disconnect}   class="anchor-line ants panzoom-exclude" stroke-linecap="round" style=" cursor: not-allowed; --stroke-color: {$color};" d="M{$x1+test},{$y1+test} C{a1},{b1} {a2},{b2} {$x2+test},{$y2+test}"  marker-start="url(#circle)" marker-mid="url(#circle)"  marker-end="url(#circle)"></path>
