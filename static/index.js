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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {



var host = window.document.location.host.replace(/:.*/, '')
var client = new Colyseus.Client('ws://' + host + (location.port ? ':'+location.port : ''))

var chatRoom = client.join("chat")

chatRoom.onUpdate.addOnce(function(state) {
  console.log("initial room data:", state)
})

// new room state
chatRoom.onUpdate.add(function(state) {
  console.log(`state updated`, state)
})


chatRoom.onLeave.add(function() {
  console.log(client.id, "left", room.name)
})

// listen to patches coming from the server
chatRoom.listen("messages/:number", function(change) {
  var p = document.createElement("p")
  p.innerHTML = change.value
  document.getElementById("messages").appendChild(p)
})

chatRoom.listen("clients/:number", function(change) {
  var p = document.createElement("p")
  p.innerHTML = change.value
  document.getElementById("clients").appendChild(p)
})

chatRoom.listen(function(change) {
  console.log("patch:", change.path, change.operation, change.value)
})

// send data to room on submit
document.getElementById("form").onsubmit = function(e) {
  e.preventDefault()

  var input = document.getElementById("input")

  // send data to room
  chatRoom.send({ message: input.value })

  // clear input
  input.value = ""
}

/***/ })
/******/ ]);