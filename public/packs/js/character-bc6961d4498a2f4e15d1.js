/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/character.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/character.js":
/*!*******************************************!*\
  !*** ./app/javascript/packs/character.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).on('turbolinks:load', function () {
  $('body').delegate('#add_account', 'click', function () {
    updatevalueWork();
    return true; // return false to cancel form action
  });
});

function updatevalueWork() {
  var listOption = $('.character-select');
  var result = $('.character-select').next().find('.select2-selection__choice__display');
  var field = $('.character-select').closest("div").find('.hidden-list-characters');
  if (result.length > 0) {
    for (var ind = 0; ind < result.length; ind++) {
      var elem = result[ind];
      var arrStrId = elem.id.split('-');
      if (ind == 0) {
        field.value = arrStrId[arrStrId.length - 1];
      } else {
        field.value = field.value + ',' + arrStrId[arrStrId.length - 1];
      }
    }
  } else {
    field.value = "";
  }
  $("#gi_account_list_character").val(field.value);
  var result_1 = $('.weapon-select').next().find('.select2-selection__choice__display');
  var field_1 = $('.weapon-select').closest("div").find('.hidden-list-weapons');
  if (result_1.length > 0) {
    for (var _ind = 0; _ind < result_1.length; _ind++) {
      var elem_1 = result_1[_ind];
      var arrStrId = elem_1.id.split('-');
      if (_ind == 0) {
        field.value = arrStrId[arrStrId.length - 1];
      } else {
        field.value = field_1.value + ',' + arrStrId[arrStrId.length - 1];
      }
    }
  } else {
    field_1.value = "";
  }
  $("#gi_account_list_weapon").val(field_1.value);
}
function loadSelected() {
  var listOption = document.querySelectorAll('.character-select');
  var element = listOption;
  var field = element.parentElement.querySelector('.hidden-list-characters');
  var values = field.value;
  if (values) {
    $.each(values.split(","), function (i, e) {
      element.querySelectorAll("option[value='" + e + "']").prop("selected", true);
    });
  }
}

/***/ })

/******/ });
//# sourceMappingURL=character-bc6961d4498a2f4e15d1.js.map