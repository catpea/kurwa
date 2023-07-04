// import { writable, get } from 'svelte/store';

import { zip, filter, delay, startWith, combineLatest,  Observable} from 'rxjs';
import { toObservable } from 'svelte-to-observable';

export default async function debug( node, options={} ){
  const subscriptions = [];
  const observables = {};



  for (const o of node.input) {
    // const observable = toObservable(o.data); // of(1).pipe(delay(1000), startWith(0)),
    // subscriptions.push({unsubscribe:o.data.subscribe(v=>{
    //   console.log(`INPUT ON ${node.id}>${o.id} emited ${v}`);
    // })});
    const observable = toObservable(o.data);// .pipe( filter(v=>v!==null) );
    observables[o.id] = observable;
  }





  const combined = combineLatest(  observables );

  const subscription = combined.subscribe(value => {

    console.log(`DEBUG NODE ${node.id} LATEST DATA:`, JSON.stringify(value), Object.keys(observables));
    const out = node.output.find(o=>o.id==='out');
    out.data.set(  value  );



  });

  subscriptions.push( subscription );

  const unsubscribe = ()=>{
    subscriptions.map(o=> o.unsubscribe() );
  };
  return unsubscribe;
}
