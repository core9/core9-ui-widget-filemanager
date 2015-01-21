!function(e){var t="object"==typeof exports,n="undefined"==typeof JS?require("./core"):JS,r=n.Enumerable||require("./enumerable").Enumerable;t&&(exports.JS=exports),e(n,r,t?exports:n)}(function(e,t,n){"use strict";var r=new e.Module("Console",{extend:{nameOf:function(t,n){var r,s,i,a,o=[];if(e.isType(t,Array)){for(r=0,s=t.length;s>r;r++)o.push(this.nameOf(t[r]));return o}if(t.displayName)return t.displayName;for(i=[{name:null,o:n||e.ENV}],a=0;"object"==typeof i&&a<this.MAX_DEPTH;)a+=1,i=this.descend(i,t);return"string"==typeof i&&(i=i.replace(/\.prototype\./g,"#"),t.displayName=i,t.__meta__&&(t.__meta__.displayName=i+".__meta__")),t.displayName},descend:function(t,n){for(var r,s,i,a=[],o=t.length,c=o;c--;)if(s=t[c],!e.isType(s.o,Array)){i=s.name?s.name+".":"";for(r in s.o){if(n&&s.o[r]===n)return i+r;a.push({name:i+r,o:s.o[r]})}}return a},convert:function(n,r){if(null===n||void 0===n)return n+"";var s,i=t,r=r||[];return e.indexOf(r,n)>=0?"#circular":n instanceof Error?"string"!=typeof n.message||n.message?n.name+(n.message?": "+n.message:""):n.name:n instanceof Array?(r.push(n),s=new i.Collection(n).map(function(e){return this.convert(e,r)},this).join(", "),r.pop(),s?"[ "+s+" ]":"[]"):n instanceof String||"string"==typeof n?'"'+n+'"':n instanceof Function?n.displayName||n.name||((""+n).match(/^\s*function ([^\(]+)\(/)||[])[1]||"#function":n instanceof Date?n.toGMTString():n.toString&&n.toString!==Object.prototype.toString&&!n.toString.__traced__?""+n:void 0!==n.nodeType?""+n:(r.push(n),s=new i.Collection(i.objectKeys(n,!1).sort()).map(function(e){return this.convert(e,r)+": "+this.convert(n[e],r)},this).join(", "),r.pop(),s?"{ "+s+" }":"{}")},filterBacktrace:function(e){if(!e)return e;e=e.replace(/^\S.*\n?/gm,"");var t=this.adapter.backtraceFilter();return t?e.replace(t,""):e},ANSI_CSI:"[",DEFAULT_WIDTH:78,DEFAULT_HEIGHT:24,MAX_DEPTH:4,NO_COLOR:"NO_COLOR",ESCAPE_CODES:{cursor:{cursorUp:"%1A",cursorDown:"%1B",cursorForward:"%1C",cursorBack:"%1D",cursorNextLine:"%1E",cursorPrevLine:"%1F",cursorColumn:"%1G",cursorPosition:"%1;%2H",cursorHide:"?25l",cursorShow:"?25h"},screen:{eraseScreenForward:"0J",eraseScreenBack:"1J",eraseScreen:"2J",eraseLineForward:"0K",eraseLineBack:"1K",eraseLine:"2K"},reset:{reset:"0m"},weight:{bold:"1m",normal:"22m"},style:{italic:"",noitalic:""},underline:{underline:"4m",noline:"24m"},blink:{blink:"5m",noblink:"25m"},color:{black:"30m",red:"31m",green:"32m",yellow:"33m",blue:"34m",magenta:"35m",cyan:"36m",white:"37m",nocolor:"39m",grey:"90m"},background:{bgblack:"40m",bgred:"41m",bggreen:"42m",bgyellow:"43m",bgblue:"44m",bgmagenta:"45m",bgcyan:"46m",bgwhite:"47m",bgnocolor:"49m"}},coloring:function(){return this.adapter.coloring()},envvar:function(e){return this.adapter.envvar(e)},escape:function(e){return r.ANSI_CSI+e},exit:function(e){this.adapter.exit(e)},getDimensions:function(){return this.adapter.getDimensions()}},consoleFormat:function(){this.reset();for(var e=arguments.length;e--;)this[arguments[e]]()},print:function(e){e=""+(void 0===e?"":e),r.adapter.print(e)},puts:function(e){e=""+(void 0===e?"":e),r.adapter.puts(e)}});r.extend({Base:new e.Class({__buffer__:"",__format__:"",backtraceFilter:function(){return"function"==typeof version&&version()>100?/.*/:null},coloring:function(){return!this.envvar(r.NO_COLOR)},echo:function(e){return"undefined"!=typeof console?console.log(e):"function"==typeof print?print(e):void 0},envvar:function(){return null},exit:function(e){"object"==typeof system&&system.exit&&system.exit(e),"function"==typeof quit&&quit(e)},format:function(e,t,n){if(this.coloring()){for(var s=r.ESCAPE_CODES[e][t],i=0,a=n.length;a>i;i++)s=s.replace("%"+(i+1),n[i]);this.__format__+=r.escape(s)}},flushFormat:function(){var e=this.__format__;return this.__format__="",e},getDimensions:function(){var e=this.envvar("COLUMNS")||r.DEFAULT_WIDTH,t=this.envvar("ROWS")||r.DEFAULT_HEIGHT;return[parseInt(e,10),parseInt(t,10)]},print:function(e){for(var t,n,s,i=this.coloring(),a=this.getDimensions()[0],o=r.escape;e.length>0;)t=this.__buffer__.length,n=t>0&&i?o("1F")+o(t+1+"G"):"",s=e.substr(0,a-t),this.__buffer__+=s,i&&this.echo(n+this.flushFormat()+s),this.__buffer__.length===a&&(i||this.echo(this.__buffer__),this.__buffer__=""),e=e.substr(a-t)},puts:function(e){var t=this.coloring(),n=r.escape,s=this.__buffer__.length,i=s>0&&t?n("1F")+n(s+1+"G"):this.__buffer__;this.echo(i+this.flushFormat()+e),this.__buffer__=""}})}),r.extend({Browser:new e.Class(r.Base,{backtraceFilter:function(){return RegExp(window.location.href.replace(/(\/[^\/]+)/g,"($1)?")+"/?","g")},coloring:function(){return this.envvar(r.NO_COLOR)?!1:r.AIR},echo:function(e){return window.runtime?window.runtime.trace(e):window.console?console.log(e):void alert(e)},envvar:function(e){return window[e]||null},getDimensions:function(){return r.AIR?this.callSuper():[1024,1]}})}),r.extend({BrowserColor:new e.Class(r.Browser,{COLORS:{green:"limegreen"},__queue__:[],__state__:null,format:function(t,n){n=n.replace(/^bg/,"");var r=e.extend({},this.__state__||{}),s=this.COLORS[n]||n,i=/^no/.test(n);"reset"===t?r=null:i?delete r[t]:"weight"===t?r.weight="font-weight: "+n:"style"===t?r.style="font-style: "+n:"underline"===t?r.underline="text-decoration: underline":"color"===t?r.color="color: "+s:"background"===t?r.background="background-color: "+s:r=void 0,void 0!==r&&(this.__state__=r,this.__queue__.push(r))},print:function(e){this.__queue__.push(e)},puts:function(e){this.print(e);for(var t,n="",r=[];void 0!==(t=this.__queue__.shift());)"string"==typeof t?this.__state__?(n+="%c"+t,r.push(this._serialize(this.__state__))):n+=t:this.__state__=t;console.log.apply(console,[n].concat(r))},_serialize:function(e){var t=[];for(var n in e)t.push(e[n]);return t.join("; ")}})}),r.extend({Node:new e.Class(r.Base,{backtraceFilter:function(){return RegExp(process.cwd()+"/","g")},coloring:function(){return!this.envvar(r.NO_COLOR)&&require("tty").isatty(1)},envvar:function(e){return process.env[e]||null},exit:function(e){process.exit(e)},getDimensions:function(){var e,t,n;return process.stdout.getWindowSize?(n=process.stdout.getWindowSize(),e=n[0],t=n[1]):(n=process.binding("stdio").getWindowSize(),e=n[1],t=n[0]),[e,t]},print:function(e){process.stdout.write(this.flushFormat()+e)},puts:function(e){console.log(this.flushFormat()+e)}})}),r.extend({Phantom:new e.Class(r.Base,{echo:function(e){console.log(e)},envvar:function(e){return require("system").env[e]||null},exit:function(e){phantom.exit(e)}})}),r.extend({Rhino:new e.Class(r.Base,{backtraceFilter:function(){return RegExp(java.lang.System.getProperty("user.dir")+"/","g")},envvar:function(e){var t=java.lang.System.getenv();return t.get(e)||null},getDimensions:function(){for(var e=java.lang.Runtime.getRuntime().exec(["sh","-c","stty -a < /dev/tty"]),t=e.getInputStream(),n=0,r="";n>=0;)n=t.read(),n>=0&&(r+=String.fromCharCode(n));var s=r.match(/rows\s+(\d+);\s+columns\s+(\d+)/);return s?this._dimCache=[parseInt(s[2],10),parseInt(s[1],10)]:this._dimCache||this.callSuper()},print:function(e){java.lang.System.out.print(this.flushFormat()+e)},puts:function(e){java.lang.System.out.println(this.flushFormat()+e)}})}),r.extend({Windows:new e.Class(r.Base,{coloring:function(){return!1},echo:function(e){WScript.Echo(e)},exit:function(e){WScript.Quit(e)}})}),r.BROWSER="undefined"!=typeof window,r.NODE="object"==typeof process&&!r.BROWSER,r.PHANTOM="undefined"!=typeof phantom,r.AIR=r.BROWSER&&"undefined"!=typeof runtime,r.RHINO="undefined"!=typeof java&&void 0!==java.lang,r.WSH="undefined"!=typeof WScript;var s,i=!1;r.BROWSER&&(s=navigator.userAgent,window.console&&/Chrome/.test(s)&&(i=!0)),r.adapter=r.PHANTOM?new r.Phantom:i?new r.BrowserColor:r.BROWSER?new r.Browser:r.NODE?new r.Node:r.RHINO?new r.Rhino:r.WSH?new r.Windows:new r.Base;for(var a in r.ESCAPE_CODES)for(var o in r.ESCAPE_CODES[a])(function(e,t){r.define(t,function(){r.adapter.format(e,t,arguments)})})(a,o);r.extend(r),n.Console=r});
//@ sourceMappingURL=console.js.map