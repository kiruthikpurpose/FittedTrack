/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/btoa";
exports.ids = ["vendor-chunks/btoa"];
exports.modules = {

/***/ "(ssr)/./node_modules/btoa/index.js":
/*!************************************!*\
  !*** ./node_modules/btoa/index.js ***!
  \************************************/
/***/ ((module) => {

eval("(function () {\n  \"use strict\";\n\n  function btoa(str) {\n    var buffer;\n\n    if (str instanceof Buffer) {\n      buffer = str;\n    } else {\n      buffer = Buffer.from(str.toString(), 'binary');\n    }\n\n    return buffer.toString('base64');\n  }\n\n  module.exports = btoa;\n}());\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvYnRvYS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLy4vbm9kZV9tb2R1bGVzL2J0b2EvaW5kZXguanM/M2ZlNiJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBmdW5jdGlvbiBidG9hKHN0cikge1xuICAgIHZhciBidWZmZXI7XG5cbiAgICBpZiAoc3RyIGluc3RhbmNlb2YgQnVmZmVyKSB7XG4gICAgICBidWZmZXIgPSBzdHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHN0ci50b1N0cmluZygpLCAnYmluYXJ5Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZmZlci50b1N0cmluZygnYmFzZTY0Jyk7XG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG59KCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/btoa/index.js\n");

/***/ })

};
;