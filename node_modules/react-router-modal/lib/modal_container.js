'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _modal_controller = require('./modal_controller');

var _modal_set_container = require('./modal_set_container');

var _modal_set_container2 = _interopRequireDefault(_modal_set_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Container for rendered modals.
 *
 * This should be included in your react app as one of the last elements before the closing body tag.
 * When modals are rendered, they live inside this container.
 * When no modals are shown, nothing is rendered into the DOM.
 *
 * @param {Props} props
 * @param {String} [props.modalClassName=react-router-modal__modal] class name to apply to modals
 * @param {String} [props.backdropClassName=react-router-modal__backdrop] class name to apply to modal backdrops
 * @param {String} [props.containerClassName=react-router-modal__container] class name to apply to the container itself
 * @param {String} [props.bodyModalClassName=react-router-modal__modal-open] class name to apply to the <body /> when any modals are shown
 * @param {Function} [props.onFirstModalMounted] handler invoked when first modal is shown
 * @param {Function} [props.onLastModalUnmounted] handler invoked when last modal is hidden
 * @param {boolean} [props.autoRestoreScrollPosition=true] Automatically restore the window scroll position when the last modal is unmounted. This is useful in cases where you have made the body position fixed on small screen widths, usually to work around mobaile browser scrolling behavior. Set this to false if you do not want this behavior.
 * @param {String} [props.modalInClassName=react-router-modal__modal--in] class name applied to modal immediately after it is shown to allow for css transitions
 * @param {String} [props.modalOutClassName=react-router-modal__modal--out] class name applied to modal before modal is hidden to allow for css transitions
 * @param {String} [props.backdropInClassName=react-router-modal__backdrop--in] class name applied to backdrop immediately after it is shown to allow for css transitions
 * @param {String} [props.backdropOutClassName=react-router-modal__backdrop--out] class name applied to backdrop before modal is hidden to allow for css transitions
 * @param {String} [props.modalWrapperClassName=react-router-modal__wrapper] class name applied to backdrop before modal is hidden to allow for css transitions
 * @param {String} [props.outDelay=0] delay, in milliseconds to wait when closing modal, to allow for css transitions to complete before ripping it out of the DOM
 *
 * @example <caption>Using default class names</caption>
 *
 * <ModalContainer />
 *
 * @example <caption>Overriding the default class names</caption>
 *
 * <ModalContainer
 *   bodyModalOpenClassName='modal-open'
 *   containerClassName='modal-container'
 *   backdropClassName='modal-backdrop'
 *   modalClassName='modal'
 * />
 *
 *
 * @example <caption>DOM structure</caption>
 * // Note that modals are made "modal" via CSS styles, and end up rendered like the following in the DOM (with two modals, for example):
 * <div className={containerClassName}>
 *   <div>
 *     <div className={backdropClassName} />
 *     <div className={modalClassName}>
 *       .. bottom-most modal contents ..
 *     </div>
 *   </div>
 *   <div>
 *     <div className={backdropClassName} />
 *     <div className={modalClassName}>
 *       .. top-most modal contents ..
 *     </div>
 *   </div>
 * </div>
 *
 */
var ModalContainer = function (_React$Component) {
  _inherits(ModalContainer, _React$Component);

  function ModalContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ModalContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModalContainer.__proto__ || Object.getPrototypeOf(ModalContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      scrollX: 0,
      scrollY: 0,
      setIds: []
    }, _this.onSetIds = function (setIds) {
      var _this$props = _this.props,
          onFirstModalMounted = _this$props.onFirstModalMounted,
          onLastModalUnmounted = _this$props.onLastModalUnmounted,
          autoRestoreScrollPosition = _this$props.autoRestoreScrollPosition;

      var nextState = { setIds: setIds };
      var anyModalsBefore = !!_this.state.setIds.length;
      var anyModalsAfter = !!setIds.length;

      var showingFirstModal = anyModalsAfter && !anyModalsBefore;
      var hidingLastModal = !anyModalsAfter && anyModalsBefore;
      var supportsScrollFix = typeof window !== 'undefined' && typeof window.scroll === 'function';
      var shouldAutoScroll = autoRestoreScrollPosition && supportsScrollFix;

      if (showingFirstModal) {
        if (shouldAutoScroll) {
          nextState.scrollX = window.scrollX;
          nextState.scrollY = window.scrollY;
        }
        _this.afterRender = onFirstModalMounted;
      } else if (hidingLastModal) {
        _this.afterRender = function () {
          if (shouldAutoScroll) {
            window.scroll(_this.state.scrollX, _this.state.scrollY);
          }

          if (onLastModalUnmounted) {
            onLastModalUnmounted();
          }
        };
      }

      _this.setState(nextState);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ModalContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _modal_controller.setModalSetIdsHandler)(this.onSetIds);
      (0, _modal_controller.setDefaultOutDelay)(this.props.outDelay || 0);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _modal_controller.clearModalSetIdsHandler)();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(next) {
      if (next.outDelay !== this.props.outDelay) {
        (0, _modal_controller.setDefaultOutDelay)(next.outDelay || 0);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          backdropClassName = _props.backdropClassName,
          backdropInClassName = _props.backdropInClassName,
          backdropOutClassName = _props.backdropOutClassName,
          containerClassName = _props.containerClassName,
          bodyModalOpenClassName = _props.bodyModalOpenClassName,
          modalClassName = _props.modalClassName,
          modalInClassName = _props.modalInClassName,
          modalOutClassName = _props.modalOutClassName,
          wrapperClassName = _props.wrapperClassName,
          outDelay = _props.outDelay;
      var setIds = this.state.setIds;


      if (typeof document !== 'undefined') {
        if (setIds.length === 0) {
          document.body && bodyModalOpenClassName && document.body.classList.remove(bodyModalOpenClassName);
        } else {
          document.body && bodyModalOpenClassName && document.body.classList.add(bodyModalOpenClassName);
        }
      }

      if (typeof window !== 'undefined' && typeof window.requestAnimationFrame !== 'undefined' && this.afterRender) {
        window.requestAnimationFrame(this.afterRender);
        this.afterRender = null;
      }

      return _react2.default.createElement(
        'div',
        null,
        setIds.map(function (id) {
          return _react2.default.createElement(_modal_set_container2.default, { key: id,
            setId: id,
            outDelay: outDelay,
            wrapperClassName: wrapperClassName,
            backdropClassName: backdropClassName,
            backdropInClassName: backdropInClassName,
            backdropOutClassName: backdropOutClassName,
            containerClassName: containerClassName,
            modalClassName: modalClassName,
            modalInClassName: modalInClassName,
            modalOutClassName: modalOutClassName
          });
        })
      );
    }
  }]);

  return ModalContainer;
}(_react2.default.Component);

ModalContainer.defaultProps = {
  autoRestoreScrollPosition: true,
  modalClassName: 'react-router-modal__modal',
  modalInClassName: 'react-router-modal__modal--in',
  modalOutClassName: 'react-router-modal__modal--out',
  backdropClassName: 'react-router-modal__backdrop',
  backdropInClassName: 'react-router-modal__backdrop--in',
  backdropOutClassName: 'react-router-modal__backdrop--out',
  containerClassName: 'react-router-modal__container',
  wrapperClassName: 'react-router-modal__wrapper',
  bodyModalOpenClassName: 'react-router-modal__modal-open'
};
exports.default = ModalContainer;
module.exports = exports['default'];