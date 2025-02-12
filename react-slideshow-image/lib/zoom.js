"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _tween = _interopRequireDefault(require("@tweenjs/tween.js"));

var _props = require("./props");

var _helpers = require("./helpers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Zoom =
/*#__PURE__*/
function (_Component) {
  _inherits(Zoom, _Component);

  function Zoom(props) {
    var _this;

    _classCallCheck(this, Zoom);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Zoom).call(this, props));
    _this.state = {
      index: props.defaultIndex && props.defaultIndex < props.children.length ? props.defaultIndex : 0
    };
    _this.width = 0;
    _this.timeout = null;
    _this.divsContainer = null;
    _this.wrapper = null;
    _this.setWidth = _this.setWidth.bind(_assertThisInitialized(_this));
    _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_this));
    _this.navigate = _this.navigate.bind(_assertThisInitialized(_this));
    _this.preZoom = _this.preZoom.bind(_assertThisInitialized(_this));
    _this.pauseSlides = _this.pauseSlides.bind(_assertThisInitialized(_this));
    _this.startSlides = _this.startSlides.bind(_assertThisInitialized(_this));
    _this.tweenGroup = new _tween["default"].Group();
    _this.initResizeObserver = _this.initResizeObserver.bind(_assertThisInitialized(_this));
    _this.reactSlideshowWrapper = (0, _react.createRef)();
    return _this;
  }

  _createClass(Zoom, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setWidth();
      this.play();
      this.initResizeObserver();
      (0, _props.validatePropTypes)(this.props);
    }
  }, {
    key: "initResizeObserver",
    value: function initResizeObserver() {
      var _this2 = this;

      this.resizeObserver = new _resizeObserverPolyfill["default"](function (entries) {
        if (!entries) return;

        _this2.handleResize();
      });
      this.resizeObserver.observe(this.reactSlideshowWrapper.current);
    }
  }, {
    key: "play",
    value: function play() {
      var _this3 = this;

      var _getProps = (0, _props.getProps)(this.props),
          autoplay = _getProps.autoplay,
          children = _getProps.children,
          duration = _getProps.duration;

      var index = this.state.index;

      if (autoplay && children.length > 1) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          return _this3.zoomTo(index + 1);
        }, duration);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.willUnmount = true;
      clearTimeout(this.timeout);
      this.removeResizeObserver();
    }
  }, {
    key: "removeResizeObserver",
    value: function removeResizeObserver() {
      if (this.resizeObserver && this.reactSlideshowWrapper && this.reactSlideshowWrapper.current) {
        this.resizeObserver.unobserve(this.reactSlideshowWrapper.current);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      var _getProps2 = (0, _props.getProps)(this.props),
          autoplay = _getProps2.autoplay,
          children = _getProps2.children;

      if (autoplay !== props.autoplay) {
        if (autoplay) {
          this.play();
        } else {
          clearTimeout(this.timeout);
        }
      }

      if (children.length != props.children.length) {
        this.applyStyle();
        this.play();
      }
    }
  }, {
    key: "setWidth",
    value: function setWidth() {
      this.width = this.wrapper.clientWidth;
      this.applyStyle();
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      this.setWidth();
    }
  }, {
    key: "applyStyle",
    value: function applyStyle() {
      var fullwidth = this.width * this.props.children.length;
      this.divsContainer.style.width = "".concat(fullwidth, "px");

      for (var index = 0; index < this.divsContainer.children.length; index++) {
        var eachDiv = this.divsContainer.children[index];

        if (eachDiv) {
          eachDiv.style.width = "".concat(this.width, "px");
          eachDiv.style.left = "".concat(index * -this.width, "px");
        }
      }
    }
  }, {
    key: "pauseSlides",
    value: function pauseSlides() {
      if ((0, _props.getProps)(this.props).pauseOnHover) {
        clearTimeout(this.timeout);
      }
    }
  }, {
    key: "startSlides",
    value: function startSlides() {
      var _this4 = this;

      var _getProps3 = (0, _props.getProps)(this.props),
          pauseOnHover = _getProps3.pauseOnHover,
          autoplay = _getProps3.autoplay,
          duration = _getProps3.duration;

      if (pauseOnHover && autoplay) {
        this.timeout = setTimeout(function () {
          return _this4.goNext();
        }, duration);
      }
    }
  }, {
    key: "goNext",
    value: function goNext() {
      var index = this.state.index;

      var _getProps4 = (0, _props.getProps)(this.props),
          children = _getProps4.children,
          infinite = _getProps4.infinite;

      if (!infinite && index === children.length - 1) {
        return;
      }

      this.zoomTo((index + 1) % children.length);
    }
  }, {
    key: "goBack",
    value: function goBack() {
      var index = this.state.index;

      var _getProps5 = (0, _props.getProps)(this.props),
          children = _getProps5.children,
          infinite = _getProps5.infinite;

      if (!infinite && index === 0) {
        return;
      }

      this.zoomTo(index === 0 ? children.length - 1 : index - 1);
    }
  }, {
    key: "goTo",
    value: function goTo(index) {
      this.zoomTo(index);
    }
  }, {
    key: "navigate",
    value: function navigate(_ref) {
      var dataset = _ref.currentTarget.dataset;

      if (dataset.key != this.state.index) {
        this.goTo(parseInt(dataset.key));
      }
    }
  }, {
    key: "preZoom",
    value: function preZoom(_ref2) {
      var currentTarget = _ref2.currentTarget;

      if (currentTarget.dataset.type === 'prev') {
        this.goBack();
      } else {
        this.goNext();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _getProps6 = (0, _props.getProps)(this.props),
          indicators = _getProps6.indicators,
          arrows = _getProps6.arrows,
          children = _getProps6.children;

      var index = this.state.index;
      var unhandledProps = (0, _helpers.getUnhandledProps)(_props.propTypes, this.props);
      return _react["default"].createElement("div", _extends({
        "aria-roledescription": "carousel"
      }, unhandledProps), _react["default"].createElement("div", {
        className: "react-slideshow-container",
        onMouseEnter: this.pauseSlides,
        onMouseOver: this.pauseSlides,
        onMouseLeave: this.startSlides,
        ref: this.reactSlideshowWrapper
      }, arrows && (0, _helpers.showPreviousArrow)((0, _props.getProps)(this.props), this.state.index, this.preZoom), _react["default"].createElement("div", {
        className: "react-slideshow-zoom-wrapper",
        ref: function ref(_ref3) {
          return _this5.wrapper = _ref3;
        }
      }, _react["default"].createElement("div", {
        className: "zoom-wrapper",
        ref: function ref(wrap) {
          return _this5.divsContainer = wrap;
        }
      }, children.map(function (each, key) {
        return _react["default"].createElement("div", {
          style: {
            opacity: key === index ? '1' : '0',
            zIndex: key === index ? '1' : '0'
          },
          "data-index": key,
          key: key,
          "aria-roledescription": "slide",
          "aria-hidden": key === index ? 'false' : 'true'
        }, each);
      }))), arrows && (0, _helpers.showNextArrow)((0, _props.getProps)(this.props), this.state.index, this.preZoom)), indicators && (0, _helpers.showIndicators)((0, _props.getProps)(this.props), this.state.index, this.navigate));
    }
  }, {
    key: "zoomTo",
    value: function zoomTo(newIndex) {
      var _this6 = this;

      var index = this.state.index;

      var _getProps7 = (0, _props.getProps)(this.props),
          children = _getProps7.children,
          scale = _getProps7.scale,
          autoplay = _getProps7.autoplay,
          infinite = _getProps7.infinite,
          transitionDuration = _getProps7.transitionDuration,
          duration = _getProps7.duration,
          onChange = _getProps7.onChange,
          easing = _getProps7.easing;

      var existingTweens = this.tweenGroup.getAll();

      if (!existingTweens.length) {
        if (!this.divsContainer.children[newIndex]) {
          newIndex = 0;
        }

        clearTimeout(this.timeout);
        var value = {
          opacity: 0,
          scale: 1
        };

        var animate = function animate() {
          if (_this6.willUnmount) {
            _this6.tweenGroup.removeAll();

            return;
          }

          requestAnimationFrame(animate);

          _this6.tweenGroup.update();
        };

        animate();
        var tween = new _tween["default"].Tween(value, this.tweenGroup).to({
          opacity: 1,
          scale: scale
        }, transitionDuration).onUpdate(function (value) {
          _this6.divsContainer.children[newIndex].style.opacity = value.opacity;
          _this6.divsContainer.children[index].style.opacity = 1 - value.opacity;
          _this6.divsContainer.children[index].style.transform = "scale(".concat(value.scale, ")");
        }).start();
        tween.easing((0, _helpers.getEasing)(easing));
        tween.onComplete(function () {
          if (_this6.willUnmount) {
            return;
          }

          if (typeof onChange === 'function') {
            onChange(index, newIndex);
          }

          _this6.setState({
            index: newIndex
          }, function () {
            _this6.divsContainer.children[index].style.transform = "scale(1)";
          });

          if (autoplay && (infinite || newIndex < children.length - 1)) {
            clearTimeout(_this6.timeout);
            _this6.timeout = setTimeout(function () {
              _this6.zoomTo((newIndex + 1) % children.length);
            }, duration);
          }
        });
      }
    }
  }]);

  return Zoom;
}(_react.Component);

var _default = Zoom;
exports["default"] = _default;