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

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wagmi/chains */ \"wagmi/chains\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([wagmi__WEBPACK_IMPORTED_MODULE_1__, wagmi_chains__WEBPACK_IMPORTED_MODULE_2__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__]);\n([wagmi__WEBPACK_IMPORTED_MODULE_1__, wagmi_chains__WEBPACK_IMPORTED_MODULE_2__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n// frontend/pages/_app.tsx\n\n\n // Base ağını kullanacağız\n\n// --- 1. Zincir ve Transport Tanımlaması ---\n// Konfigürasyon dosyasından Base ağını hedef alıyoruz\nconst TARGET_CHAIN = wagmi_chains__WEBPACK_IMPORTED_MODULE_2__.base; // Başlangıç olarak Base (8453) ağını kullanıyoruz\nconst config = (0,wagmi__WEBPACK_IMPORTED_MODULE_1__.createConfig)({\n    chains: [\n        wagmi_chains__WEBPACK_IMPORTED_MODULE_2__.mainnet,\n        TARGET_CHAIN\n    ],\n    transports: {\n        // Tüm etkileşimleri RPC ile yönlendir\n        [wagmi_chains__WEBPACK_IMPORTED_MODULE_2__.mainnet.id]: (0,wagmi__WEBPACK_IMPORTED_MODULE_1__.http)(),\n        [TARGET_CHAIN.id]: (0,wagmi__WEBPACK_IMPORTED_MODULE_1__.http)()\n    },\n    // Cüzdan bağlayıcıları (MetaMask, WalletConnect vb.)\n    connectors: []\n});\n// --- 2. Query Client Tanımlaması ---\n// Veri önbellekleme ve sorgulama için kullanılır\nconst queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.QueryClient();\nfunction App({ Component, pageProps }) {\n    return(// QueryClientProvider, veri önbellekleme ve durum yönetimini sağlar\n    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.QueryClientProvider, {\n        client: queryClient,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_1__.WagmiProvider, {\n            config: config,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sukru.kucuk\\\\Desktop\\\\REP-X\\\\frontend\\\\pages\\\\_app.tsx\",\n                lineNumber: 40,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\sukru.kucuk\\\\Desktop\\\\REP-X\\\\frontend\\\\pages\\\\_app.tsx\",\n            lineNumber: 38,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\sukru.kucuk\\\\Desktop\\\\REP-X\\\\frontend\\\\pages\\\\_app.tsx\",\n        lineNumber: 35,\n        columnNumber: 5\n    }, this));\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwwQkFBMEI7O0FBR2dDO0FBQ2IsQ0FBQywwQkFBMEI7QUFDQztBQUl6RSw2Q0FBNkM7QUFDN0Msc0RBQXNEO0FBQ3RELE1BQU1PLGVBQWVILDhDQUFJQSxFQUFFLGtEQUFrRDtBQUU3RSxNQUFNSSxTQUFTUCxtREFBWUEsQ0FBQztJQUMxQlEsUUFBUTtRQUFDTixpREFBT0E7UUFBRUk7S0FBYTtJQUMvQkcsWUFBWTtRQUNWLHNDQUFzQztRQUN0QyxDQUFDUCxpREFBT0EsQ0FBQ1EsRUFBRSxDQUFDLEVBQUVULDJDQUFJQTtRQUNsQixDQUFDSyxhQUFhSSxFQUFFLENBQUMsRUFBRVQsMkNBQUlBO0lBQ3pCO0lBQ0EscURBQXFEO0lBQ3JEVSxZQUFZLEVBR1g7QUFDSDtBQUVBLHNDQUFzQztBQUN0QyxpREFBaUQ7QUFDakQsTUFBTUMsY0FBYyxJQUFJUiw4REFBV0E7QUFFcEIsU0FBU1MsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUM1RCxPQUNFLG9FQUFvRTtrQkFDcEUsOERBQUNWLHNFQUFtQkE7UUFBQ1csUUFBUUo7a0JBRzNCLDRFQUFDYixnREFBYUE7WUFBQ1EsUUFBUUE7c0JBRXJCLDRFQUFDTztnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7O0FBS2hDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBmcm9udGVuZC9wYWdlcy9fYXBwLnRzeFxyXG5cclxuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcclxuaW1wb3J0IHsgV2FnbWlQcm92aWRlciwgY3JlYXRlQ29uZmlnLCBodHRwIH0gZnJvbSAnd2FnbWknO1xyXG5pbXBvcnQgeyBtYWlubmV0LCBiYXNlIH0gZnJvbSAnd2FnbWkvY2hhaW5zJzsgLy8gQmFzZSBhxJ/EsW7EsSBrdWxsYW5hY2HEn8SxelxyXG5pbXBvcnQgeyBRdWVyeUNsaWVudCwgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XHJcbi8vaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnOyAvLyBHbG9iYWwgQ1NTIGRvc3lhc8SxICjDlnJuOiBUYWlsd2luZCBDU1MgdmV5YSB0ZW1lbCBzdGlsbGVyKVxyXG5pbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi4vY29uZmlnL3NldHRpbmdzLmpzb24nO1xyXG5cclxuLy8gLS0tIDEuIFppbmNpciB2ZSBUcmFuc3BvcnQgVGFuxLFtbGFtYXPEsSAtLS1cclxuLy8gS29uZmlnw7xyYXN5b24gZG9zeWFzxLFuZGFuIEJhc2UgYcSfxLFuxLEgaGVkZWYgYWzEsXlvcnV6XHJcbmNvbnN0IFRBUkdFVF9DSEFJTiA9IGJhc2U7IC8vIEJhxZ9sYW5nxLHDpyBvbGFyYWsgQmFzZSAoODQ1MykgYcSfxLFuxLEga3VsbGFuxLF5b3J1elxyXG5cclxuY29uc3QgY29uZmlnID0gY3JlYXRlQ29uZmlnKHtcclxuICBjaGFpbnM6IFttYWlubmV0LCBUQVJHRVRfQ0hBSU5dLCAvLyBBbmEgYcSfxLEgdmUgaGVkZWYgYcSfxLEgZWtsaXlvcnV6XHJcbiAgdHJhbnNwb3J0czoge1xyXG4gICAgLy8gVMO8bSBldGtpbGXFn2ltbGVyaSBSUEMgaWxlIHnDtm5sZW5kaXJcclxuICAgIFttYWlubmV0LmlkXTogaHR0cCgpLFxyXG4gICAgW1RBUkdFVF9DSEFJTi5pZF06IGh0dHAoKSwgXHJcbiAgfSxcclxuICAvLyBDw7x6ZGFuIGJhxJ9sYXnEsWPEsWxhcsSxIChNZXRhTWFzaywgV2FsbGV0Q29ubmVjdCB2Yi4pXHJcbiAgY29ubmVjdG9yczogW1xyXG4gICAgLy8gTWV0YU1hc2ssIFRydXN0V2FsbGV0IHZiLiB0YXJhecSxY8SxIGnDp2kgY8O8emRhbmxhclxyXG4gICAgLy8gTm90OiBJbmplY3RlZCBjb25uZWN0b3Inw7xuIGRvxJ9ydSBrdXJ1bG1hc8SxIGdlcmVraXJcclxuICBdLFxyXG59KTtcclxuXHJcbi8vIC0tLSAyLiBRdWVyeSBDbGllbnQgVGFuxLFtbGFtYXPEsSAtLS1cclxuLy8gVmVyaSDDtm5iZWxsZWtsZW1lIHZlIHNvcmd1bGFtYSBpw6dpbiBrdWxsYW7EsWzEsXJcclxuY29uc3QgcXVlcnlDbGllbnQgPSBuZXcgUXVlcnlDbGllbnQoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIC8vIFF1ZXJ5Q2xpZW50UHJvdmlkZXIsIHZlcmkgw7ZuYmVsbGVrbGVtZSB2ZSBkdXJ1bSB5w7ZuZXRpbWluaSBzYcSfbGFyXHJcbiAgICA8UXVlcnlDbGllbnRQcm92aWRlciBjbGllbnQ9e3F1ZXJ5Q2xpZW50fT5cclxuICAgICAgXHJcbiAgICAgIHsvKiBXYWdtaVByb3ZpZGVyLCB0w7xtIEVWTSBldGtpbGXFn2ltbGVyaSBpw6dpbiBnbG9iYWwga29udGVrc3Qgc2HEn2xhciAqL31cclxuICAgICAgPFdhZ21pUHJvdmlkZXIgY29uZmlnPXtjb25maWd9PlxyXG4gICAgICAgIFxyXG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgICBcclxuICAgICAgPC9XYWdtaVByb3ZpZGVyPlxyXG4gICAgPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxyXG4gICk7XHJcbn0iXSwibmFtZXMiOlsiV2FnbWlQcm92aWRlciIsImNyZWF0ZUNvbmZpZyIsImh0dHAiLCJtYWlubmV0IiwiYmFzZSIsIlF1ZXJ5Q2xpZW50IiwiUXVlcnlDbGllbnRQcm92aWRlciIsIlRBUkdFVF9DSEFJTiIsImNvbmZpZyIsImNoYWlucyIsInRyYW5zcG9ydHMiLCJpZCIsImNvbm5lY3RvcnMiLCJxdWVyeUNsaWVudCIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImNsaWVudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

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