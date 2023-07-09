



//   return {
//   			destroy() {
//   				operation.destroy()
//   			}
//   		};
//   // The current position of mouse
// let x = 0;
// let y = 0;
//
// // Query the element
// const ele = node
// // Handle the mousedown event
// // that's triggered when user drags the element
// const mouseDownHandler = function (e) {
//     // Get the current mouse position
//     x = e.clientX;
//     y = e.clientY;
//
//     // Attach the listeners to `document`
//     document.addEventListener('mousemove', mouseMoveHandler);
//     document.addEventListener('mouseup', mouseUpHandler);
// };
//
// const mouseMoveHandler = function (e) {
//     // How far the mouse has been moved
//     const dx = e.clientX - x;
//     const dy = e.clientY - y;
//
//     // Set the position of element
//     ele.style.top = `${ele.offsetTop + dy}px`;
//     ele.style.left = `${ele.offsetLeft + dx}px`;
//
//     // Reassign the position of mouse
//     x = e.clientX;
//     y = e.clientY;
// };
//
// const mouseUpHandler = function () {
//     // Remove the handlers of `mousemove` and `mouseup`
//     document.removeEventListener('mousemove', mouseMoveHandler);
//     document.removeEventListener('mouseup', mouseUpHandler);
// };
//
// ele.addEventListener('mousedown', mouseDownHandler);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // Select the node that will be observed for mutations
// const targetNode = node;
//
// // Options for the observer (which mutations to observe)
// const config = { attributes: true, childList: true, subtree: true };
//
// // Callback function to execute when mutations are observed
// const callback = (mutationList, observer) => {
//
//   for (const mutation of mutationList) {
//
//     if (mutation.type === "childList") {
//       //  //console.log("A child node has been added or removed.");
//     } else if (mutation.type === "attributes") {
//       //  //console.log(`The ${mutation.attributeName} attribute was modified.`, mutation);
//     }
//
//
//   }
// };
//
// // Create an observer instance linked to the callback function
// const observer = new MutationObserver(callback);
//
// // Start observing the target node for configured mutations
// observer.observe(targetNode, config);
//
// // Later, you can stop observing
// // observer.disconnect();
//
//
//
//
//
//




//
//
//
// function getOffset( el ) {
//     var _x = 0;
//     var _y = 0;
//     while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
//         _x += el.offsetLeft - el.scrollLeft;
//         _y += el.offsetTop - el.scrollTop;
//         el = el.offsetParent;
//     }
//     return { top: _y, left: _x };
// }
// var x = getOffset( document.getElementById('yourElId') ).left;
//












// }
