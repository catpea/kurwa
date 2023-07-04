import { of, delay, startWith, combineLatest } from 'rxjs';
import { toObservable } from 'svelte-to-observable';

export default async function heartbeat( node ){
  const subscriptions = [];
  const observables = {};
  node.input.forEach(o=>{
    const observable = toObservable(o.data); // of(1).pipe(delay(1000), startWith(0)),
    observables[o.id] = observable;
  });

  // const combined = combineLatest(observables);
  // const subscription = combined.subscribe(value => console.log(value));
  // subscriptions.push( subscription );

  let counter = 0;
  const intervalId = setInterval(()=>{
    node.output.forEach( o=> o.data.set(counter++) );
    console.log('BEAT', counter);
  }, 5_000);


  const unsubscribe = ()=>{
    clearInterval(intervalId);
    subscriptions.map(o=> o.unsubscribe() );
  };
  return unsubscribe;
}
