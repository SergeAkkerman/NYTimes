'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getAriaProps = function getAriaProps(props) {
  var ariaProps = {};
  var keys = Object.keys(props).filter(function (p) {
    return p.indexOf('aria-') === 0 || p === 'role';
  });
  keys.forEach(function (p) {
    ariaProps[p] = props[p];
  });

  return ariaProps;
};

exports.default = getAriaProps;
module.exports = exports['default'];