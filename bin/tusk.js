!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.tusk=e()}}(function(){return function e(t,n,r){function i(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(s)return s(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var h=n[o]={exports:{}};t[o][0].call(h.exports,function(e){var n=t[o][1][e];return i(n?n:e)},h,h.exports,e,t,n,r)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,n){"use strict";t.exports={NODE:"__node__",NAMESPACES:{HTML:"http://www.w3.org/1999/xhtml",MATH_ML:"http://www.w3.org/1998/Math/MathML",SVG:"http://www.w3.org/2000/svg"},SELF_CLOSING:["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],EVENTS:["animationend","animationiteration","animationstart","beforeunload","blur","canplay","canplaythrough","change","click","contextmenu","copy","cut","dblclick","drag","dragend","dragenter","dragexit","dragleave","dragover","dragstart","drop","durationchange","emptied","ended","focus","fullscreenchange","input","keydown","keypress","keyup","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","paste","pause","play","playing","progress","ratechange","reset","scroll","seeked","seeking","select","stalled","submit","suspend","timeupdate","touchcancel","touchend","touchmove","touchstart","transitionend","visibilitychange","volumechange","waiting","wheel"]}},{}],2:[function(e,t,n){"use strict";function r(e){var t=e.type.toLowerCase(),n=e.target,r=n[o];if(e.bubbles)for(Object.defineProperty(e,"currentTarget",{value:n,writable:!0}),e.stopPropagation=function(){return e.cancelBubble=!0};n&&(e.currentTarget=n,r=n[o],n=n.parentNode,r&&r.events[t]&&r.events[t](e),!e.cancelBubble););else r&&r.events[t]&&r.events[t](e)}var i=e(1),s=i.EVENTS,o=i.NODE;t.exports={dispatch:function(e,t,n){null==n&&(n=!1);var i=document.createEvent("Event");i.initEvent(e,n,!1),Object.defineProperties(i,{target:{value:t},srcElement:{value:t}}),r(i)},init:function(){if(!document.__tusk){for(var e=s.length;e--;)document.addEventListener(s[e],r,!0);document.__tusk=!0}}}},{1:1}],3:[function(e,t,n){"use strict";function r(e,t){for(var n=new Array(Math.max(arguments.length-2,0)),r=n.length;r--;)n[r]=arguments[r+2];switch(n=o(n),typeof e){case"string":return new u(e,s,t,n);case"function":s=e;var a=e(t,n,i);return s=void 0,a;default:throw new TypeError("Tusk: Invalid virtual node type.")}}var i,s,o=e(8),u=e(5),a=e(2),l=e(1).NODE,h=e(4);t.exports=r.default=r.createElement=r,r.isElement=function(e){return Boolean(e&&e.isTusk)},r.render=function(e,t){if("undefined"==typeof window)throw new Error("Tusk: Cannot render on the server (use toString).");if(!(e instanceof window.Node))throw new Error("Tusk: Container must be a DOM element.");if(!t||!t.isTusk)throw new Error("Tusk: Can only render a virtual node.");if(!e[l]||!e[l].update(t)){a.init();var n=e.outerHTML,r=String(t);if(r===n)return void t.mount(e);if(e[l]=t,e.parentNode.replaceChild(t.create(),e),n){h.getDiff(n,r)}}},r.with=function(e,t){if("function"!=typeof t)throw new TypeError("Tusk: renderer should be a function.");i=e;var n=t(e);return i=void 0,n}},{1:1,2:2,4:4,5:5,8:8}],4:[function(e,t,n){"use strict";t.exports={getDiff:function(e,t){for(var n=0,r=e.length;r>n&&t[n]===t[n];n++);var i=Math.max(0,n-20),s=i+80;return[e.slice(i,Math.min(s,e.length)),t.slice(i,Math.min(s,t.length))]},setAttrs:function(e,t,n){var r;if(t!==n){for(r in n)n[r]!==t[r]&&e.setAttribute(r,n[r]);for(r in t)r in n||e.removeAttribute(r)}},setChildren:function(e,t,n){var r,i;if(t!==n){for(r in n){if(i=n[r],r in t){if(t[r].update(i),t[r].index===i.index)continue}else i.create();e.insertBefore(i._elem,e.childNodes[i.index])}for(r in t)r in n||t[r].remove()}}}},{}],5:[function(e,t,n){"use strict";function r(e,t,n,r){if(this.attrs={},this.events={},this.children={},this.type=e,this.owner=t,"svg"===this.type?this.namespaceURI=d.SVG:"math"===this.type&&(this.namespaceURI=d.MATH_ML),null!=n){this.key=n.key,this.ignore="ignore"in n&&n.ignore!==!1,this.innerHTML=n.innerHTML,delete n.key,delete n.ignore,delete n.innerHTML;var s;for(var o in n)s=n[o],"on"===o.slice(0,2)?this.events[o.slice(2).toLowerCase()]=s:null!=s&&s!==!1&&(this.attrs[o]=s)}this.innerHTML||~h.indexOf(this.type)||i(this,r)}function i(e,t,n){if(null==t&&(t=" "),null==n&&(n=0),t.constructor!==Array)t.isTusk||(t=new o(t)),null==t.namespaceURI&&(t.namespaceURI=e.namespaceURI),t.index=n,e.children[t.key||n]=t;else for(var r=0,s=t.length;s>r;r++)i(e,t[r],n+r)}var s=e(7),o=e(6),u=e(4),a=e(2).dispatch,l=e(1),h=l.SELF_CLOSING,c=l.NODE,d=l.NAMESPACES,f=r.prototype;t.exports=r,f.isTusk=!0,f.mount=function(e){if(this._elem=e,e[c]=this,null==this.innerHTML){var t;for(var n in this.children)t=this.children[n],t.mount(e.childNodes[t.index||n])}a("mount",e)},f.dismount=function(){a("dismount",this._elem);var e;for(var t in this.children)e=this.children[t],e&&e.dismount&&e.dismount()},f.create=function(){var e,t,n=this._elem=this.elem||document.createElementNS(this.namespaceURI||d.HTML,this.type),r=n[c];return n[c]=this,r?(e=r.attrs,t=r.children):e=t={},u.setAttrs(n,e,this.attrs),null!=this.innerHTML?n.innerHTML=this.innerHTML:u.setChildren(n,t,this.children),a("mount",n),n},f.update=function(e){if(this===e)return e;if(this.ignore&&e.ignore)return e;if(this.type!==e.type)return this._elem.parentNode.insertBefore(e.create(),this._elem),this.remove(),e;var t=this.owner!==e.owner;return t&&a("dismount",this._elem),this._elem[c]=e,e._elem=this._elem,u.setAttrs(this._elem,this.attrs,e.attrs),null!=e.innerHTML?this.innerHTML!==e.innerHTML&&(this._elem.innerHTML=e.innerHTML):(null!=this.innerHTML&&(this._elem.innerHTML=""),u.setChildren(this._elem,this.children,e.children)),t&&a("mount",this._elem),e},f.remove=function(){this.dismount(),this._elem.parentNode.removeChild(this._elem)},f.toString=function(){var e,t="",n="";for(e in this.attrs)t+=" "+e+'="'+s(this.attrs[e])+'"';if(~h.indexOf(this.type))return"<"+this.type+t+">";if(null!=this.innerHTML)n=this.innerHTML;else for(e in this.children)n+=this.children[e];return"<"+this.type+t+">"+n+"</"+this.type+">"}},{1:1,2:2,4:4,6:6,7:7}],6:[function(e,t,n){"use strict";function r(e){this.value=String(e)}var i=e(7),s=r.prototype;t.exports=r,s.isTusk=!0,s.mount=function(e){this._elem=e;var t=e.nodeValue;this.value!==t&&e.splitText(t.indexOf(this.value)+this.value.length)},s.create=function(){return this._elem=this._elem||document.createTextNode(this.value),this.value!==this._elem.nodeValue&&(this._elem.nodeValue=this.value),this._elem},s.update=function(e){return this===e?e:e.constructor!==r?(this._elem.parentNode.replaceChild(e.create(),this._elem),e):(e._elem=this._elem,this.value!==e.value&&(this._elem.nodeValue=e.value),e)},s.remove=function(){this._elem.parentNode.removeChild(this._elem)},s.toString=function(){return i(this.value)}},{7:7}],7:[function(e,t,n){"use strict";function r(e){var t=""+e,n=i.exec(t);if(!n)return t;var r,s="",o=0,u=0;for(o=n.index;o<t.length;o++){switch(t.charCodeAt(o)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 39:r="&#39;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}u!==o&&(s+=t.substring(u,o)),u=o+1,s+=r}return u!==o?s+t.substring(u,o):s}var i=/["'&<>]/;t.exports=r},{}],8:[function(e,t,n){function r(e,t){if(!Array.isArray(e))return e;var n=-1,i=e.length;for(t||(t=[]);++n<i;)Array.isArray(e[n])?r(e[n],t):t.push(e[n]);return t}t.exports=r},{}]},{},[3])(3)});
//# sourceMappingURL=tusk.js.map