import { of, delay, startWith, combineLatest } from 'rxjs';
import { toObservable } from 'svelte-to-observable';

export default async function debug( node ){
  const subscriptions = [];
  const observables = {};
  node.input.forEach(o=>{
    const observable = toObservable(o.data); // of(1).pipe(delay(1000), startWith(0)),
    observables[o.id] = observable;
  });

  const combined = combineLatest(observables);
  const subscription = combined.subscribe(value => console.log(value));
  subscriptions.push( subscription );

  const unsubscribe = ()=>{
    subscriptions.map(o=> o.unsubscribe() );
  };
  return unsubscribe;
}
