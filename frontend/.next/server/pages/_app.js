"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wagmi/chains */ \"wagmi/chains\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var _config_settings_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../config/settings.json */ \"../config/settings.json\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([wagmi__WEBPACK_IMPORTED_MODULE_1__, wagmi_chains__WEBPACK_IMPORTED_MODULE_2__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__]);\n([wagmi__WEBPACK_IMPORTED_MODULE_1__, wagmi_chains__WEBPACK_IMPORTED_MODULE_2__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n // Base ağını kullanacağız\n\n// import '../styles/globals.css'; // Global CSS dosyası (Önceki adımda devre dışı bırakmıştık)\n\n// --- React Hooks import edildi ---\n\n// --- 1. Zincir ve Transport Tanımlaması ---\n// settings.json'daki targetChainId'ye göre ağı seç\n// Not: Wagmi'nin `baseSepolia` desteği olması lazım, import'a ekledim.\nconst targetChain = _config_settings_json__WEBPACK_IMPORTED_MODULE_4__.targetChainId === 8453 ? wagmi_chains__WEBPACK_IMPORTED_MODULE_2__.base : wagmi_chains__WEBPACK_IMPORTED_MODULE_2__.baseSepolia;\nconst config = (0,wagmi__WEBPACK_IMPORTED_MODULE_1__.createConfig)({\n    chains: [\n        targetChain,\n        wagmi_chains__WEBPACK_IMPORTED_MODULE_2__.mainnet\n    ],\n    transports: {\n        [targetChain.id]: (0,wagmi__WEBPACK_IMPORTED_MODULE_1__.http)(),\n        [wagmi_chains__WEBPACK_IMPORTED_MODULE_2__.mainnet.id]: (0,wagmi__WEBPACK_IMPORTED_MODULE_1__.http)()\n    }\n});\n// --- 2. React Query Client ---\nconst queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.QueryClient();\n// --- 3. Ana Uygulama Bileşeni ---\nfunction MyApp({ Component, pageProps }) {\n    // ----- HİDRASYON HATASI DÜZELTMESİ -----\n    const [isClient, setIsClient] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(()=>{\n        // Component mount olduğunda (yani sadece tarayıcıda)\n        // state'i true yap.\n        setIsClient(true);\n    }, []);\n    // ----- DÜZELTME SONU -----\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: isClient ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_1__.WagmiProvider, {\n            config: config,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.QueryClientProvider, {\n                client: queryClient,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\sukru.kucuk\\\\Desktop\\\\REP-X\\\\frontend\\\\pages\\\\_app.tsx\",\n                    lineNumber: 49,\n                    columnNumber: 13\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sukru.kucuk\\\\Desktop\\\\REP-X\\\\frontend\\\\pages\\\\_app.tsx\",\n                lineNumber: 48,\n                columnNumber: 11\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\sukru.kucuk\\\\Desktop\\\\REP-X\\\\frontend\\\\pages\\\\_app.tsx\",\n            lineNumber: 47,\n            columnNumber: 9\n        }, this) : null\n    }, void 0, false);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQzBEO0FBQ0EsQ0FBQywwQkFBMEI7QUFDWjtBQUN6RSwrRkFBK0Y7QUFDN0M7QUFFbEQsb0NBQW9DO0FBQ1E7QUFFNUMsNkNBQTZDO0FBQzdDLG1EQUFtRDtBQUNuRCx1RUFBdUU7QUFDdkUsTUFBTVcsY0FBY0gsZ0VBQXNCLEtBQUssT0FBT0osOENBQUlBLEdBQUdDLHFEQUFXQTtBQUV4RSxNQUFNUSxTQUFTWixtREFBWUEsQ0FBQztJQUMxQmEsUUFBUTtRQUFDSDtRQUFhUixpREFBT0E7S0FBQztJQUM5QlksWUFBWTtRQUNWLENBQUNKLFlBQVlLLEVBQUUsQ0FBQyxFQUFFZCwyQ0FBSUE7UUFDdEIsQ0FBQ0MsaURBQU9BLENBQUNhLEVBQUUsQ0FBQyxFQUFFZCwyQ0FBSUE7SUFDcEI7QUFDRjtBQUVBLGdDQUFnQztBQUNoQyxNQUFNZSxjQUFjLElBQUlYLDhEQUFXQTtBQUVuQyxtQ0FBbUM7QUFDbkMsU0FBU1ksTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUUvQywwQ0FBMEM7SUFDMUMsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdiLCtDQUFRQSxDQUFDO0lBRXpDQyxnREFBU0EsQ0FBQztRQUNSLHFEQUFxRDtRQUNyRCxvQkFBb0I7UUFDcEJZLFlBQVk7SUFDZCxHQUFHLEVBQUU7SUFDTCw0QkFBNEI7SUFFNUIscUJBQ0U7a0JBS0dELHlCQUNDLDhEQUFDckIsZ0RBQWFBO1lBQUNhLFFBQVFBO3NCQUNyQiw0RUFBQ04sc0VBQW1CQTtnQkFBQ2dCLFFBQVFOOzBCQUMzQiw0RUFBQ0U7b0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7O21CQUk1Qjs7QUFJUjtBQUVBLGlFQUFlRixLQUFLQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnO1xyXG5pbXBvcnQgeyBXYWdtaVByb3ZpZGVyLCBjcmVhdGVDb25maWcsIGh0dHAgfSBmcm9tICd3YWdtaSc7XHJcbmltcG9ydCB7IG1haW5uZXQsIGJhc2UsIGJhc2VTZXBvbGlhIH0gZnJvbSAnd2FnbWkvY2hhaW5zJzsgLy8gQmFzZSBhxJ/EsW7EsSBrdWxsYW5hY2HEn8SxelxyXG5pbXBvcnQgeyBRdWVyeUNsaWVudCwgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XHJcbi8vIGltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJzsgLy8gR2xvYmFsIENTUyBkb3N5YXPEsSAow5ZuY2VraSBhZMSxbWRhIGRldnJlIGTEscWfxLEgYsSxcmFrbcSxxZ90xLFrKVxyXG5pbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi4vLi4vY29uZmlnL3NldHRpbmdzLmpzb24nO1xyXG5cclxuLy8gLS0tIFJlYWN0IEhvb2tzIGltcG9ydCBlZGlsZGkgLS0tXHJcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcblxyXG4vLyAtLS0gMS4gWmluY2lyIHZlIFRyYW5zcG9ydCBUYW7EsW1sYW1hc8SxIC0tLVxyXG4vLyBzZXR0aW5ncy5qc29uJ2Rha2kgdGFyZ2V0Q2hhaW5JZCd5ZSBnw7ZyZSBhxJ/EsSBzZcOnXHJcbi8vIE5vdDogV2FnbWknbmluIGBiYXNlU2Vwb2xpYWAgZGVzdGXEn2kgb2xtYXPEsSBsYXrEsW0sIGltcG9ydCdhIGVrbGVkaW0uXHJcbmNvbnN0IHRhcmdldENoYWluID0gc2V0dGluZ3MudGFyZ2V0Q2hhaW5JZCA9PT0gODQ1MyA/IGJhc2UgOiBiYXNlU2Vwb2xpYTtcclxuXHJcbmNvbnN0IGNvbmZpZyA9IGNyZWF0ZUNvbmZpZyh7XHJcbiAgY2hhaW5zOiBbdGFyZ2V0Q2hhaW4sIG1haW5uZXRdLCAvLyBIZWRlZiBhxJ/EsW3EsXrEsSB2ZSBtYWlubmV0J2kgZWtsZXllbGltXHJcbiAgdHJhbnNwb3J0czoge1xyXG4gICAgW3RhcmdldENoYWluLmlkXTogaHR0cCgpLFxyXG4gICAgW21haW5uZXQuaWRdOiBodHRwKCksXHJcbiAgfSxcclxufSk7XHJcblxyXG4vLyAtLS0gMi4gUmVhY3QgUXVlcnkgQ2xpZW50IC0tLVxyXG5jb25zdCBxdWVyeUNsaWVudCA9IG5ldyBRdWVyeUNsaWVudCgpO1xyXG5cclxuLy8gLS0tIDMuIEFuYSBVeWd1bGFtYSBCaWxlxZ9lbmkgLS0tXHJcbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcclxuICBcclxuICAvLyAtLS0tLSBIxLBEUkFTWU9OIEhBVEFTSSBEw5xaRUxUTUVTxLAgLS0tLS1cclxuICBjb25zdCBbaXNDbGllbnQsIHNldElzQ2xpZW50XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIC8vIENvbXBvbmVudCBtb3VudCBvbGR1xJ91bmRhICh5YW5pIHNhZGVjZSB0YXJhecSxY8SxZGEpXHJcbiAgICAvLyBzdGF0ZSdpIHRydWUgeWFwLlxyXG4gICAgc2V0SXNDbGllbnQodHJ1ZSk7XHJcbiAgfSwgW10pO1xyXG4gIC8vIC0tLS0tIETDnFpFTFRNRSBTT05VIC0tLS0tXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7LyogVMO8bSBXYWdtaSB2ZSBRdWVyeSBzYcSfbGF5xLFjxLFsYXLEsW7EsSBTQURFQ0UgJ2lzQ2xpZW50JyB0cnVlIGlzZSAoeWFuaSB0YXJhecSxY8SxZGEpIHJlbmRlciBldC5cclxuICAgICAgICBTdW51Y3VkYSBudWxsIChib8WfKSByZW5kZXIgZXQuXHJcbiAgICAgICAgQnUsIHN1bnVjdSB2ZSB0YXJhecSxY8SxIGFyYXPEsW5kYWtpIEhUTUwgdXl1xZ9tYXpsxLHEn8SxbsSxIMOnw7Z6ZXIuXHJcbiAgICAgICovfVxyXG4gICAgICB7aXNDbGllbnQgPyAoXHJcbiAgICAgICAgPFdhZ21pUHJvdmlkZXIgY29uZmlnPXtjb25maWd9PlxyXG4gICAgICAgICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XHJcbiAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgICAgIDwvUXVlcnlDbGllbnRQcm92aWRlcj5cclxuICAgICAgICA8L1dhZ21pUHJvdmlkZXI+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgbnVsbCBcclxuICAgICAgKX1cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15QXBwOyJdLCJuYW1lcyI6WyJXYWdtaVByb3ZpZGVyIiwiY3JlYXRlQ29uZmlnIiwiaHR0cCIsIm1haW5uZXQiLCJiYXNlIiwiYmFzZVNlcG9saWEiLCJRdWVyeUNsaWVudCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJzZXR0aW5ncyIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidGFyZ2V0Q2hhaW4iLCJ0YXJnZXRDaGFpbklkIiwiY29uZmlnIiwiY2hhaW5zIiwidHJhbnNwb3J0cyIsImlkIiwicXVlcnlDbGllbnQiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImlzQ2xpZW50Iiwic2V0SXNDbGllbnQiLCJjbGllbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@tanstack/react-query":
/*!****************************************!*\
  !*** external "@tanstack/react-query" ***!
  \****************************************/
/***/ ((module) => {

module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

module.exports = import("wagmi");;

/***/ }),

/***/ "wagmi/chains":
/*!*******************************!*\
  !*** external "wagmi/chains" ***!
  \*******************************/
/***/ ((module) => {

module.exports = import("wagmi/chains");;

/***/ }),

/***/ "../config/settings.json":
/*!*******************************!*\
  !*** ../config/settings.json ***!
  \*******************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"targetChainId":84532,"baseFeeEth":"0.001","minScoreForVerification":70,"feeReceiver":"0x0a55983b15c4d75c5d65629326c0dc26a94f418a","oracleApiUrl":"http://localhost:3001","proofWeights":{"recoveryTransfer":40,"transactionConsistency":30,"walletAge":10,"protocolInteractions":20},"oldWalletInactivityPeriodHours":72,"recoveryTransferMaxTimeHours":48,"maxTransactionsToFetch":5000}');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();