!function(e){var t="object"==typeof exports,n="undefined"==typeof JS?require("./core"):JS;t&&(exports.JS=exports),e(n,t?exports:n)}(function(e,t){"use strict";var n=new e.Class("Decorator",{initialize:function(t,n){var r,s,i=new e.Class,a={};for(r in t.prototype)s=t.prototype[r],"function"==typeof s&&s!==t&&(s=this.klass.delegate(r)),a[r]=s;return i.include(new e.Module(a),{_resolve:!1}),i.include(this.klass.InstanceMethods,{_resolve:!1}),i.include(n),i},extend:{delegate:function(e){return function(){return this.component[e].apply(this.component,arguments)}},InstanceMethods:new e.Module({initialize:function(e){this.component=e,this.klass=this.constructor=e.klass;var t,r;for(t in e)this[t]||(r=e[t],"function"==typeof r&&(r=n.delegate(t)),this[t]=r)},extend:function(e){this.component.extend(e);var t,r;for(t in e)r=e[t],"function"==typeof r&&(r=n.delegate(t)),this[t]=r}})}});t.Decorator=n});
//@ sourceMappingURL=decorator.js.map