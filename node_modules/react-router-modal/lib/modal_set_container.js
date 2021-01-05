'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _modal_with_backdrop = require('./modal_with_backdrop');

var _modal_with_backdrop2 = _interopRequireDefault(_modal_with_backdrop);

var _get_aria_props = require('./get_aria_props');

var _get_aria_props2 = _interopRequireDefault(_get_aria_props);

var _modal_controller = require('./modal_controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalSetContainer = function (_React$Component) {
  _inherits(ModalSetContainer, _React$Component);

  function ModalSetContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ModalSetContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModalSetContainer.__proto__ || Object.getPrototypeOf(ModalSetContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      modals: []
    }, _this.onModals = function (modals) {
      _this.setState({ modals: modals });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ModalSetContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _modal_controller.setModalSetHandler)(this.props.setId, this.onModals);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _modal_controller.clearModalSetHandler)(this.props.setId);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          backdropClassName = _props.backdropClassName,
          backdropInClassName = _props.backdropInClassName,
          backdropOutClassName = _props.backdropOutClassName,
          containerClassName = _props.containerClassName,
          modalClassName = _props.modalClassName,
          modalInClassName = _props.modalInClassName,
          modalOutClassName = _props.modalOutClassName,
          wrapperClassName = _props.wrapperClassName;
      var modals = this.state.modals;


      if (modals.length === 0) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: containerClassName },
        modals.map(function (m) {
          return _react2.default.createElement(_modal_with_backdrop2.default, _extends({
            key: m.id,
            children: m.info.children,
            backdropClassName: m.info.backdropClassName || backdropClassName,
            outDelay: typeof m.info.outDelay === 'undefined' ? _this2.props.outDelay : m.info.outDelay,
            backdropInClassName: m.info.backdropInClassName || backdropInClassName,
            backdropOutClassName: m.info.backdropOutClassName || backdropOutClassName,
            containerClassName: containerClassName,
            modalClassName: m.info.className || modalClassName,
            modalInClassName: m.info.inClassName || modalInClassName,
            modalOutClassName: m.info.outClassName || modalOutClassName,
            onBackdropClick: m.info.onBackdropClick,
            wrapperClassName: wrapperClassName,
            component: m.info.component,
            props: m.info.props || {},
            isOut: !!m.info.out,
            context: { setId: m.id }
          }, (0, _get_aria_props2.default)(m.info)));
        })
      );
    }
  }]);

  return ModalSetContainer;
}(_react2.default.Component);

exports.default = ModalSetContainer;
module.exports = exports['default'];