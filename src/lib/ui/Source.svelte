<script>
import {pretty} from '$lib/pretty.js';

export let language = 'javascript';
export let highlight = true;

export let value;
export let force = false;

let w;

$: html = value?htmlify(value):'';

function htmlify(str, options = {language , highlight}){
  // const str = JSON.stringify(value, null, '  ');
  let html = pretty( str, options );
  if(force) html = html.replace(/\\n/g,'<br>').replace(/\\t/g,'  ');
  return html;
}

</script>
<div class="card shadow" bind:clientWidth={w}>
  <pre class="px-2 mb-1" style="width: {w}px; overflow-x scroll;"><code>{@html html}</code></pre>
</div>
