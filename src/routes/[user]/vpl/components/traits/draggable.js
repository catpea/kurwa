import {first} from 'lodash-es';
import { map, merge, fromEvent, skipUntil, takeUntil, tap, distinctUntilChanged, switchMap } from 'rxjs';
import { writable, get } from 'svelte/store';

export function draggable(node, options){
  const handle = first( [...node.children].filter(el => el.matches(options.handle)) );
  const mouseUp$    = fromEvent(document, 'mouseup');
  const mouseMove$  = fromEvent(document, 'mousemove');
  const mouseDown$  = fromEvent(handle, 'mousedown');

  let previousX; // ew
  let previousY;

  const calculateCoordinates = moveEvent => {
    const scale = get(options.translate.z);
    const deltaX = (moveEvent.clientX - previousX)/scale; // INACURRATE
    const deltaY = (moveEvent.clientY - previousY)/scale; // INACURRATE
    const valueX = node.offsetLeft + deltaX;
    const valueY = node.offsetTop + deltaY;
    previousX = moveEvent.clientX;
    previousY = moveEvent.clientY;
    return { scale, valueX, valueY };
  }

  const mouseDragging$ = mouseDown$.pipe(
    tap(downEvent => {
      previousX = downEvent.clientX;
      previousY = downEvent.clientY;
    }),
    switchMap(downEvent => mouseMove$.pipe(
      map(calculateCoordinates),
      takeUntil(mouseUp$)
    ))
  );

  const subscription = mouseDragging$.subscribe(event => {
    console.log('mouseDragging$', event);
    options.left.set( event.valueX );
    options.top.set( event.valueY );
  });

  return {
  	destroy() {
      subscription.unsubscribe();
  	}
  };

}
