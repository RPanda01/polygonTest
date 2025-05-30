/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `body {\r\n  font-family: Arial, sans-serif;\r\n  margin: 20px;\r\n  padding: 0;\r\n  background-color: #f5f5f5;\r\n}\r\n\r\n.container {\r\n  max-width: 1200px;\r\n  margin: 0 auto;\r\n}\r\n\r\n.controls {\r\n  margin-bottom: 20px;\r\n  text-align: center;\r\n}\r\n\r\n.controls button {\r\n  margin: 0 10px;\r\n  padding: 10px 20px;\r\n  font-size: 16px;\r\n  border: none;\r\n  border-radius: 5px;\r\n  cursor: pointer;\r\n  transition: background-color 0.3s;\r\n}\r\n\r\n#createBtn {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\n\r\n#createBtn:hover {\r\n  background-color: #45a049;\r\n}\r\n\r\n#saveBtn {\r\n  background-color: #2196F3;\r\n  color: white;\r\n}\r\n\r\n#saveBtn:hover {\r\n  background-color: #1976D2;\r\n}\r\n\r\n#resetBtn {\r\n  background-color: #f44336;\r\n  color: white;\r\n}\r\n\r\n#resetBtn:hover {\r\n  background-color: #d32f2f;\r\n}\r\n\r\n.zones {\r\n  display: flex;\r\n  gap: 20px;\r\n  height: 400px;\r\n}\r\n\r\n.zone {\r\n  flex: 1;\r\n  border: 2px solid #ddd;\r\n  border-radius: 8px;\r\n  background: white;\r\n  overflow: hidden;\r\n  position: relative;\r\n}\r\n\r\n.zone-header {\r\n  background-color: #f8f9fa;\r\n  padding: 10px;\r\n  font-weight: bold;\r\n  border-bottom: 1px solid #ddd;\r\n}\r\n\r\n.zone-content {\r\n  height: calc(100% - 45px);\r\n  overflow: auto;\r\n  position: relative;\r\n}\r\n\r\n.buffer-zone .zone-header {\r\n  background-color: #e3f2fd;\r\n}\r\n\r\n.work-zone .zone-header {\r\n  background-color: #e8f5e8;\r\n}\r\n\r\n/* Старые стили для совместимости */\r\n.buffer, .work {\r\n  border: 1px solid #ccc;\r\n  margin: 10px 0;\r\n  height: 300px;\r\n  overflow: auto;\r\n  position: relative;\r\n}\r\n\r\nsvg {\r\n  width: 100%;\r\n  height: 100%;\r\n  min-height: 300px;\r\n  cursor: grab;\r\n}\r\n\r\nsvg:active {\r\n  cursor: grabbing;\r\n}\r\n\r\n.polygon {\r\n  cursor: move;\r\n  transition: opacity 0.2s;\r\n}\r\n\r\n.polygon:hover {\r\n  opacity: 0.8;\r\n}\r\n\r\n.drag-over {\r\n  background-color: #f0f8ff;\r\n  border-color: #4CAF50;\r\n}\r\n\r\n.instructions {\r\n  margin-top: 20px;\r\n  padding: 15px;\r\n  background-color: #fff3cd;\r\n  border: 1px solid #ffeaa7;\r\n  border-radius: 5px;\r\n}\r\n\r\n.instructions h3 {\r\n  margin-top: 0;\r\n  color: #856404;\r\n}\r\n\r\n.instructions ul {\r\n  margin-bottom: 0;\r\n  color: #856404;\r\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://testfigures/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://testfigures/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://testfigures/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://testfigures/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://testfigures/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://testfigures/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://testfigures/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://testfigures/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://testfigures/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/bufferZone.js":
/*!***************************!*\
  !*** ./src/bufferZone.js ***!
  \***************************/
/***/ (() => {

eval("// Полифилл для localStorage в случае его недоступности\r\nconst storage = {\r\n  data: {},\r\n  setItem(key, value) {\r\n    this.data[key] = value;\r\n  },\r\n  getItem(key) {\r\n    return this.data[key] || null;\r\n  },\r\n  removeItem(key) {\r\n    delete this.data[key];\r\n  }\r\n};\r\n\r\nconst safeStorage = typeof localStorage !== 'undefined' ? localStorage : storage;\r\n\r\nclass BufferZone extends HTMLElement {\r\n  constructor() {\r\n    super();\r\n    this.polygons = [];\r\n    this.innerHTML = `\r\n      <div class=\"zone-header\">Буферная зона</div>\r\n      <div class=\"zone-content\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 300\"></svg>\r\n      </div>\r\n    `;\r\n  }\r\n\r\n  connectedCallback() {\r\n    const saved = safeStorage.getItem('polygons');\r\n    if (saved) {\r\n      try {\r\n        this.renderPolygons(JSON.parse(saved));\r\n      } catch (e) {\r\n        console.warn('Не удалось загрузить сохраненные полигоны');\r\n      }\r\n    }\r\n  }\r\n\r\n  renderPolygons(polygons) {\r\n    this.polygons = polygons;\r\n    const svg = this.querySelector('svg');\r\n    svg.innerHTML = '';\r\n    \r\n    polygons.forEach((points, index) => {\r\n      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');\r\n      polygon.setAttribute('points', points);\r\n      polygon.setAttribute('fill', `hsl(${200 + index * 20}, 70%, 80%)`);\r\n      polygon.setAttribute('stroke', '#1976D2');\r\n      polygon.setAttribute('stroke-width', '2');\r\n      polygon.setAttribute('draggable', 'true');\r\n      polygon.classList.add('polygon');\r\n      \r\n      polygon.addEventListener('dragstart', (e) => {\r\n        e.dataTransfer.setData('text/plain', points);\r\n        e.dataTransfer.effectAllowed = 'copy';\r\n        polygon.style.opacity = '0.5';\r\n      });\r\n      \r\n      polygon.addEventListener('dragend', () => {\r\n        polygon.style.opacity = '1';\r\n      });\r\n      \r\n      svg.appendChild(polygon);\r\n    });\r\n  }\r\n\r\n  getPolygonsData() {\r\n    return this.polygons;\r\n  }\r\n}\r\n\r\ncustomElements.define('buffer-zone', BufferZone);\n\n//# sourceURL=webpack://testfigures/./src/bufferZone.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _bufferZone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bufferZone.js */ \"./src/bufferZone.js\");\n/* harmony import */ var _bufferZone_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_bufferZone_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _workZone_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workZone.js */ \"./src/workZone.js\");\n/* harmony import */ var _workZone_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_workZone_js__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\n// Полифилл для localStorage (тот же, что в bufferZone.js)\r\nconst storage = {\r\n  data: {},\r\n  setItem(key, value) {\r\n    this.data[key] = value;\r\n  },\r\n  getItem(key) {\r\n    return this.data[key] || null;\r\n  },\r\n  removeItem(key) {\r\n    delete this.data[key];\r\n  }\r\n};\r\n\r\nconst safeStorage = typeof localStorage !== 'undefined' ? localStorage : storage;\r\n\r\n// Генерация случайных полигонов (улучшенная версия)\r\nfunction generateRandomPolygons() {\r\n  const count = Math.floor(Math.random() * 12) + 4;\r\n  return Array.from({ length: count }, (_, index) => {\r\n    const centerX = 50 + Math.random() * 300;\r\n    const centerY = 50 + Math.random() * 200;\r\n    const radius = 20 + Math.random() * 40;\r\n    const sides = Math.floor(Math.random() * 5) + 3;\r\n    \r\n    const points = [];\r\n    for (let i = 0; i < sides; i++) {\r\n      const angle = (i / sides) * 2 * Math.PI;\r\n      const r = radius * (0.7 + Math.random() * 0.6);\r\n      const x = centerX + Math.cos(angle) * r;\r\n      const y = centerY + Math.sin(angle) * r;\r\n      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);\r\n    }\r\n    \r\n    return points.join(' ');\r\n  });\r\n}\r\n\r\n// Обработчики событий\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n  document.getElementById('createBtn').addEventListener('click', () => {\r\n    const polygons = generateRandomPolygons();\r\n    document.querySelector('buffer-zone').renderPolygons(polygons);\r\n  });\r\n\r\n  document.getElementById('saveBtn').addEventListener('click', () => {\r\n    try {\r\n      const data = document.querySelector('buffer-zone').getPolygonsData();\r\n      safeStorage.setItem('polygons', JSON.stringify(data));\r\n      alert('Полигоны сохранены успешно!');\r\n    } catch (e) {\r\n      alert('Ошибка при сохранении');\r\n    }\r\n  });\r\n\r\n  document.getElementById('resetBtn').addEventListener('click', () => {\r\n    if (confirm('Вы уверены, что хотите сбросить все сохраненные данные?')) {\r\n      safeStorage.removeItem('polygons');\r\n      document.querySelector('buffer-zone').renderPolygons([]);\r\n      alert('Данные сброшены!');\r\n    }\r\n  });\r\n});\n\n//# sourceURL=webpack://testfigures/./src/index.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://testfigures/./src/styles.css?");

/***/ }),

/***/ "./src/workZone.js":
/*!*************************!*\
  !*** ./src/workZone.js ***!
  \*************************/
/***/ (() => {

eval("class WorkZone extends HTMLElement {\r\n  constructor() {\r\n    super();\r\n    this.scale = 1;\r\n    this.panX = 0;\r\n    this.panY = 0;\r\n    this.innerHTML = `\r\n      <div class=\"zone-header\">Рабочая зона</div>\r\n      <div class=\"zone-content\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 300\"></svg>\r\n      </div>\r\n    `;\r\n  }\r\n\r\n  connectedCallback() {\r\n    const svg = this.querySelector('svg');\r\n    const zoneContent = this.querySelector('.zone-content');\r\n    \r\n    // Drag & Drop\r\n    zoneContent.addEventListener('dragover', (e) => {\r\n      e.preventDefault();\r\n      e.dataTransfer.dropEffect = 'copy';\r\n      zoneContent.classList.add('drag-over');\r\n    });\r\n    \r\n    zoneContent.addEventListener('dragleave', (e) => {\r\n      if (!zoneContent.contains(e.relatedTarget)) {\r\n        zoneContent.classList.remove('drag-over');\r\n      }\r\n    });\r\n    \r\n    zoneContent.addEventListener('drop', (e) => {\r\n      e.preventDefault();\r\n      zoneContent.classList.remove('drag-over');\r\n      \r\n      const points = e.dataTransfer.getData('text/plain');\r\n      if (points) {\r\n        this.addPolygon(points);\r\n      }\r\n    });\r\n\r\n    this.enableZoomAndPan(svg, zoneContent);\r\n  }\r\n\r\n  addPolygon(points) {\r\n    const svg = this.querySelector('svg');\r\n    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');\r\n    \r\n    polygon.setAttribute('points', points);\r\n    polygon.setAttribute('fill', 'rgba(76, 175, 80, 0.7)');\r\n    polygon.setAttribute('stroke', '#4CAF50');\r\n    polygon.setAttribute('stroke-width', '2');\r\n    polygon.classList.add('polygon');\r\n    \r\n    // Добавляем возможность удаления по двойному клику\r\n    polygon.addEventListener('dblclick', () => {\r\n      if (confirm('Удалить этот полигон?')) {\r\n        polygon.remove();\r\n      }\r\n    });\r\n    \r\n    svg.appendChild(polygon);\r\n  }\r\n\r\n  enableZoomAndPan(svg, container) {\r\n    let isDragging = false;\r\n    let lastX, lastY;\r\n\r\n    // Масштабирование\r\n    container.addEventListener('wheel', (e) => {\r\n      e.preventDefault();\r\n      \r\n      const delta = e.deltaY > 0 ? 0.9 : 1.1;\r\n      this.scale = Math.max(0.1, Math.min(5, this.scale * delta));\r\n      \r\n      this.updateTransform(svg);\r\n    });\r\n\r\n    // Панорамирование\r\n    container.addEventListener('mousedown', (e) => {\r\n      if (e.target === svg || e.target === container) {\r\n        isDragging = true;\r\n        lastX = e.clientX;\r\n        lastY = e.clientY;\r\n        container.style.cursor = 'grabbing';\r\n      }\r\n    });\r\n\r\n    document.addEventListener('mousemove', (e) => {\r\n      if (isDragging) {\r\n        const deltaX = e.clientX - lastX;\r\n        const deltaY = e.clientY - lastY;\r\n        \r\n        this.panX += deltaX / this.scale;\r\n        this.panY += deltaY / this.scale;\r\n        \r\n        this.updateTransform(svg);\r\n        \r\n        lastX = e.clientX;\r\n        lastY = e.clientY;\r\n      }\r\n    });\r\n\r\n    document.addEventListener('mouseup', () => {\r\n      if (isDragging) {\r\n        isDragging = false;\r\n        container.style.cursor = 'grab';\r\n      }\r\n    });\r\n  }\r\n\r\n  updateTransform(svg) {\r\n    svg.style.transform = `scale(${this.scale}) translate(${this.panX}px, ${this.panY}px)`;\r\n  }\r\n}\r\n\r\ncustomElements.define('work-zone', WorkZone);\n\n//# sourceURL=webpack://testfigures/./src/workZone.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;