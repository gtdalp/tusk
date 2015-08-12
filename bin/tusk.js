!function e(t,n,r){function i(s,a){if(!n[s]){if(!t[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var h=n[s]={exports:{}};t[s][0].call(h.exports,function(e){var n=t[s][1][e];return i(n?n:e)},h,h.exports,e,t,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,t,n){t.exports={NODE:"__node__",NAMESPACES:{HTML:"http://www.w3.org/1999/xhtml",MATH_ML:"http://www.w3.org/1998/Math/MathML",SVG:"http://www.w3.org/2000/svg"},SELF_CLOSING:["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],EVENTS:["animationend","animationiteration","animationstart","beforeunload","blur","canplay","canplaythrough","change","click","contextmenu","copy","cut","dblclick","drag","dragend","dragenter","dragexit","dragleave","dragover","dragstart","drop","durationchange","emptied","ended","focus","fullscreenchange","input","keydown","keypress","keyup","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","paste","pause","play","playing","progress","ratechange","reset","scroll","seeked","seeking","select","stalled","submit","suspend","timeupdate","touchcancel","touchend","touchmove","touchstart","transitionend","visibilitychange","volumechange","waiting","wheel"]}},{}],2:[function(e,t,n){var r,i,o,s;s=e("./constants"),i=s.NODE,r=s.EVENTS,o=function(e){var t,n,r,o,s,a;if(s=e.target,a=e.type,a=a.toLowerCase(),e.bubbles)for(e.stopPropagation=function(){return e.cancelBubble=!0},Object.defineProperty(e,"currentTarget",{value:s,writable:!0});s&&(e.currentTarget=s,r=s[i],s=s.parentNode,null!=r&&"function"==typeof(n=r.events)[a]&&n[a](e),!e.cancelBubble););else null!=(o=s[i])&&"function"==typeof(t=o.events)[a]&&t[a](e)},t.exports={dispatch:function(e,t,n){var r;null==n&&(n=!1),r=document.createEvent("Event"),r.initEvent(e,n,!1),Object.defineProperties(r,{target:{value:t},srcElement:{value:t}}),o(r)},init:function(){var e,t,n;if(!document.__tusk){for(e=0,t=r.length;t>e;e++)n=r[e],document.addEventListener(n,o,!0);document.__tusk=!0}}}},{"./constants":1}],3:[function(e,t,n){var r,i,o,s,a,l,u,h;i=e("./virtual/node"),r=e("./constants").NODE,l=e("./util"),s=l.flattenInto,a=l.getDiff,o=e("./delegator"),u=void 0,h=function(e,t){var n,r,o;for(r=Math.max(arguments.length-2,0),n=new Array(r);r--;)n[r]=arguments[r+2];switch(n=s(n,[]),typeof e){case"string":return new i(e,t,n);case"function":return o=e(t,n,u),o instanceof i&&(o.owner=e),o;default:throw new TypeError("Tusk: Invalid virtual node type.")}},h.createElement=h,h.render=function(e,t){var n,i,s,l,u,h;if("undefined"==typeof window)throw new Error("Tusk: Cannot render on the server (use toString).");if(!(e instanceof window.Node))throw new Error("Tusk: Container must be a DOM element.");if(!(null!=t?t.isTusk:void 0))throw new Error("Tusk: Can only render a virtual node.");(null!=(l=e[r])?l.update(t):void 0)||(s=e.outerHTML,i=t.toString(),i===s?t.mount(e):(e.parentNode.replaceChild(t.create(),e),null!=s&&(u=a(s,i),h=u[0],n=u[1],console.warn("Tusk: Could not bootstrap document, existing html and virtual html do not match.\n\nServer:\n"+h+"\n\nClient:\n"+n))),o.init())},h["with"]=function(e,t){var n;return u=e,n="function"==typeof t?t():void 0,u=void 0,n},t.exports=h},{"./constants":1,"./delegator":2,"./util":4,"./virtual/node":5}],4:[function(e,t,n){var r;t.exports={escapeHTML:function(e){return String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},flattenInto:r=function(e,t){var n,i,o;for(i=0,o=e.length;o>i;i++)n=e[i],n instanceof Array?r(n,t):t.push(n);return t},getDiff:function(e,t){var n,r,i,o,s,a;for(i=o=0,s=e.length;s>o&&(n=e[i],n===t[i]);i=++o);return a=Math.max(0,i-20),r=a+80,[e.slice(a,Math.min(r,e.length)),t.slice(a,Math.min(r,t.length))]},setAttrs:function(e,t,n){var r,i;if(t!==n){for(r in n)i=n[r],null!=i&&i!==t[r]&&e.setAttribute(r,i);for(r in t)!r in n&&e.removeAttribute(r)}},setChildren:function(e,t,n){var r,i,o;if(t!==n){for(i in n){if(r=n[i],i in t){if((o=t[i]).update(r),o.index===r.index)continue}else r.create();e.insertBefore(r._elem,e.childNodes[r.index])}for(i in t)r=t[i],i in n||r.remove()}}}},{}],5:[function(e,t,n){var r,i,o,s,a,l,u,h,c,d,f,p,m=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};c=e("../constants"),s=c.SELF_CLOSING,i=c.NODE,r=c.NAMESPACES,d=e("../util"),u=d.escapeHTML,f=d.setAttrs,p=d.setChildren,l=e("../delegator").dispatch,a=e("./text"),h=function(e,t,n,r){var i,o,s,l;if(e instanceof Array)for(o=s=0,l=e.length;l>s;o=++s)i=e[o],h(i,t,n,r+o);else e&&e.isTusk||(e=new a(e)),e.index=r,null==e.namespaceURI&&(e.namespaceURI=t),n[e.key||r]=e;return n},o=function(e,t,n){var i,o,a;if(this.type=e,this.namespaceURI="svg"===this.type?r.SVG:"math"===this.type?r.MATH_ML:void 0,this.attrs={},this.events={},this.children={},null!=t){this.key=t.key,delete t.key,this.innerHTML=t.innerHTML,delete t.innerHTML;for(i in t)a=t[i],"on"!==i.slice(0,2)?this.attrs[i]=a:this.events[i.slice(2).toLowerCase()]=a}null!=this.innerHTML||(o=this.type,m.call(s,o)>=0)||h(n,this.namespaceURI,this.children,0)},o.prototype.isTusk=!0,o.prototype.mount=function(e){var t,n,r,o;if(this._elem=(n=e.childNodes,e),e[i]=this,null==this.innerHTML){o=this.children;for(r in o)t=o[r],t.mount(n[t.index||r])}l("mount",e)},o.prototype.create=function(){var e,t,n,o;return n=null!=this._elem?this._elem:this._elem=document.createElementNS(this.namespaceURI||r.HTML,this.type),o=n[i],n[i]=this,o?(e=o.attrs,t=o.children):e=t={},f(n,e,this.attrs),null!=this.innerHTML?n.innerHTML=this.innerHTML:p(n,t,this.children),l("mount",n),n},o.prototype.update=function(e){var t;if(this===e)return this;if(this.type!==e.type)this._elem.parentNode.insertBefore(e.create(),this._elem),this.remove();else{if(t=this.owner!==e.owner,t&&l("dismount",this._elem),this._elem[i]=e,e._elem=this._elem,f(this._elem,this.attrs,e.attrs),null!=e.innerHTML)this.innerHTML!==e.innerHTML&&(this._elem.innerHTML=e.innerHTML);else{if(null!=this.innerHTML)for(;this._elem.firstChild;)this._elem.removeChild(this._elem.firstChild);p(this._elem,this.children,e.children)}t&&l("mount",this._elem)}return e},o.prototype.remove=function(){var e,t,n;l("dismount",this._elem),n=this.children;for(t in n)e=n[t],e.remove();return this._elem.parentNode.removeChild(this._elem)},o.prototype.toString=function(){var e,t,n,r,i,o,a,l;e=n="",i=this.attrs;for(r in i)l=i[r],e+=" "+r+'="'+u(l)+'"';if(null!=this.innerHTML)n=this.innerHTML;else{o=this.children;for(r in o)t=o[r],n+=t}return a=this.type,m.call(s,a)>=0?"<"+(this.type+e)+">":"<"+(this.type+e)+">"+n+"</"+this.type+">"},t.exports=o},{"../constants":1,"../delegator":2,"../util":4,"./text":6}],6:[function(e,t,n){var r,i;i=e("../util").escapeHTML,r=function(e){null==e&&(e=" "),this.value=String(e)},r.prototype.isTusk=!0,r.prototype.mount=function(e){var t;this._elem=(t=e.nodeValue,e),this.value!==t&&e.splitText(t.indexOf(this.value)+this.value.length)},r.prototype.create=function(){return this._elem?this._elem:this._elem=document.createTextNode(this.value)},r.prototype.update=function(e){return this===e?this:(e.constructor===r?(e._elem=this._elem,this.value!==e.value&&(this._elem.nodeValue=e.value)):this._elem.parentNode.replaceChild(e.create(),this._elem),e)},r.prototype.remove=function(){return this._elem.parentNode.removeChild(this._elem)},r.prototype.toString=function(){return i(this.value)},t.exports=r},{"../util":4}]},{},[3]);