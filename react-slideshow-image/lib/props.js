"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePropTypes = exports.propTypes = exports.getProps = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  defaultIndex: 0,
  infinite: true,
  autoplay: true,
  indicators: false,
  arrows: true,
  pauseOnHover: true,
  scale: 1,
  easing: 'linear'
};

var getProps = function getProps(componentProps) {
  return _objectSpread({}, defaultProps, {}, componentProps);
};

exports.getProps = getProps;
var propTypes = {
  duration: 'number',
  transitionDuration: 'number',
  defaultIndex: 'number',
  infinite: 'boolean',
  indicators: ['boolean', 'function'],
  autoplay: 'boolean',
  arrows: 'boolean',
  onChange: 'function',
  pauseOnHover: 'boolean',
  prevArrow: ['object', 'function'],
  nextArrow: ['object', 'function'],
  scale: 'number',
  easing: 'string'
};
exports.propTypes = propTypes;

var validatePropTypes = function validatePropTypes(props) {
  for (var key in props) {
    var propValueType = _typeof(props[key]);

    if (propTypes[key]) {
      if (Array.isArray(propTypes[key]) && !propTypes[key].includes(propValueType)) {
        console.warn("".concat(key, " must be of one of type ").concat(propTypes[key].join(', ')));
      } else if (!Array.isArray(propTypes[key]) && propValueType !== propTypes[key]) {
        console.warn("".concat(key, " must be of type ").concat(propTypes[key]));
      }
    }
  }
};

exports.validatePropTypes = validatePropTypes;