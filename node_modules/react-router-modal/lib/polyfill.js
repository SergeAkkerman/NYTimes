'use strict';

if (typeof window !== 'undefined') {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (fn) {
      return setTimeout(fn, 0);
    };
  }
}