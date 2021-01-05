'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-line no-unused-vars


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _modal_route = require('./modal_route');

var _modal_route2 = _interopRequireDefault(_modal_route);

var _get_aria_props = require('./get_aria_props');

var _get_aria_props2 = _interopRequireDefault(_get_aria_props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Link and ModalRoute in one convenient component
* Renders a link that, when clicked, will navigate to the route that shows the modal.
*
* @param {Object} props
* @param {String} props.path path to match
* @param {Boolean} props.exact If set, only show modal if route exactly matches path.
* @param {String} props.parentPath path to navigate to when backdrop is clicked
*
* @param {String} props.linkClassName class name to apply to <Link />
* @param {String} props.modalClassName class name to apply to modal container
* @param {Children} props.children Link contents. Note that Modal content must be specified by the component property.
* @param {ReactComponent} props.component Component to render in the modal.
* @param {Object} props.props Props to be passed to the react component specified by the component property.
*
*
* @example <caption>Example ModalLink</caption>
*
* <ModalLink path='/hello' component={HelloComponent}>
*   Say Hello
* </ModalLink>
*/
function ModalLink(props) {
  var exact = props.exact,
      path = props.path,
      children = props.children,
      component = props.component,
      linkClassName = props.linkClassName,
      match = props.match,
      parentPath = props.parentPath,
      modalClassName = props.modalClassName;


  return _react2.default.createElement(
    _reactRouterDom.Link,
    { to: path, className: linkClassName },
    children,
    _react2.default.createElement(_modal_route2.default, _extends({
      exact: exact,
      path: path,
      props: props.props,
      component: component,
      className: modalClassName,
      parentPath: parentPath || match.url
    }, (0, _get_aria_props2.default)(props)))
  );
}

exports.default = (0, _reactRouterDom.withRouter)(ModalLink);
module.exports = exports['default'];