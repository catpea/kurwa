import Panzoom from '@panzoom/panzoom'

export default function panzoom(elem, options){

  // This example also showcases the canvas option
  // Pointer events anywhere in the parent move
  // the target.
  const panzoom = Panzoom(elem, {
    startScale: options.scale,
    canvas: true,
    handleStartEvent: () => {},
  })
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
  })
}
