export function isMobile(win: Window) {
    var result = false;
    if (win.PointerEvent && ('maxTouchPoints' in win.navigator)) {
      // if Pointer Events are supported, just check maxTouchPoints
      if (window.navigator.maxTouchPoints > 0) {
        result = true;
      }
    } else {
      // no Pointer Events...
      if (win.matchMedia && win.matchMedia("(any-pointer:coarse)").matches) {
        // check for any-pointer:coarse which mostly means touchscreen
        result = true;
      } else if (win.TouchEvent || ('ontouchstart' in win)) {
        // last resort - check for exposed touch events API / event handler
        result = true;
      }
    }
    return result;
  }