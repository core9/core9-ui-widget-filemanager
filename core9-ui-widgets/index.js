(function(o){var K=o.$LAB,y="UseLocalXHR",z="AlwaysPreserveOrder",u="AllowDuplicates",A="CacheBust",B="BasePath",C=/^[^?#]*\//.exec(location.href)[0],D=/^\w+\:\/\/\/?[^\/]+/.exec(C)[0],i=document.head||document.getElementsByTagName("head"),L=(o.opera&&Object.prototype.toString.call(o.opera)=="[object Opera]")||("MozAppearance"in document.documentElement.style),q=document.createElement("script"),E=typeof q.preload=="boolean",r=E||(q.readyState&&q.readyState=="uninitialized"),F=!r&&q.async===true,M=!r&&!F&&!L;function G(a){return Object.prototype.toString.call(a)=="[object Function]"}function H(a){return Object.prototype.toString.call(a)=="[object Array]"}function N(a,c){var b=/^\w+\:\/\//;if(/^\/\/\/?/.test(a)){a=location.protocol+a}else if(!b.test(a)&&a.charAt(0)!="/"){a=(c||"")+a}return b.test(a)?a:((a.charAt(0)=="/"?D:C)+a)}function s(a,c){for(var b in a){if(a.hasOwnProperty(b)){c[b]=a[b]}}return c}function O(a){var c=false;for(var b=0;b<a.scripts.length;b++){if(a.scripts[b].ready&&a.scripts[b].exec_trigger){c=true;a.scripts[b].exec_trigger();a.scripts[b].exec_trigger=null}}return c}function t(a,c,b,d){a.onload=a.onreadystatechange=function(){if((a.readyState&&a.readyState!="complete"&&a.readyState!="loaded")||c[b])return;a.onload=a.onreadystatechange=null;d()}}function I(a){a.ready=a.finished=true;for(var c=0;c<a.finished_listeners.length;c++){a.finished_listeners[c]()}a.ready_listeners=[];a.finished_listeners=[]}function P(d,f,e,g,h){setTimeout(function(){var a,c=f.real_src,b;if("item"in i){if(!i[0]){setTimeout(arguments.callee,25);return}i=i[0]}a=document.createElement("script");if(f.type)a.type=f.type;if(f.charset)a.charset=f.charset;if(h){if(r){e.elem=a;if(E){a.preload=true;a.onpreload=g}else{a.onreadystatechange=function(){if(a.readyState=="loaded")g()}}a.src=c}else if(h&&c.indexOf(D)==0&&d[y]){b=new XMLHttpRequest();b.onreadystatechange=function(){if(b.readyState==4){b.onreadystatechange=function(){};e.text=b.responseText+"\n//@ sourceURL="+c;g()}};b.open("GET",c);b.send()}else{a.type="text/cache-script";t(a,e,"ready",function(){i.removeChild(a);g()});a.src=c;i.insertBefore(a,i.firstChild)}}else if(F){a.async=false;t(a,e,"finished",g);a.src=c;i.insertBefore(a,i.firstChild)}else{t(a,e,"finished",g);a.src=c;i.insertBefore(a,i.firstChild)}},0)}function J(){var l={},Q=r||M,n=[],p={},m;l[y]=true;l[z]=false;l[u]=false;l[A]=false;l[B]="";function R(a,c,b){var d;function f(){if(d!=null){d=null;I(b)}}if(p[c.src].finished)return;if(!a[u])p[c.src].finished=true;d=b.elem||document.createElement("script");if(c.type)d.type=c.type;if(c.charset)d.charset=c.charset;t(d,b,"finished",f);if(b.elem){b.elem=null}else if(b.text){d.onload=d.onreadystatechange=null;d.text=b.text}else{d.src=c.real_src}i.insertBefore(d,i.firstChild);if(b.text){f()}}function S(c,b,d,f){var e,g,h=function(){b.ready_cb(b,function(){R(c,b,e)})},j=function(){b.finished_cb(b,d)};b.src=N(b.src,c[B]);b.real_src=b.src+(c[A]?((/\?.*$/.test(b.src)?"&_":"?_")+~~(Math.random()*1E9)+"="):"");if(!p[b.src])p[b.src]={items:[],finished:false};g=p[b.src].items;if(c[u]||g.length==0){e=g[g.length]={ready:false,finished:false,ready_listeners:[h],finished_listeners:[j]};P(c,b,e,((f)?function(){e.ready=true;for(var a=0;a<e.ready_listeners.length;a++){e.ready_listeners[a]()}e.ready_listeners=[]}:function(){I(e)}),f)}else{e=g[0];if(e.finished){j()}else{e.finished_listeners.push(j)}}}function v(){var e,g=s(l,{}),h=[],j=0,w=false,k;function T(a,c){a.ready=true;a.exec_trigger=c;x()}function U(a,c){a.ready=a.finished=true;a.exec_trigger=null;for(var b=0;b<c.scripts.length;b++){if(!c.scripts[b].finished)return}c.finished=true;x()}function x(){while(j<h.length){if(G(h[j])){try{h[j++]()}catch(err){}continue}else if(!h[j].finished){if(O(h[j]))continue;break}j++}if(j==h.length){w=false;k=false}}function V(){if(!k||!k.scripts){h.push(k={scripts:[],finished:true})}}e={script:function(){for(var f=0;f<arguments.length;f++){(function(a,c){var b;if(!H(a)){c=[a]}for(var d=0;d<c.length;d++){V();a=c[d];if(G(a))a=a();if(!a)continue;if(H(a)){b=[].slice.call(a);b.unshift(d,1);[].splice.apply(c,b);d--;continue}if(typeof a=="string")a={src:a};a=s(a,{ready:false,ready_cb:T,finished:false,finished_cb:U});k.finished=false;k.scripts.push(a);S(g,a,k,(Q&&w));w=true;if(g[z])e.wait()}})(arguments[f],arguments[f])}return e},wait:function(){if(arguments.length>0){for(var a=0;a<arguments.length;a++){h.push(arguments[a])}k=h[h.length-1]}else k=false;x();return e}};return{script:e.script,wait:e.wait,setOptions:function(a){s(a,g);return e}}}m={setGlobalDefaults:function(a){s(a,l);return m},setOptions:function(){return v().setOptions.apply(null,arguments)},script:function(){return v().script.apply(null,arguments)},wait:function(){return v().wait.apply(null,arguments)},queueScript:function(){n[n.length]={type:"script",args:[].slice.call(arguments)};return m},queueWait:function(){n[n.length]={type:"wait",args:[].slice.call(arguments)};return m},runQueue:function(){var a=m,c=n.length,b=c,d;for(;--b>=0;){d=n.shift();a=a[d.type].apply(null,d.args)}return a},noConflict:function(){o.$LAB=K;return m},sandbox:function(){return J()}};return m}o.$LAB=J();(function(a,c,b){if(document.readyState==null&&document[a]){document.readyState="loading";document[a](c,b=function(){document.removeEventListener(c,b,false);document.readyState="complete"},false)}})("addEventListener","DOMContentLoaded")})(this);

JSCLASS_PATH = 'lib/jsclass/min';
$LAB
.setOptions({AlwaysPreserveOrder:true})
.script("lib/jquery/zepto.min.js")
.script("lib/seamless/build/seamless.parent.js")
.script("lib/pubsubjs/src/pubsub.js")
.script("lib/storejs/store.min.js")
.script("lib/iframeresizer/iframeResizer.min.js")
.script("lib/jsclass/src/loader-browser.js")
.script("widgets/filemanager/parent/packages.filemanager.js")
.script("widgets/core-editor/parent/packages.editor.js")
.script("widgets/inpage-context-menu/parent/packages.contextmenu.js")
.script("widgets/test-editor/parent/packages.conversion.js")
.script("widgets/js-console/parent/packages.console.js")
.script("widgets/tree-menu/parent/packages.treemenu.js")
.script("widgets/wysiwyg/parent/packages.wysiwyg.js")
.wait(function(){
	window.widget = jQuery;

	// start context
	window.widget.contextmenu = JS.require('widget.contextmenu', function(Hash, Observable) {

		$('.open-context').on('click', function(){
			widget.contextmenu.init({'size':'full'});
		});
		// init page
		widget.contextmenu.init({'size':'full'});

		//

		var reloadContextMenu = function( msg, data ){
			document.getElementById('ifr-contextmenu').contentWindow.location.reload();
			PubSub.publish( 'initLastPosition' );
		};
		var tokenReloadContextMenu = PubSub.subscribe( 'reloadContextMenu', reloadContextMenu );

	});
	// end context

	// start context
	window.widget.treemenu = JS.require('widget.treemenu', function(Hash, Observable) {


		$('#open-treemenu').on('click', function(){
			var ifrTreeMenu = $('#ifr-treemenu');
			var ifrConversion = $('#ifr-conversion');
			
			if(ifrTreeMenu.size() == 1 && ifrTreeMenu.css('display') == 'block'){
				ifrTreeMenu.hide();
			}else if(ifrTreeMenu.size() == 1 && ifrTreeMenu.css('display') == 'none'){
				var top = 0;
				if($('#ifr-conversion').size() == 1 && ifrConversion.css('display') == 'block'){
					top = 235;
				}
			
			
				ifrTreeMenu.show();
				ifrTreeMenu.css('top',top + 'px');
				
				
			}else{
				widget.treemenu.init({'size':'full'});
			}
		});

	});
	// end context


	// start test-editor
	window.widget.conversion = JS.require('widget.conversion', function(Hash, Observable) {
		$('#open-conversion').on('click', function(){
			var ifrContextMenu = $('#ifr-contextmenu');
			var ifrTreeMenu = $('#ifr-treemenu');
			
			var ifrConversion = $('#ifr-conversion');
			if(ifrConversion.size() == 1 && ifrConversion.css('display') == 'block'){
				ifrConversion.hide();
				ifrContextMenu.css('top', '20px');
				ifrTreeMenu.css('top', '20px');
				
				
			}else if(ifrConversion.size() == 1 && ifrConversion.css('display') == 'none'){
				ifrConversion.show();
				ifrContextMenu.css('top', '235px');
				ifrTreeMenu.css('top', '235px');
			}else{
				widget.conversion.init({'size':'full'});
				ifrContextMenu.css('top', '235px');
				ifrTreeMenu.css('top', '235px');
			}

		});
	});
	// end test-editor

	// start js-console
	window.widget.console = JS.require('widget.console', function(Hash, Observable) {
		var consoleButton = $('#open-console');
		consoleButton.on('click', function(){
			var ifrContextMenu = $('#ifr-contextmenu');
			var ifrConsole = $('#ifr-console');
			if(ifrConsole.size() == 1 && ifrConsole.css('display') == 'block'){
				ifrConsole.hide();
			}else if(ifrConsole.size() == 1 && ifrConsole.css('display') == 'none'){
				ifrConsole.show();
			}else{
				widget.console.init({'size':'full'});
			}

		});
	});
	// end js-console

	
	// start wysiwyg service
	window.widget.wysiwyg = JS.require('widget.wysiwyg', function(Hash, Observable) {
		
	
		var destroyWysiwygService = function( msg, data ){
			
			console.log("init editor with wysywig data");
		
		    var editorState = store.get('editor-state');
		    editorState['content'] = data;
		    widget.editor.init(editorState);
		    //PubSub.publish('getUrlServiceResult', data);
		    widget.wysiwyg.destroy();
		};
		var tokenDestroyWysiwygService = PubSub.subscribe( 'destroyWysiwygService', destroyWysiwygService );
	

		var getWysiwygService = function( msg, data ){
		    widget.wysiwyg.init({'size':'full','data':data});
		};
		var tokenGetWysiwygService = PubSub.subscribe( 'getwysiwyg', getWysiwygService );
	});
	// end wysiwyg service
	

	// start file service
	
	//FIXME page needs to be handled
	//store.set('page','/variations/p/scraper/nl');
	store.set('page','/jaarplan');
	
	store.set('editor-state', { page: store.get('page'), action: 'edit', 'size':'full' });
	
	window.widget.filemanager = JS.require('widget.filemanager', function(Hash, Observable) {
		var destroyUrlService = function( msg, data ){
		    var editorState = store.get('editor-state');
		    editorState['url'] = data;
		    widget.editor.init(editorState);
		    PubSub.publish('getUrlServiceResult', data);
		    widget.filemanager.destroy();
		};
		var tokenDestroyUrlService = PubSub.subscribe( 'destroyUrlService', destroyUrlService );

		var getUrlService = function( msg, data ){
		    widget.filemanager.init({'size':'full'});
		};
		var tokenGetUrlService = PubSub.subscribe( 'geturl', getUrlService );
	});

	$('.choose-file').on('click', function(){
		PubSub.publish( 'geturl', 'file' );
	});
	// end file service
	// start editor service
	window.widget.editor = JS.require('widget.editor', function(Hash, Observable) {
	
		
		var destroyEditorService = function( msg, data ){
		    var editorState = store.get('editor-state');
		    editorState['url'] = data;
		    widget.editor.destroy();
		};
		var tokenDestroyEditorService = PubSub.subscribe( 'destroyEditorService', destroyEditorService );
		var getEditorService = function( msg, data ){
			
			if(data.message.indexOf('setposition') != -1){
				var jsonData = JSON.parse(data.message);
				store.set('positionX',jsonData.x);
				store.set('positionY',jsonData.y);
				return;
			}
		
		    var editorState = store.get('editor-state');
		    data.iframe = "";
		    editorState['contextmenu'] = data;
		    widget.editor.init(editorState);
  	       var positionY = store.get('positionY');
	       console.log('positionY : ' + positionY);
		    
		    $('html,body').scrollTop(positionY - 300);
		    
		    store.set('lastPosition', positionY - 300);
		    
		};
		var tokenGetEditorService = PubSub.subscribe( 'geteditor', getEditorService );
	});
	// end editor service


	
		var initLastPosition = function( msg, data ){
		 setTimeout(function(){ 
		 	console.log('init last position : ' + store.get('lastPosition'));
		 	$('html,body').scrollTop(store.get('lastPosition'));
		 }, 3000);
		};
		var tokeninitLastPosition = PubSub.subscribe( 'initLastPosition', initLastPosition );

		    

		    
});
