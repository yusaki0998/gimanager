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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/format_datatable.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/format_datatable.js":
/*!**************************************************!*\
  !*** ./app/javascript/packs/format_datatable.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var table;
$(document).on('turbolinks:load', function () {
  formatDataTable();
});
window.formatDataTable = function inItDatatable() {
  $('.dataTables_length').parent().parent().remove();
  $('.dataTables_paginate').parent().remove();
  $('.dataTables_info').parent().remove();
  formatTableUser();
  formatTableDepartment();
};
function formatTableUser() {
  var tblUser = document.getElementsByClassName("tbl_user");
  if (tblUser.length > 0) {
    tblUser = window.$('.tbl_user').DataTable({
      'stateSave': false,
      "processing": false,
      "serverSide": false,
      'destroy': true,
      'columnDefs': [{
        'targets': 0,
        'width': "4%",
        'checkboxes': {
          'selectRow': true
        }
      }, {
        "width": "6%",
        "targets": 1
      }, {
        "width": "9%",
        "targets": 2
      }, {
        "width": "9%",
        "targets": 3
      }, {
        "width": "10%",
        "targets": 4
      }, {
        "width": "20%",
        "targets": 5
      }, {
        "width": "10%",
        "targets": 6
      }, {
        "width": "9%",
        "targets": 7
      }, {
        "width": "8.5%",
        "targets": 8
      }, {
        "width": "6%",
        "targets": 9
      }, {
        "width": "9%",
        "targets": 10
      }],
      'select': {
        'style': 'multi'
      },
      'order': [1, 'asc'],
      drawCallback: function drawCallback() {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
      },
      language: {
        paginate: {
          previous: "<i class='mdi mdi-chevron-left'>",
          next: "<i class='mdi mdi-chevron-right'>"
        }
      }
    });
  }
}
function formatTableDepartment() {
  var tbl_depart = document.getElementsByClassName("tbl_depart");
  if (tbl_depart.length > 0) {
    tbl_depart = window.$('.tbl_depart').DataTable({
      'stateSave': false,
      'destroy': true,
      "lengthMenu": [5, 10, 15, 20],
      'columnDefs': [{
        'targets': 0,
        'width': "4%",
        'checkboxes': {
          'selectRow': true
        }
      }, {
        "width": "6%",
        "targets": 1
      }, {
        "width": "30%",
        "targets": 2
      }],
      'select': {
        'style': 'multi'
      },
      'order': [1, 'asc'],
      drawCallback: function drawCallback() {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
      },
      language: {
        paginate: {
          previous: "<i class='mdi mdi-chevron-left'>",
          next: "<i class='mdi mdi-chevron-right'>"
        }
      }
    });
  }
  ;
  $("#btn_edit_department").click(function () {
    var mydata = [],
      id;
    $.each(tbl_depart.rows({
      'search': 'applied'
    }).nodes(), function (i, row) {
      var checkBox = $(row).find("input[type='checkbox']:checked").is(":checked");
      if (checkBox) {
        id = row.querySelector('.col_checkbox').getAttribute('data-item');
        mydata.push(id);
        return;
      }
    });
    if (mydata.length != 1) {
      return;
    }
    $.ajax({
      type: 'GET',
      url: "update_department",
      dataType: 'script',
      data: {
        id: mydata[0]
      },
      success: function success(data, textStatus, jqXHR) {},
      error: function error(jqXHR, textStatus, errorThrown) {
        console.log("AJAX Error: #{textStatus}");
      }
    });
  });
  $("#btn_delete_department").click(function () {
    var mydata = [],
      id;
    $.each(tbl_depart.rows({
      'search': 'applied'
    }).nodes(), function (i, row) {
      var checkBox = $(row).find("input[type='checkbox']:checked").is(":checked");
      if (checkBox) {
        id = row.querySelector('.col_checkbox').getAttribute('data-item');
        mydata.push(id);
      }
    });
    if (mydata.length == 0) {
      return;
    }
    $.ajax({
      type: 'GET',
      url: "delete_department",
      dataType: 'script',
      data: {
        data: {
          ids: mydata
        }
      },
      success: function success(data, textStatus, jqXHR) {
        console.log("AJAX OK!");
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        console.log("AJAX Error: #{textStatus}");
      }
    });
  });
  $('a[href="#profile"]').on('click', function (event) {
    formatTablePosition();
  });
}
window.formatTablePosition = function () {
  var tbl_position = document.getElementsByClassName("tbl_position");
  if (tbl_position.length > 0) {
    tbl_position = window.$('.tbl_position').DataTable({
      'stateSave': false,
      'destroy': true,
      "lengthMenu": [5, 10, 15, 20],
      'columnDefs': [{
        'targets': 0,
        'width': "4%",
        'checkboxes': {
          'selectRow': true
        }
      }, {
        "width": "6%",
        "targets": 1
      }, {
        "width": "30%",
        "targets": 2
      }],
      'select': {
        'style': 'multi'
      },
      'order': [1, 'asc'],
      drawCallback: function drawCallback() {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
      },
      language: {
        paginate: {
          previous: "<i class='mdi mdi-chevron-left'>",
          next: "<i class='mdi mdi-chevron-right'>"
        }
      }
    });
  }
  ;
  $("#btnEditPosition").click(function () {
    var mydata = [],
      id;
    $.each(tbl_position.rows({
      'search': 'applied'
    }).nodes(), function (i, row) {
      var checkBox = $(row).find("input[type='checkbox']:checked").is(":checked");
      if (checkBox) {
        id = row.querySelector('.col_checkbox').getAttribute('data-item');
        mydata.push(id);
        return;
      }
    });
    if (mydata.length != 1) {
      return;
    }
    $.ajax({
      type: 'GET',
      url: "update_position",
      dataType: 'script',
      data: {
        id: mydata[0]
      },
      success: function success(data, textStatus, jqXHR) {},
      error: function error(jqXHR, textStatus, errorThrown) {
        console.log("AJAX Error: #{textStatus}");
      }
    });
  });
  $("#btnDeletePosition").click(function () {
    var mydata = [],
      id;
    $.each(tbl_position.rows({
      'search': 'applied'
    }).nodes(), function (i, row) {
      var checkBox = $(row).find("input[type='checkbox']:checked").is(":checked");
      if (checkBox) {
        id = row.querySelector('.col_checkbox').getAttribute('data-item');
        mydata.push(id);
      }
    });
    if (mydata.length == 0) {
      return;
    }
    $.ajax({
      type: 'GET',
      url: "delete_positions",
      dataType: 'script',
      data: {
        data: {
          ids: mydata
        }
      },
      success: function success(data, textStatus, jqXHR) {
        console.log("AJAX OK!");
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        console.log("AJAX Error: #{textStatus}");
      }
    });
  });
};

/***/ })

/******/ });
//# sourceMappingURL=format_datatable-24137b8eb7b13d5cc79c.js.map