import {
  _onDrag,
  _onStop
} from "../_eltsReorder/plugin_js/module_eltsReorder.js"
export {
  _addEventHandlers
}
// ES6 MODULE IMPORT/EXPORT
////////////////////////////

function _addEventHandlers(thisInst) {

  var isTouch = (function is_touch_device() {
    return (('ontouchstart' in window) ||
      (navigator.MaxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  })();

  var isPointer = (window.PointerEvent);


   var targetOffsetY,
    targetOffsetX,
    newDx,
    newDy,
    thisInst = thisInst,
    transformPrefix = thisInst.transformPrefix,
    transitionPrefix = thisInst.transitionPrefix,
    transSupport = thisInst.transSupport,
    ul = thisInst.ul,
    elt,
    eStart = isTouch ? 'touchstart' : isPointer ? 'pointerdown' : 'mousedown',
    eMove = isTouch ? 'touchmove' : isPointer ? 'pointermove' : 'mousemove',
    eEnd = isTouch ? 'touchend' : isPointer ? 'pointerup' : 'mouseup',
    dontTouch = false,
    classDefine = thisInst.options.isVertical == true ? 'listItem' : 'listItem-horizontal',
    liSelector = thisInst.options.isVertical == true ? '.listItem' : '.listItem-horizontal',
    startX,
    startY,
    hasMoved;

//  ul.style.zIndex = '1'

  ul.addEventListener(eStart, pointerstart)

    function pointerstart (e) {


    if (e.target.localName == 'ul' || thisInst.props.locked == true || e.target.localName == 'button') return;
    elt = e.target
    if (e.target.localName == 'span' || e.target.localName == 'div' ) {  elt = e.target.offsetParent; }


   e.preventDefault();
    // if (e.type == 'touchstart' && e.touches.length > e.targetTouches.length) {
    //
    // }
    //  if all touches detected is greater than the touches detected on the same element - return
    //  Prevents selecting more than one element at the same time, but allows for multiple touch points(fingers) on the same element

    dontTouch = true;
    // flag to prevent multi
    //	e.stopPropagation();

    elt.nStart = elt.n
    elt.style[transitionPrefix] = '0s';
  //  elt.style.zIndex = 5;
    //move.addClass('dragging');
  //  elt.className = classDefine + ' dragging';

    elt.startDate = new Date();

    //console.log(elt instanceof jQuery)
    // if (thisInst.adjInst) {


    // }
    //will also prevent the adjacent ul from
    // responding to touch events



    //if (e.type == 'touchstart') { e = e.originalEvent.touches[0] }
    startX = e.pageX, startY = e.pageY;
    targetOffsetY = elt.offsetTop;
    targetOffsetX = elt.offsetLeft;

    ul.removeEventListener(eStart, pointerstart);
    window.addEventListener(eEnd, pointerupFunction); // refactor to add the once: true object to similar to jquery once. Wait for browser compatibility
    window.addEventListener(eMove, pointermoveFunction);



  };





  function pointermoveFunction(e) {
    //console.log(instanceArr.interrupt)
    if (e.type == 'touchmove' && e.touches.length > e.targetTouches.length || !dontTouch) {
    return
    }


  //  alert('hello')

    //  console.log('after interrupt')
    //if ($(move).offset().top <  div.offset().top ) {return;}   //containment
    e.preventDefault();
    hasMoved = true; // hasMoved is a flag to clicking items without moving them

    //if (e.type == 'touchmove') { e = e.originalEvent.changedTouches[0]}
    newDx = e.pageX - startX;
    newDy = e.pageY - startY;


      elt.style[transformPrefix] = 'translate3d(' + newDx + 'px, ' + newDy + 'px, 0px) translateZ(0)';

    //var eltsn = Array.prototype.indexOf.call(ul.children, elt)

    elt.props.currentPos.top = targetOffsetY + newDy;
    elt.props.currentPos.left = targetOffsetX + newDx;
    //	console.log('moving')

    _onDrag(elt, thisInst);

  };

  function pointerupFunction(e) {
    e.preventDefault();
      ul.addEventListener(eStart, pointerstart);

    if (hasMoved == true) {
      hasMoved = false;
      clearClass();
    //  if (transSupport) {
        elt.style[transformPrefix] = 'translateZ(0) translate3d(' + 0 + 'px, ' + 0 + 'px, 0px)';
      // } else {
      //   elt.style.top = targetOffsetY + movePos.dy + 'px';
      //   elt.style.left = targetOffsetX + movePos.dx + 'px';
      // }
      if (!elt) {
        return;
      }
      _onStop(elt, thisInst);
    } else { // if it hasn't moved
      clearClass();
    }

    function clearClass() {
      //elt.style[transitionPrefix] = 'box-shadow 250ms';
      // elt.style.zIndex = 1;
      // if (thisInst.adjInst) {
      //   thisInst.adjInst.ul.style.zIndex = '1'
      // };
      // ul.style.zIndex = '1';

    //  elt.className = classDefine;

      dontTouch = false;
    };
    window.removeEventListener(eMove, pointermoveFunction);
    window.removeEventListener(eEnd, pointerupFunction);

  }

};
