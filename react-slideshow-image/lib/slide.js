"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _tween = _interopRequireDefault(require("@tweenjs/tween.js"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

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

var Slideshow =
/*#__PURE__*/
function (_Component) {
  _inherits(Slideshow, _Component);

  function Slideshow(props) {
    var _this;

    _classCallCheck(this, Slideshow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slideshow).call(this, props));
    _this.state = {
      index: props.defaultIndex && props.defaultIndex < props.children.length ? props.defaultIndex : 0,
      dragging: false
    };
    _this.width = 0;
    _this.imageContainer = null;
    _this.wrapper = null;
    _this.timeout = null;
    _this.moveSlides = _this.moveSlides.bind(_assertThisInitialized(_this));
    _this.pauseSlides = _this.pauseSlides.bind(_assertThisInitialized(_this));
    _this.startSlides = _this.startSlides.bind(_assertThisInitialized(_this));
    _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_this));
    _this.initResizeObserver = _this.initResizeObserver.bind(_assertThisInitialized(_this));
    _this.reactSlideshowWrapper = (0, _react.createRef)();
    _this.goToSlide = _this.goToSlide.bind(_assertThisInitialized(_this));
    _this.tweenGroup = new _tween["default"].Group();
    _this.startSwipe = _this.startSwipe.bind(_assertThisInitialized(_this));
    _this.endSwipe = _this.endSwipe.bind(_assertThisInitialized(_this));
    _this.swipe = _this.swipe.bind(_assertThisInitialized(_this));
    _this.distanceSwiped = 0;
    return _this;
  }

  _createClass(Slideshow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setWidth();
      this.initResizeObserver();
      (0, _props.validatePropTypes)(this.props);

      var _getProps = (0, _props.getProps)(this.props),
          autoplay = _getProps.autoplay,
          duration = _getProps.duration;

      if (autoplay) {
        this.timeout = setTimeout(function () {
          return _this2.goNext();
        }, duration);
      }
    }
  }, {
    key: "initResizeObserver",
    value: function initResizeObserver() {
      var _this3 = this;

      this.resizeObserver = new _resizeObserverPolyfill["default"](function (entries) {
        if (!entries) return;

        _this3.handleResize();
      });
      this.resizeObserver.observe(this.reactSlideshowWrapper.current);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.willUnmount = true;
      clearTimeout(this.timeout);
      this.removeResizeObserver();
    }
  }, {
    key: "startSwipe",
    value: function startSwipe(e) {
      this.startingClientX = e.touches ? e.touches[0].pageX : e.clientX;
      this.setState({
        dragging: true
      });
      clearTimeout(this.timeout);
    }
  }, {
    key: "endSwipe",
    value: function endSwipe() {
      this.setState({
        dragging: false
      });

      if (Math.abs(this.distanceSwiped) / this.width > 0.2) {
        if (this.distanceSwiped < 0) {
          this.goNext();
        } else {
          this.goBack();
        }
      } else {
        if (Math.abs(this.distanceSwiped) > 0) {
          this.slideImages(this.state.index, 300);
        }
      }
    }
  }, {
    key: "swipe",
    value: function swipe(e) {
      var clientX = e.touches ? e.touches[0].pageX : e.clientX;

      if (this.state.dragging) {
        var translateValue = this.width * (this.state.index + 1);
        this.distanceSwiped = clientX - this.startingClientX;
        translateValue -= this.distanceSwiped;
        this.imageContainer.style.transform = "translate(-".concat(translateValue, "px)");
      }
    }
  }, {
    key: "removeResizeObserver",
    value: function removeResizeObserver() {
      if (this.resizeObserver && this.reactSlideshowWrapper && this.reactSlideshowWrapper.current) {
        this.resizeObserver.unobserve(this.reactSlideshowWrapper.current);
      }
    }
  }, {
    key: "setWidth",
    value: function setWidth() {
      // the .slice.call was needed to support ie11
      this.allImages = Array.prototype.slice.call(this.wrapper.querySelectorAll(".images-wrap > div"), 0);
      this.width = this.wrapper.clientWidth;
      var fullwidth = this.width * (this.props.children.length + 2);
      this.imageContainer.style.width = "".concat(fullwidth, "px");
      this.imageContainer.style.transform = "translate(-".concat(this.width * (this.state.index + 1), "px)");
      this.applySlideStyle();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      var _this4 = this;

      var _getProps2 = (0, _props.getProps)(this.props),
          autoplay = _getProps2.autoplay,
          duration = _getProps2.duration,
          children = _getProps2.children;

      if (autoplay !== props.autoplay) {
        if (autoplay) {
          this.timeout = setTimeout(function () {
            return _this4.goNext();
          }, duration);
        } else {
          clearTimeout(this.timeout);
        }
      }

      if (children.length != props.children.length) {
        this.setWidth();
      }
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      this.setWidth();
    }
  }, {
    key: "applySlideStyle",
    value: function applySlideStyle() {
      var _this5 = this;

      this.allImages.forEach(function (eachImage, index) {
        eachImage.style.width = "".concat(_this5.width, "px");
      });
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
      var _this6 = this;

      var _getProps3 = (0, _props.getProps)(this.props),
          pauseOnHover = _getProps3.pauseOnHover,
          autoplay = _getProps3.autoplay,
          duration = _getProps3.duration;

      if (this.state.dragging) {
        this.endSwipe();
      } else {
        if (pauseOnHover && autoplay) {
          this.timeout = setTimeout(function () {
            return _this6.goNext();
          }, duration);
        }
      }
    }
  }, {
    key: "moveSlides",
    value: function moveSlides(_ref) {
      var dataset = _ref.currentTarget.dataset;

      if (dataset.type === 'next') {
        this.goNext();
      } else {
        this.goBack();
      }
    }
  }, {
    key: "goToSlide",
    value: function goToSlide(_ref2) {
      var currentTarget = _ref2.currentTarget;
      this.goTo(parseInt(currentTarget.dataset.key));
    }
  }, {
    key: "goTo",
    value: function goTo(index) {
      this.slideImages(index);
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

      this.slideImages(index + 1);
    }
  }, {
    key: "goBack",
    value: function goBack() {
      var index = this.state.index;

      var _getProps5 = (0, _props.getProps)(this.props),
          infinite = _getProps5.infinite;

      if (!infinite && index === 0) {
        return;
      }

      this.slideImages(index - 1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _getProps6 = (0, _props.getProps)(this.props),
          children = _getProps6.children,
          indicators = _getProps6.indicators,
          arrows = _getProps6.arrows;

      var unhandledProps = (0, _helpers.getUnhandledProps)(_props.propTypes, this.props);
      var index = this.state.index;
      var style = {
        transform: "translate(-".concat((index + 1) * this.width, "px)")
      };
      return _react["default"].createElement("div", _extends({
        "aria-roledescription": "carousel"
      }, unhandledProps), _react["default"].createElement("div", {
        className: "react-slideshow-container",
        onMouseEnter: this.pauseSlides,
        onMouseOver: this.pauseSlides,
        onMouseLeave: this.startSlides,
        onMouseDown: this.startSwipe,
        onMouseUp: this.endSwipe,
        onMouseMove: this.swipe,
        onTouchStart: this.startSwipe,
        onTouchEnd: this.endSwipe,
        onTouchCancel: this.endSwipe,
        onTouchMove: this.swipe,
        ref: this.reactSlideshowWrapper
      }, arrows && (0, _helpers.showPreviousArrow)((0, _props.getProps)(this.props), this.state.index, this.moveSlides), _react["default"].createElement("div", {
        className: "react-slideshow-wrapper slide",
        ref: function ref(_ref4) {
          return _this7.wrapper = _ref4;
        }
      }, _react["default"].createElement("div", {
        className: "images-wrap",
        style: style,
        ref: function ref(_ref3) {
          return _this7.imageContainer = _ref3;
        }
      }, _react["default"].createElement("div", {
        "data-index": "-1",
        "aria-roledescription": "slide",
        "aria-hidden": "false"
      }, children[children.length - 1]), children.map(function (each, key) {
        return _react["default"].createElement("div", {
          "data-index": key,
          key: key,
          className: key === index ? 'active' : '',
          "aria-roledescription": "slide",
          "aria-hidden": key === index ? 'false' : 'true'
        }, each);
      }), _react["default"].createElement("div", {
        "data-index": "-1",
        "aria-roledescription": "slide",
        "aria-hidden": "false"
      }, children[0]))), arrows && (0, _helpers.showNextArrow)((0, _props.getProps)(this.props), this.state.index, this.moveSlides)), indicators && (0, _helpers.showIndicators)((0, _props.getProps)(this.props), this.state.index, this.goToSlide));
    }
  }, {
    key: "slideImages",
    value: function slideImages(index, animationDuration) {
      var _this8 = this;

      var _getProps7 = (0, _props.getProps)(this.props),
          children = _getProps7.children,
          transitionDuration = _getProps7.transitionDuration,
          autoplay = _getProps7.autoplay,
          infinite = _getProps7.infinite,
          duration = _getProps7.duration,
          onChange = _getProps7.onChange,
          easing = _getProps7.easing;

      transitionDuration = animationDuration || transitionDuration;
      var existingTweens = this.tweenGroup.getAll();

      if (!existingTweens.length) {
        clearTimeout(this.timeout);
        var value = {
          margin: -this.width * (this.state.index + 1) + this.distanceSwiped
        };
        var tween = new _tween["default"].Tween(value, this.tweenGroup).to({
          margin: -this.width * (index + 1)
        }, transitionDuration).onUpdate(function (value) {
          _this8.imageContainer.style.transform = "translate(".concat(value.margin, "px)");
        }).start();
        tween.easing((0, _helpers.getEasing)(easing));

        var animate = function animate() {
          if (_this8.willUnmount) {
            _this8.tweenGroup.removeAll();

            return;
          }

          requestAnimationFrame(animate);

          _this8.tweenGroup.update();
        };

        animate();
        tween.onComplete(function () {
          if (_this8.willUnmount) {
            return;
          }

          _this8.distanceSwiped = 0;
          var newIndex = index;

          if (newIndex < 0) {
            newIndex = children.length - 1;
          } else if (newIndex >= children.length) {
            newIndex = 0;
          }

          if (typeof onChange === 'function') {
            onChange(_this8.state.index, newIndex);
          }

          _this8.setState({
            index: newIndex
          }, function () {
            if (autoplay && (infinite || _this8.state.index < children.length)) {
              clearTimeout(_this8.timeout);
              _this8.timeout = setTimeout(function () {
                return _this8.goNext();
              }, duration);
            }
          });
        });
      }
    }
  }]);

  return Slideshow;
}(_react.Component);

var _default = Slideshow;
exports["default"] = _default;